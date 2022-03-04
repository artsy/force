### Feature Flagging

#### Step 1

Create your feature toggle at https://unleash.artsy.net and enable it in the desired environment(s).

#### Step 2

To use feature flagging, simply import the useFeatureFlagging method and pass in the name of the feature toggle you created in step 1. This will enabled you to conditionally render your new feature.

```tsx
import { useFeatureFlag } from 'v2/System/useFeatureFlag'


function MyComponent({ props }) {
  const showMyFeature = useFeatureFlag('extra-greeting')

  return (
    <div>
      <h1>Hello</h1>

        {showMyFeature &&
          <ExtraGreeting>
        }

    </div>
  )
}
```
