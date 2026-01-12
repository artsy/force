## Caching

There are two different layers of caching on Artsy.net, namely:

- Caching at the Relay query level, which happens as users navigate from page to page on the client. This is an entirely client-side cache, and typically configured via the route. We will refer to this going forward as 'Relay caching'.
- Caching at the [Metaphysics CDN](https://github.com/artsy/metaphysics/blob/1b3940a2387ab0bf308c2ca7b597e40fad015b4d/docs/cdn.md) level - which has the effect of caching the entire response for a given query. We will refer to this going forward as 'CDN caching'.

For both of these caching layers, there are several different configurations that can be used/combined to achieve desired behavior.

### Configuring Cache

At the router level, we can configure things in a few different ways:

1. Never cache, period:

```tsx
const myRouter = [
  {
    path: "/some-app",
    // Tell relay network layer to never cache. This flows down to setting
    // a `no-cache` header when making the CDN request, thus bypassing that cache as well.
    cacheConfig: {
      force: true,
    },
  },
]
```

2. Never cache on the server (initial request always skips both caching layers), but always employ Relay caching. This ensures users will always receive fresh data when they first visit a page, but once visited, page will be cached on the client for a given session. (Timely pages like `/auction/:id` apply this strategy.)

```tsx
const myRouter = [
  {
    path: "/some-app",
    // Never cache queries on the server (initial query). We still cache on
    // client-side SPA transitions via Relay caching (only during the session).
    // This flows down to setting a `no-cache` header when making the CDN request, thus bypassing that cache as well.
    serverCacheTTL: 0,
  },
]
```

3. Configure the server-side TTL cache time for a given route:

```tsx
const myRouter = [
  {
    path: "/some-app",
    // This flows down to a `max-age` value in the CDN request as well.
    serverCacheTTL: 24 * 60 * 60, // 24 hours,
  },
]
```

4. Use the cacheable directive to allow a logged-in query to be cached by the CDN:

```tsx
const myRouter = [
  {
    path: "/some-app",
    query: graphql`
      query SomeAppQuery($artistID: String!) @cacheable {
        artist(id: $artistID) @principalField {
          slug
        }
      }
    `,
  },
]
```

5. Never cache in a QueryRenderer or hook or other relay-centric component:

```tsx
<SystemQueryRenderer relayCacheConfig={{ force: true }} />
<SystemQueryRenderer relayCacheConfig={{ force: true }} />

const data = useLazyLoadQuery(..., { cacheConfig: { force: true }})

// etc.
```

By default, when no custom cache TTL is set via `serverCacheTTL`, or the non-default route cache times in [`Apps/serverCacheTTLs.tsx`](../src/Apps/serverCacheTTLs.tsx) isn't specified, we fall back to a default of 1 hour, [configured at the CDN level via an ENV var](https://dash.cloudflare.com/0373426be7be649ff052277fb5377c4f/workers/services/view/metaphysics-cdn-staging/production/settings).

### General Cache Behavior

#### Logged out:

By default, we typically cache (at both layers) all queries for logged-out visitors, unless otherwise opted-out with `cacheConfig: { force: true }`. There is also a `serverCacheTTL: 0` (set on the route config) which has the effect of skipping the CDN cache so the initial request will always hit Metaphysics, while leaving client-side caching enabled. There are also certain client-side queries made using Relay's `fetchQuery` - which implicitly _adds_ a `force: true` configuration to the query, thus skipping the cache as well. For queries made using `fetchQuery` - you need to add the `force: false` directive explicitly in order to cache. The important thing to remember is: **everything is cached by default unless opted-out (and there are two ways to opt-out, both layers via `force: true`, or just the CDN layer via `serverCacheTTL: 0`)**.

#### Logged in:

There is a bit more nuance here. For CDN caching: **nothing is cached unless it’s opted-in**. For Relay caching: **by default we cache on the client for all routes _for a given session_**.

#### Relay caching:

Cache can be disabled at the route level via the `cacheConfig` prop on the route (see below), or applying `fetchPolicy: "network-only"`. Note that there are a few different types of fetch policies, which can be [read about here](https://relay.dev/docs/guided-tour/reusing-cached-data/fetch-policies/). A notable one is `store-and-network`, which will return a cache of the page and revalidate in the background, updating the page with the latest data if there's something new.

#### CDN caching:

In general, any request made to the CDN with either an access token header _or_ a `Cache-Control: no-cache` header will bypass the CDN cache and hit the Metaphysics server directly. Any requests that have _neither_ of these headers will be cached by the CDN. When caching is occurring, a `max-age` value is respected by the CDN if provided. Thus, Force controls the cacheability of any given query by setting/not setting these headers appropriately, as well as including an optional `max-age` value when desired.

Since logged-in queries always propagate the user's access token, they will _never_ be cached by the CDN, unless they are opted-in.

For logged-in queries, there is an opt-in directive `@cacheable` that can be added to a query. When present - no access token will be propagated with the request, and the `no-cache` value in the `Cache-Control` header will not be included - which will thus allow the CDN to cache this query. This is useful for queries that are not user-specific, and can be cached for all users.

Worth noting that one can mix and match, and add `@cacheable` _and_ a `force: true` configuration to the same query (there is no validation preventing this). As a conservative choice, when there is a conflict between an _opt-in_ (via `@cacheable`) and an _opt-out_ (via `force: true`), the opt-out takes precedence (and thus this query would not be cached).

**What if I want to see the latest page / unpublished preview?** There is an escape hatch - a query param in the URL: `?nocache=true` - that will force the CDN to bypass the cache and hit Metaphysics directly _despite_ any `@cacheable` directive. This can be useful for a privileged user to see an unpublished page (which we wouldn't want to cache).

Setting/unsetting the `Cache-Control` header, and propagating any `max-age` is accomplished in a Relay middleware: [`System/Relay/middleware/cacheHeaderMiddleware.ts`](../src/System/Relay/middleware/cacheHeaderMiddleware.ts). This takes into account the various configuration options available (including `@cacheable`).

Un-setting the access token header for logged-in queries using `@cacheable` is accomplished in a Relay middleware: [`System/Relay/createRelaySSREnvironment.ts`](../src/System/Relay/createRelaySSREnvironment.ts).

### Cache-related ENV vars for Relay caching:

- `GRAPHQL_CACHE_SIZE`: Total number of entries before eviction (on the client)
- `GRAPHQL_CACHE_TTL`: Default expiration TTL in milliseconds (on the client) - defaults when unset to 1 hour

### Relay Store Normalization Issues with Prefetching and CDN Cache

Sometimes issues arise where a prefetched and cached network response conflicts with fresh uncached data (via, say, a QueryRenderer). In rare cases like this Relay often fails to normalize the data, which can create conflicts in the store and possible runtime errors.

As a generally-good habit, be defensive when coding:

```tsx
const data = useFragment(...)

if (!data) {
  return null // or some other error component/placeholder
}
```

For more info on this issue, see [this slack thread](https://artsy.slack.com/archives/C05EEBNEF71/p1731004838892619).

### Useful Links for Monitoring Cache Performance

- [Calibre scores over time](https://app.datadoghq.com/dashboard/qfh-2gu-td7/calibre-scores?fromUser=false&refresh_mode=sliding&view=spans&from_ts=1720285399034&to_ts=1722877399034&live=true) (by page, device type, just a few data points per day)
- [Force end-user load times](https://app.datadoghq.com/dashboard/dt4-sdd-r6r/force-load-times?fromUser=false&refresh_mode=sliding&view=spans&from_ts=1722272630753&to_ts=1722877430753&live=true) (FP, FCP, TTI, etc.)
