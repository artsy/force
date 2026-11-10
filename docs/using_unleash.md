# Feature Flagging and A/B Testing with Unleash

This guide explains how to use Unleash for feature flagging and A/B testing force.

## What is Unleash?

Unleash is an open source feature flag service that lets us:

- Safely deploy features using feature flags (toggles)
- Run A/B tests with different variants
- Control feature rollout using gradual activation
- Target specific user segments with features

We self host the instance at https://unleash.artsy.net and its image configuration is at https://github.com/artsy/artsy-unleash

## Creating a new flag

### Creating a New Flag in the [Unleash UI](https://unleash.artsy.net)

To create a new feature flag in the Unleash UI, follow these steps:

1. **Log in to Unleash**: Navigate to [unleash.artsy.net](https://unleash.artsy.net) and log in with your credentials (you may need to authorize with cloudflare via your artsy google account before logging in with your unleash account).

2. **Go to the Feature Toggles page**: From the dashboard, click "New Feature Toggles".

3. **Add a new toggle**:

- Provide a descriptive name for your feature flag with your team name prepended (e.g., `[team-name]_[feature-name]`).
- Optionally, add a description to explain the purpose of the flag.
- If you are creating an experiment, click the button that says "Release" and select "Experiment" to enable A/B testing features. This will allow you to define variants and track their performance.

4. **Configure the flag**:

- Choose the appropriate environment. (This will be development or production, as development covers local development environments and staging).
- Set the initial state of the flag (enabled or disabled).
- Define any strategies for targeting specific users or segments (e.g., user IDs, session IDs, or gradual rollouts).

5. **Save the flag**: Click "Create" to save your new feature flag.

6. **Use the flag in your code**: Refer to the examples in this guide to implement the feature flag in your application.

By following these steps, you can safely manage feature rollouts and experiments using Unleash.

### With tools.artsy.net

1. **Log in to Forque**: Navigate to https://tools.artsy.net/feature-flags

2. ** Click the "create" tab**: Complete to form to and click "create" to save our feature flag or experiment.

3. **Use the flag in your code**: Refer to the examples in this guide to implement the feature flag in your application.

## How flags reach the page

Flags are evaluated on the server and rendered into the initial HTML, so `useFlag`, `useVariant`, and `match.context.featureFlags` all return the same value on the server and during hydration.

1. For each request, `createSSRFeatureFlags` (`src/System/FeatureFlags/unleashServer.ts`) creates a client that evaluates a flag with the Node SDK the first time the render reads it, then reuses the answer for the rest of the request. Flags the page doesn't read are never evaluated, so usage metrics in Unleash reflect real usage.
2. After rendering, the enabled flags the render read are serialized into sharify as `UNLEASH_TOGGLES`.
3. In the browser, `getOrInitBrowserFeatureFlagsContext` (`src/System/FeatureFlags/unleashClient.ts`) creates a single client seeded with those toggles. It backs both the router context and the React hooks.
4. After hydration, `FeatureFlagProvider` starts that client, which then polls the Frontend API every 30 seconds. Changes arrive as ordinary re-renders.

Both sides evaluate against the same context, built by `getUnleashContext` (`src/System/FeatureFlags/unleashContext.ts`): `userId`, `sessionId`, and the user's `roles` as a comma-separated property.

Things to know:

- A flag first read only in the browser (for example in a component that renders only on the client, or on a route reached by client-side navigation) isn't in the bootstrap. It reads as disabled until the first Frontend API response arrives, shortly after hydration.
- Because flags are collected during rendering, this relies on sharify being serialized after the body renders. It doesn't support `ENABLE_SSR_STREAMING`, which sends sharify before the body.
- To inspect a flag, visit `/debug/feature-flags?flag=<name>`. It shows each source's value on the first render (which must match the server) next to its current value.

## Using Feature Flags in React

`useFlag` and `useVariant` are safe to use during server rendering.

### Basic Feature Flag Usage

```tsx
import { useFlag } from "@unleash/proxy-client-react"

const MyComponent = () => {
  const enabled = useFlag("demo-feature")

  if (enabled) {
    return <SomeComponent />
  }

  return <AnotherComponent />
}
```

### A/B Testing with Variants

```tsx
import { useVariant } from "@unleash/proxy-client-react"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"

const MyExperiment = () => {
  // Get variant information
  const variant = useVariant("experiment_name")

  // Track experiment view for analytics
  useTrackFeatureVariantOnMount({
    experimentName: "experiment_name",
    variantName: variant?.name, // usually will be either "experiment" or "control"
    payload: "payload_data", //  optional
  })

  // Render different UI based on variant
  if (variant.enabled && variant.name === "experiment") {
    return <ExperimentComponent />
  } else if (variant.enabled && variant.name === "control") {
    return <ControlComponent />
  }
  return <DefaultComponent />
}
```

## Accessing Unleash from the Router

The router context exposes `featureFlags`, backed by the same client as the hooks. Use it in route `render` functions, `prepareVariables`, and so on. It agrees with the hooks on both the server and the client.

### Performing redirects

```tsx
const routes = [
  {
    path: "/some-route",
    render: ({ match }) => {
      if (match.context.featureFlags.isEnabled("emerald_order-details-page")) {
        throw new RedirectException("/")
      }

      return <>Rendered when the flag is disabled</>
    },
  },
]
```

### Accessing from `prepareVariables` to pass to GraphQL query

```tsx
const routes = [
  {
    path: "/some-route",
    prepareVariables: (params, { context }) => {
      const id = context.featureFlags.isEnabled("some-flag") ? "foo" : "bar"

      return {
        id,
      }
    },
    query: graphql`
      query someRouteQuery($id: String!) {
        artist(id: $id) {
          internalID
        }
      }
    `,
  },
]
```

## Using Feature Flags in Express code

Outside of React routes (plain Express handlers), use the Node SDK directly with the same context the rest of the app uses:

```typescript
import { getUnleashContext } from "System/FeatureFlags/unleashContext"
import { getOrInitUnleashServer } from "System/FeatureFlags/unleashServer"

const handler = (req: ArtsyRequest, res: ArtsyResponse) => {
  const context = getUnleashContext({
    user: res.locals.sd.CURRENT_USER,
    sessionId: res.locals.sd.SESSION_ID,
  })

  if (getOrInitUnleashServer().isEnabled("demo-feature", context)) {
    // ...
  }
}
```

## Common Pattern Examples

### Conditional UI Rendering

```tsx
const enableNewFeature = useFlag("new-feature-flag")

return (
  <div>{enableNewFeature ? <NewFeatureComponent /> : <LegacyComponent />}</div>
)
```

### Gradual Rollout of UI Components

```tsx
// Filter components with feature flags
const enableSignedFilter = useFlag("only-signed-artworks-filter")
const enableFramedFilter = useFlag("only-framed-artworks-filter")

return (
  <FilterSection>
    <BasicFilters />
    {enableSignedFilter && <SignedFilter />}
    {enableFramedFilter && <FramedFilter />}
  </FilterSection>
)
```

## Best Practices

1. **Use descriptive flag names**: Follow a consistent naming convention like `[team-name]_[feature-name]`.

2. **Default to safe values**: When a flag check fails, default to the safer option.

3. **Clean up old flags**: Remove flags after they've been fully rolled out or experiments are complete.

4. **Test both flag states**: Ensure your app works regardless of whether the flag is enabled or disabled.
