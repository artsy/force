# A/B Testing with Unleash

### Create an A/B test via our Internal Tools app:

- Login to https://tools.artsy.net/feature-flags
- Select `Create`
- Give your A/B test a name
- Select `Experiment` checkbox
- Assign weights to each `control` and `experiment` (eg, 50-50; 50% of users will see control and 50% of users will see experiment)
- Add additional variants if necessary
- Hit `Create`

### Manually creating a test via Unleash UI:

1. Log into [Unleash](https://unleash.artsy.net)
2. Select "Create feature toggle"

- Add a name, description and select "Experiment" as the toggle type.

3. Go to the "Strategies" tab and pick your rollout strategy (usually this will be Gradual Rollout for experiments).

- Set `stickiness` to `sessionId`

4. Use the Unleash [admin API](https://docs.getunleash.io/api/admin/feature-toggles-v2) (not the admin GUI) to create variants with a `stickiness` factor of `sessionId`(the admin GUI doesn't currently support changing the `stickiness` factor).

```
  curl -H "Content-Type: application/json" \
     -H "Authorization: <YOUR_ADMIN_API_KEY>" \
     -X PUT \
     -d '[
  {
    "name": "control",
    "weightType": "variable",
    "weight": 500,
	"stickiness": "sessionId"
  },
  {
    "name": "experiment",
    "weightType": "variable",
    "weight": 500,
    "stickiness": "sessionId"
  }
]' \
     https://unleash.artsy.net/api/admin/projects/default/features/:yourFeaturesName/variants
```

NOTE: if you haven't already, you will need to create an [admin api token](https://docs.getunleash.io/user_guide/api-token) and set it as the value of `Authorization` in the request header.

- You should aim to use `control` and `experiment` as your variant names. Reach out to the data team if you have questions on naming.

5. Go to the "Variant" tab in the Unleash UI and confirm the variants were created and that all fields are correct.

NOTE: `stickiness` needs to be set to `sessionID` on both the strategy and the variant as each has their own independent `stickiness` factor. This ensures a user gets the same treatment when unauthenticated and authenticated.

### Adding the test to a React Component

Use the `useFeatureVariant` hook in the component that you want to run the experiment.

```tsx
import { useFeatureVariant } from "System/Hooks/useFeatureFlag"

const variant = useFeatureVariant("my-awesome-experiment")
```

`useFeatureVariant` will return an object with the following shape:

```tsx
{
  name: "my-variant-name",
  enabled: true,
  // payload is optional and will only be returned if set when the feature is created.
  payload: {
      type: "string",
      value: "this string is the variant's payload"
    }
}
```

Simple Example

```tsx
function MyComponent() {
  const variant = useFeatureVariant("my-awesome-experiment")

  return (
    <div>
        {variant?.name === 'experiment' &&
          ? <ExperimentComponent />
          : <ControlComponent />
        }
    </div>
  )
}
```

### Adding analytics for the experiment

In the component that you added the experiment you just need to add the following:

```tsx
import { useFeatureVariant } from "System/Hooks/useFeatureFlag"

function MyComponent() {
  const { trackFeatureVariant } = useTrackFeatureVariant({
    experimentName: "my-awesome-experiment",
    variantName: variant?.name,
    // payload is optional
    payload: variant?.payload
  })


  useEffect(() => {
    trackFeatureVariant()
  })

  return (
    // Your Components
  )

}
```

### Accessing flags on the server

If needing to access a feature flag on the server before rendering any components, all feature flags are located within local sharify data.

#### Example

```tsx
const routes = [
  {
    path: "/foo",
    onServerSideRender: ({ res }) => {
      if (!res.locals.sd.FEATURE_FLAGS.myFlag) {
        res.redirect("/")
      }
    },
    ...
  }
]
```

### Enabling your experiment for users

- Once you're ready to test, enable the feature on the staging environment via the Unleash UI (this will also enable it for your local dev environment)
- Once your code has been tested and deployed, enable the feature on production via the Unleash UI.

### QAing your experiment tracking calls in Segment

In [segment live debugger](https://app.segment.com/artsy-engineering/sources/force-staging/debugger) you can see a live stream of all the events on staging. You can use the searchbar to filter out `Experiment Viewed`, click on the one that is yours and review that everything is in order.

### Terminating an experiment

- turn feature flag off in both staging/production via the [dashboard](https://unleash.artsy.net/projects/default)
- open a clean up PR
- once the PR is live in prod, go to unleash [dashboard](https://unleash.artsy.net/projects/default/) and archive the `feature-flag`

### Useful links

[Setup an ab experiment in 3 simple steps](https://www.getunleash.io/blog/a-b-n-experiments-in-3-simple-steps)
[More info here](https://docs.getunleash.io/advanced/toggle_variants#what-are-variants)
