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
          analytics: {
            contextModule: ContextModule.header,
          },
        })
      }}
    >
      Login
    </Button>
  )
}
```
