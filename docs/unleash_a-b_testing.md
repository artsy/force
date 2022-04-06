# A/B Testing with Unleash

## Creating a test

1. Log into [Unleash](https://unleash.artsy.net)
2. Select create feature toggle

- add a name, description and select "Experiment" as the toggle type.

3. Go to the Strategies tab and pick your strategy (usually this will be Gradual Rollout for experiments).

- Set `stickiness` to `sessionId`

4. Use the Unleash [admin API](https://docs.getunleash.io/api/admin/feature-toggles-v2) (not the admin GUI) to create variants with a `stickiness` factor of `sessionId`(the admin UI doesn't currently support changing the `stickiness` factor to anything other than `default` except by API). For example:

```
  curl --location --request PUT 'https://unleash.artsy.net/api/admin/projects/default/features/<YOUR_FEATURE_NAME>/variants' \
  --header 'Authorization: 'API_KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '[[{"name": "control","weightType": "variable","weight": 500,"stickiness": "sessionId"},{"name": "experiment","weightType": "variable","weight": 500,"stickiness": "sessionId"}]]'
```

NOTE: if you haven't already, you will need to create an `admin` [api token](https://docs.getunleash.io/user_guide/api-token) and set it as the value of `Authorization` in the request header.

- You should aim to use `control` and `experiment` as your variant names, and implement the experiment to match the variant names. Reach out to the data team if you have questions on naming.

### Adding the test to a React Component

Inside the component that you want to access the variants use the `useFeatureVariant` hook.

```tsx
import { useFeatureVariant } from "v2/System/useFeatureFlag"

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

Example implementation

```tsx
function MyComponent({ props }) {
  const variant = useFeatureVariant("my-awesome-experiment")

  return (
    <div>
        {if(variant?.name! === 'experiment')
          ? <ExperimentComponent />
          : <ControlComponent />
        }
    </div>
  )
}
```

### Adding tracking data and confirming that it is received

In the component that you added the experiment you just need to add the following:

```tsx
import { useFeatureVariant } from "v2/System/useFeatureFlag"

  { trackFeatureVariant } = useTrackFeatureVariant({
    experimentName: "my-awesome-experiment",
    variantName: variant?.name!
    // payload is optional
    payload: variant?.payload!
  })
```

### Enabling your experiment for users

- Once you're ready to test, enable the feature on the staging environment (this will also enable it for your local dev environment)
- Once you code has been deployed to production, enable the feature on production.

### QAing your experiment in Segment

In [segment live debugger](https://app.segment.com/artsy-engineering/sources/force-staging/debugger) you can see a live stream of all the events on staging. You can use the searchbar to filter out `Experiment Viewed`, click on the one that is yours and review that everything is in order.

### Useful links

[Setup an ab experiment in 3 simple steps](https://www.getunleash.io/blog/a-b-n-experiments-in-3-simple-steps)
[More info here](https://docs.getunleash.io/advanced/toggle_variants#what-are-variants)
