# Force Application Architecture

This document describes the control flow in the Force application, from boot to screen rendering, including Express middleware, Relay middleware, server-side rendering (SSR), and route rendering.

## Overview

Force is a React-based application with server-side rendering capabilities that runs on Node.js with Express. The application uses Relay for GraphQL data fetching and implements a sophisticated middleware chain for request processing.

## Architecture Flow

```mermaid
graph TD
    A[Application Boot] --> B[Express Server Initialization]
    B --> C[Middleware Chain Setup]
    C --> D[Route Matching]
    D --> E[Server Router Setup]
    E --> F[Relay Environment Creation]
    F --> G[SSR Processing]
    G --> H[HTML Template Generation]
    H --> I[Response to Client]

    C --> C1[Security & Basic Middleware]
    C --> C2[Authentication Middleware]
    C --> C3[Request Context Middleware]
    C --> C4[Asset Middleware]

    E --> E1[Route Hooks Execution]
    E --> E2[Context Creation]
    E --> E3[Relay Resolver Setup]

    F --> F1[Network Layer Configuration]
    F --> F2[Cache Middleware Setup]
    F --> F3[Authentication Headers]

    G --> G1[Component Tree Rendering]
    G --> G2[Asset Collection]
    G --> G3[Style Generation]
    G --> G4[Script Tags Preparation]
```

## Detailed Flow

### 1. Application Boot (src/server.ts)

The application starts by:

- Importing instrumentation for monitoring
- Creating an Express app instance
- Initializing the Unleash feature flag client
- Setting up middleware via `initializeMiddleware()`
- Configuring routes and error handling

```mermaid
sequenceDiagram
    participant Boot as Application Boot
    participant Express as Express App
    participant Middleware as Middleware Setup
    participant Unleash as Feature Flags

    Boot->>Express: Create app instance
    Boot->>Unleash: Initialize client
    Boot->>Middleware: initializeMiddleware(app)
    Boot->>Express: Setup routes & error handling
```

### 2. Express Middleware Chain (src/middleware.ts)

The middleware chain processes requests in the following order:

```mermaid
graph TD
    A[Request] --> B[Server Timing Headers]
    B --> C[Compression & Body Parsing]
    C --> D[IP Filtering & Timeout]
    D --> E[SSL & Security Headers]
    E --> F[Session Management]
    F --> G[Async Context Setup]
    G --> H[Sharify Data Injection]
    H --> I[Asset Middleware]
    I --> J[Passport Authentication]
    J --> K[User Permissions]
    K --> L[App Preferences]
    L --> M[Context Locals Bootstrap]
    M --> N[Request Logging]
    N --> O[Routing Middleware]
    O --> P[CSRF Protection]
    P --> Q[Static Asset Serving]
```

Key middleware components:

- **Security**: SSL enforcement, HSTS, frame protection
- **Authentication**: Passport.js with multiple OAuth providers
- **Context**: Sharify for shared data, async locals for request context
- **Assets**: Static file serving and asset manifest handling

### 3. Route Processing & Server Router

When a route is matched, the application:

1. **Executes Route Hooks** (`executeRouteHooks`)
2. **Creates Server Context** (`getServerAppContext`)
3. **Initializes Relay Environment** (`createRelaySSREnvironment`)
4. **Sets up Routing** (Found.js with Farce)

```mermaid
sequenceDiagram
    participant Route as Route Handler
    participant Hooks as Route Hooks
    participant Context as Server Context
    participant Relay as Relay Environment
    participant Router as Found Router

    Route->>Hooks: executeRouteHooks(req, res, next)
    Route->>Context: getServerAppContext(req, res, context)
    Route->>Relay: createRelaySSREnvironment(config)
    Route->>Router: getFarceResult(config)
    Router-->>Route: Element or Redirect result
```

### 4. Relay Middleware & Data Fetching

The Relay environment is configured with multiple middleware layers:

```mermaid
graph LR
    A[GraphQL Request] --> B[URL Middleware]
    B --> C[SSR Cache Middleware]
    C --> D[Query Response Cache]
    D --> E[Error Handlers]
    E --> F[Cache Headers]
    F --> G[Logging]
    G --> H[Metaphysics API]

    B --> B1[Authentication Headers]
    B --> B2[Request Headers]
    C --> C1[Server-side Cache]
    C --> C2[Client Hydration]
```

Key features:

