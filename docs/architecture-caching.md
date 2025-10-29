# Force Caching Architecture

Force implements a sophisticated multi-layer caching strategy that operates at both the Relay network level and the Cloudflare CDN level. This caching architecture is designed to optimize performance while respecting user authentication states and data freshness requirements.

## Cache Flow Overview

```mermaid
graph TD
    A[Client Request] --> B{Request Type}

    B -->|Initial Page Load| C[Express Server]
    B -->|SPA Navigation| D[Client-Side Relay]

    C --> E[Route Processing]
    E --> F[createRelaySSREnvironment]
    F --> G[Relay Network Layer]

    D --> H[Relay Environment]
    H --> G

    G --> I[Cache Header Middleware]
    I --> J{Cache Decision Logic}

    J -->|Skip Cache| K[Direct to Metaphysics]
    J -->|Use Cache| L[Cloudflare CDN via METAPHYSICS_ENDPOINT]

    L --> M{Cache Hit?}
    M -->|Hit| N[Return Cached Response]
    M -->|Miss| O[Forward to Metaphysics & Cache Response]

    K --> P[Metaphysics GraphQL API]
    O --> P

    P --> Q[Response Processing]
    Q --> R[Relay SSR Middleware]
    R --> S[Query Response Cache]

    S --> T{Server Side?}
    T -->|Yes| U[Cloudflare CDN Caches GraphQL Response]
    T -->|No| V[Client Cache Hydration]

    U --> W[HTML Generation]
    V --> X[Client State Update]

    W --> Y[Response to Client]
    X --> Z[UI Update]
```

## Cache Decision Logic

The caching strategy uses sophisticated middleware to determine whether requests should be cached:

```mermaid
graph TD
    A[GraphQL Request] --> B[Cache Header Middleware]
    B --> C{Force Cache Skip?}

    C -->|cacheConfig.force = true| D[Set no-cache Header]
    C -->|serverCacheTTL = 0| D
    C -->|nocache query param| D
    C -->|Personalized arguments| D

    C -->|No force skip| E{cacheable Directive?}
    E -->|Yes| F[Allow CDN Cache]
    E -->|No| G{User Logged In?}

    G -->|Yes| H[Skip CDN Cache]
    G -->|No| F

    F --> I[Send without auth headers]
    H --> J[Send with auth headers]
    D --> K[Send with no-cache header]

    I --> L[Cloudflare CDN via METAPHYSICS_ENDPOINT]
    J --> M[Direct to Metaphysics]
    K --> M

    L --> N{CDN Cache Hit?}
    N -->|Hit| O[Return Cached Response]
    N -->|Miss| P[Cache & Return from Metaphysics]
```

## Relay Network Middleware Stack

The Relay environment is configured with a sophisticated middleware pipeline:

```mermaid
graph LR
    A[GraphQL Query] --> B[URL Middleware]
    B --> C[Relay SSR Middleware]
    C --> D[Query Response Cache]
    D --> E[Principal Field Error Handler]
    E --> F[Metaphysics Error Handler]
    F --> G[Cache Header Middleware]
    G --> H[Cache Logger]
    H --> I[Network Logger]
    I --> J[Error Logger]
    J --> K[Network Request]

    B --> B1[Authentication Headers]
    B --> B2[Content-Type Headers]
    B --> B3[User-Agent Headers]
    B --> B4[Timezone Headers]

    C --> C1[Server: SSR Cache]
    C --> C2[Client: Cache Hydration]

    D --> D1[TTL: 1 hour default]
    D --> D2[Size: 2000 queries]
    D --> D3[Clear on Mutation]

    G --> G1[Cache-Control Headers]
    G --> G2[Max-Age Configuration]
    G --> G3[No-Cache Logic]
```

## Cache Hydration Flow

During client-side hydration, cached data from SSR is transferred to the client:

```mermaid
sequenceDiagram
    participant Server as SSR Server
    participant HTML as HTML Response
    participant Client as Client Browser
    participant Cache as Relay Cache
    participant Hydration as Cache Hydration

    Server->>Server: Execute GraphQL queries
    Server->>Server: Store responses in SSR cache
    Server->>HTML: Inject __RELAY_HYDRATION_DATA__
    HTML->>Client: HTML with embedded cache data
    Client->>Hydration: Parse __RELAY_HYDRATION_DATA__
    Hydration->>Cache: Populate QueryResponseCache
    Cache->>Client: Ready for SPA navigation

    Note over Client: Subsequent queries check cache first
    Client->>Cache: Query for cached data
    Cache-->>Client: Return if available
    Cache->>Server: Fetch if cache miss/expired
```

## Authentication and Cache Interaction

The caching system handles authentication states intelligently:

```mermaid
graph TD
    A[Request with User Context] --> B{cacheable Directive?}

    B -->|Yes| C[Remove Auth Headers]
    B -->|No| D[Include Auth Headers]

    C --> E[Cache-able Request]
    D --> F[User-specific Request]

    E --> G[Cloudflare CDN]
    F --> H[Direct to Metaphysics]

    G --> I{CDN Hit?}
    I -->|Yes| J[Shared Cache Response]
    I -->|No| K[Fetch & Cache for All Users]

    H --> L[User-specific Response]
    L --> M[Not Cached]

    K --> N[Public Cache Entry]
    J --> O[Fast Response]
    N --> O
```

## Metaphysics CDN Configuration

Force is configured to use Metaphysics CDN endpoints through the `METAPHYSICS_ENDPOINT` environment variable:

- **Staging**: `METAPHYSICS_ENDPOINT=https://metaphysics-cdn-staging.artsy.net`
- **Production**: `METAPHYSICS_ENDPOINT=https://metaphysics-cdn-production.artsy.net`

When the endpoint is set to a CDN URL, **all GraphQL requests** (both server-side during SSR and client-side during SPA navigation) are routed through Cloudflare first. Cloudflare caches the Metaphysics GraphQL responses keyed by GraphQL variables, providing significant performance improvements for cacheable queries.

### Client-Side Caching Behavior

Even in SPA mode, when the client makes requests via Relay to the network layer, those requests hit the Cloudflare CDN (when using the CDN endpoint). This means:

- Client-side navigation and data fetching benefits from CDN caching
- Cache hits return immediately from Cloudflare without hitting Metaphysics
- Cache misses are cached by Cloudflare for subsequent requests (from any client)

## Implementation Details

### Key Components

- **createRelaySSREnvironment** (`src/System/Relay/createRelaySSREnvironment.ts`): Sets up the Relay network layer with caching middleware
- **cacheHeaderMiddleware** (`src/System/Relay/middleware/cacheHeaderMiddleware.ts`): Determines cache behavior and sets appropriate headers
- **Cache Configuration**: Configurable via route-level `serverCacheTTL` and `cacheConfig` options

### Configuration Options

The caching system can be configured at multiple levels:

1. **Route Level**: Configure `serverCacheTTL` and `cacheConfig` in route definitions
2. **Query Level**: Use `@cacheable` directive for authenticated queries that can be cached
3. **Environment Level**: Set cache size (`GRAPHQL_CACHE_SIZE`) and TTL (`GRAPHQL_CACHE_TTL`)

### Cache Invalidation

- **Client-side**: Mutations automatically clear relevant cache entries
- **Server-side**: TTL-based expiration with configurable durations
- **Manual**: `?nocache=true` query parameter bypasses all caching layers

For detailed usage examples and configuration options, see [docs/caching.md](./caching.md).
