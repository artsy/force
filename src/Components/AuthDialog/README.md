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
          options: {
            title: "Sign up or log in to save artworks",
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
