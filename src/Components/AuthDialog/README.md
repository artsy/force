# AuthDialog

## Usage

Import the `useAuthDialog` hook and call the returned `showAuthDialog` function with any options.

```tsx
import { useAuthDialog } from "Components/AuthDialog"

const YourComponent = () => {
  const { showAuthDialog } = useAuthDialog()

  return (
    <Button
      onClick={() => {
        showAuthDialog({
          mode: "Login",
          options: {
            title: "Login to save artworks",
          },
        })
      }}
    >
      Login
    </Button>
  )
}
```

## Authentication Flow

- Authentication happens via a login or sign up.
- Those functions return a user with an `accessToken`
- We take that `accessToken` and pass it to the `runAfterAuthentication` function which does a few things:
  - It sets a cookie for `afterAuthAction` if there is one (which will then get run on the next full page load)
  - We construct a final `redirectTo` based on the intent. If there's no commerical action we append the onboarding param.
  - We take the `accessToken` and use it to get a `trustToken` which we pass along with `redirectTo` to construct a URL that logs into Gravity.
  - We redirect to that Gravity URL which logs in and then redirects back to the ultimate destination in Force.