- **Authentication**: Conditional header injection based on request cacheability
- **Caching**: Multi-layer caching with TTL and mutation invalidation
- **Error Handling**: Principal field errors and Metaphysics-specific error handling
- **SSR/Client Sync**: Cache hydration from server to client

### 5. Server-Side Rendering (SSR)

The SSR process involves several steps:

```mermaid
graph TD
    A[Server Router] --> B[Boot Component Wrapping]
    B --> C[Asset Collection]
    C --> D[Style Generation]
    D --> E[Script Tag Preparation]
    E --> F[HTML Template Building]

    C --> C1[Loadable Components]
    C --> C2[Styled Components]
    C --> C3[Relay Data Serialization]

    B --> B1[Context Providers]
    B --> B2[Theme Provider]
    B --> B3[Feature Flag Provider]
    B --> B4[Relay Environment Provider]
```

#### Boot Component Hierarchy (src/System/Boot.tsx)

The Boot component sets up the complete React context:

```mermaid
graph TD
    Boot --> AppPreferences[App Preferences Provider]
    AppPreferences --> Theme[Theme Provider]
    Theme --> Head[Head Provider]
    Head --> System[System Context Provider]
    System --> Relay[Relay Environment Provider]
    Relay --> Error[Error Boundary]
    Error --> Features[Feature Flag Provider]
    Features --> Media[Media Context Provider]
    Media --> Toasts[Toasts Provider]
    Toasts --> Sticky[Sticky Provider]
    Sticky --> Auth[Auth Providers]
    Auth --> Cookie[Cookie Consent Manager]
    Cookie --> App[Application Content]
```

### 6. Asset Collection & HTML Generation

The asset collection process (`collectAssets`) handles:

```mermaid
sequenceDiagram
    participant Collector as Asset Collector
    participant Loadable as Loadable Components
    participant Styles as Styled Components
    participant Relay as Relay SSR
    participant Manifest as Asset Manifest

    Collector->>Loadable: Extract chunk dependencies
    Collector->>Styles: Collect CSS styles
    Collector->>Relay: Serialize hydration data
    Collector->>Manifest: Get script/asset URLs

    Note over Collector: Generate script tags with CDN URLs
    Note over Collector: Prepare Relay hydration script
```

### 7. HTML Template & Response

The final HTML template (`buildHtmlTemplate`) includes:

- **Head Section**: Meta tags, preload hints, CSS links
- **Body Section**: SSR content, script tags, React mount point
- **Optimization**: Resource preloading, CDN integration, font optimization

```mermaid
graph LR
    A[HTML Template] --> B[Head Section]
    A --> C[Body Section]

    B --> B1[Meta Tags]
    B --> B2[Preload Links]
    B --> B3[Stylesheets]
    B --> B4[Sharify Data]

    C --> C1[Analytics Scripts]
    C --> C2[SSR Content]
    C --> C3[Runtime Scripts]
    C --> C4[React Mount Point]
```

<details>
<summary>Streaming SSR (Disabled/Experimental)</summary>

When enabled (`ENABLE_SSR_STREAMING`), the application supports streaming server-side rendering. This feature is currently disabled and considered experimental.

```mermaid
sequenceDiagram
    participant Client as Client Browser
    participant Server as Express Server
    participant Stream as SSR Stream
    participant React as React Renderer

    Client->>Server: Request
    Server->>Stream: Initialize stream
    Server->>Client: Send HTML head
    Stream->>React: Begin component rendering
    React->>Stream: Stream rendered chunks
    Stream->>Client: Stream HTML content
    React->>Stream: Complete rendering
    Stream->>Client: Send closing tags
```

</details>

## Configuration & Environment

The application behavior is controlled by various environment variables and configuration:

- **CDN_URL**: Asset CDN configuration
- **NODE_ENV**: Environment-specific behavior
- **ENABLE_SSR_STREAMING**: Streaming SSR toggle
- **SEGMENT_WRITE_KEY**: Analytics configuration
- **Feature flags**: Runtime behavior modification via Unleash

## Error Handling

Error handling occurs at multiple layers:

1. **Route level**: Try-catch in route handlers
2. **Middleware level**: Error handler middleware
3. **React level**: Error boundaries in Boot component
4. **Relay level**: Network and GraphQL error middleware

## Cache Flow Architecture

For detailed information about Force's caching architecture, see [architecture-caching.md](./architecture-caching.md).

This architecture ensures robust request processing from initial server boot through final HTML delivery to the client, with comprehensive caching, authentication, and rendering capabilities.
