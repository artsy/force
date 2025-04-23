# Feature Flagging and A/B Testing with Unleash

This guide explains how to use Unleash for feature flagging and A/B testing force.

## What is Unleash?

Unleash is an open source feature flag service that lets us:

- Safely deploy features using feature flags (toggles)
- Run A/B tests with different variants
- Control feature rollout using gradual activation
- Target specific user segments with features

We self host the instance at https://unleash.artsy.net and it's image configuration is at https://gihubs.com/artsy/artsy-unleash

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

## Using Feature Flags in React (Client-side)

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
import { useTrackFeatureVariant } from "System/Hooks/useTrackFeatureVariant"

const MyExperiment = () => {
  // Get variant information
  const variant = useVariant("experiment_name")

  // Track experiment view for analytics
  const { trackFeatureVariant } = useTrackFeatureVariant({
    experimentName: "experiment_name",
    variantName: variant?.name, // usually will be either "experiment" or "control"
    payload: "payload_data", //  optional
  })

  // / biome-ignore lint/correctness/useExhaustiveDependencies: Only track experiment viewed once
  useEffect(() => {
    trackFeatureVariant()
  }, [])

  // Render different UI based on variant
  if (variant.enabled && variant.name === "experiment") {
    return <ExperimentComponent />
  } else if (variant.enabled && variant.name === "control") {
    return <ControlComponent />
  }
  return <DefaultComponent />
}
```

## Using Feature Flags in Node.js (Server-side)

### Checking Feature Flags in Server Code

```typescript
import { getOrInitUnleashServerClient } from "Server/featureFlags/unleashHelpers"

async function someServerFunction() {
  const unleashClient = await getOrInitUnleashServerClient()

  if (unleashClient.isEnabled("demo-feature")) {
    return newFeatureBehavior()
  }

  return existingBehavior()
}
```

### Using Context for Targeted Rollouts

```typescript
import { getOrInitUnleashServerClient } from "Server/featureFlags/unleashHelpers"

const unleashClient = await getOrInitUnleashServerClient()

// Setup context
// NOTE: developers will need to handle passing in the context
// when retrieving flags/variant while working server side. This
// was done for them in the previous implementation.
const context = {
  userId: res.locals.sd.CURRENT_USER,
  sessionId: res.locals.sd.SESSION_ID,
}

// Check toggle
if (unleash.isEnabled("demo", context)) {
  console.log("Toggle enabled")
} else {
  console.log("Toggle disabled")
}

// Check variant
const variant = unleash.getVariant("demo-variant", context)

if (variant.name === "experiment") {
  // do something with the experiment variant...
}
```

## Accessing Unleash from the Router on the Server

When the router first mounts we inject it into the router context, which can be used in the render function in our router to perform redirects and other operations. Example:

```tsx
const routes = [
  {
    path: "/some-route",
    render: ({ match }) => {
      if (isServer) {
        if (
          match.context.unleashServerClient.isEnabled(
            "emerald_order-details-page",
          )
        ) {
          console.log("Successfully found feature flag flag")

          throw new RedirectException("/")
        }
      }

      return <>This shouldn't render on the server, but rather redirect</>
    },
  },
]
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
