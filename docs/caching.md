## Caching

There are a few different layers of caching on Artsy.net, namely:

- Caching at the Relay (GraphQL) level, which happens as users navigate from page to page on the client. This is typically configured via the route.
- Caching at the server level, via Redis, while logged out.

> ⚠️ If for whatever reason we need to disable the cache, unset the environment variables via hokusai:
>
> ```
> hokusai production env unset ENABLE_GRAPHQL_PROXY ENABLE_GRAPHQL_CACHE
> ```

#### Important Cache-related ENV vars:

- `ENABLE_GRAPHQL_PROXY`: Enables the proxy in support of caching
- `ENABLE_GRAPHQL_CACHE`: Enables the GraphQL cache
- `GRAPHQL_CACHE_SIZE`: Total number of entries before eviction (on the client; server-cache sizes are memory dependent)
- `GRAPHQL_CACHE_TTL`: Default expiration TTL (in milliseconds)

Non-default route cache times are set in [`Apps/serverCacheTTLs.tsx`](src/Apps/serverCacheTTLs.tsx).

### General Cache Behavior

#### Logged in:

By default, we cache on the client for all routes _for a given session_. This means we only cache on the client, after the app mounts. (In other words, the cache isn't persisted across sessions or users.) This enables speedy transitions to pages already visited.

Cache can be disabled at the route level via the `cacheConfig` prop on the route (see below), or applying `fetchPolicy: "network-only"`. Note that there are a few different types of fetch policies, which can be [read about here](https://relay.dev/docs/guided-tour/reusing-cached-data/fetch-policies/). A notable one is `store-and-network`, which will return a cache of the page and revalidate in the background, updating the page with the latest data if there's something new.

#### Logged out:

By default, we cache all pages (unless otherwise configured with `cacheConfig: { force: true }` or `serverCacheTTL: 0`). How this works is:

- User visits a page and Relay issues a GraphQL request
- GraphQL requests are proxied to `/api/metaphysics` within force via [middleware](https://github.com/artsy/force/blob/main/src/Server/middleware/graphqlProxyMiddleware.ts)
- We check Redis to see if the query (keyed by query name + variables) has been requested before
  - If so, return cache of Metaphysics response
  - If not, on successful response, store response in Redis
- Then, when the user navigates on the client in SPA mode, we push unvisited queries into the redis cache as they navigate
- When a new user arrives at the site and visits a page that's already been visited, cache is returned, even if they've navigated to the page via our single-page app.

### Configuring Cache

At the router level, we can configure things in a few different ways:

1. Never cache, period:

```tsx
const myRouter = [
  {
    path: "/some-app",
    // Tell relay network layer to never cache. This flows down to redis
    // layer automatically, so setting here will skip cache there.
    cacheConfig: {
      force: true,
    },
  },
]
```

2. When logged out, never cache on the server, always cache on the client. This ensure users will always receive fresh data when they first visit a page, but once visited, page will be cached on the client for a given session. (Timely pages like `/auction/:id` apply this strategy.)

```tsx
const myRouter = [
  {
    path: "/some-app",
    // Tell redis to never cache queries on the server. We still cache on
    // client-side SPA transitions at the relay level (only during the session).
    // Only applies while logged out!
    serverCacheTTL: 0,
  },
]
```

3. Configure the server-side TTL cache time for a given route:

```tsx
const myRouter = [
  {
    path: "/some-app",
    serverCacheTTL: 24 * 60 * 60, // 24 hours,
  },
]
```

By default, the value of `serverCacheTTL` falls back to our `GRAPHQL_CACHE_TTL` env config, typically set to 1 hour.

### Managing Redis Cache

We should avoid needing to hand-manage individual Redis cache entries, but occasionally issues arise where an AE or partner posts a bug saying that they can't see their new feature that they've created, or a change they've made somewhere to an artwork (while logged out). If this happens:

- Visit https://artsy.net/admin/cache
- Click 'load all cache keys'
- Enter the id (or some other piece of metadata) for the page that needs an update. (eg, artist/artwork slug, or some other id.)
- Click 'Delete cache key'
- Tell AE to reload page, which will return the latest version

As a last resort, we can flush the entire Redis cache by clicking the "Clear entire cache" button. This should be avoided however as all of our previous cache keys will need to be reindexed, which will greatly slow down the site.

### Useful Links for Monitoring Cache Performance

- [Force-production redis cluster metrics](https://us-east-1.console.aws.amazon.com/elasticache/home?region=us-east-1#/redis/force-production) (hit rate, eviction rate, # items, etc.)
- [Calibre scores over time](https://app.datadoghq.com/dashboard/qfh-2gu-td7/calibre-scores?fromUser=false&refresh_mode=sliding&view=spans&from_ts=1720285399034&to_ts=1722877399034&live=true) (by page, device type, just a few data points per day)
- [Force end-user load times](https://app.datadoghq.com/dashboard/dt4-sdd-r6r/force-load-times?fromUser=false&refresh_mode=sliding&view=spans&from_ts=1722272630753&to_ts=1722877430753&live=true) (FP, FCP, TTI, etc.)
