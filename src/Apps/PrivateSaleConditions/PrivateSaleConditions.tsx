import { useSystemContext } from "System"
import { useAuthDialog } from "Components/AuthDialog"
import { ContextModule, Intent } from "@artsy/cohesion"
import { ModalType } from "Components/Authentication/Types"

export const PrivateSaleConditions = () => {
  const { user } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()

  if (!user?.id) {
    showAuthDialog({
      current: {
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to buy art with ease`
          },
        },
        analytics: {
          contextModule: ContextModule.artworkSidebar,
          intent: Intent.buyNow,
        },
      },
      legacy: {
        mode: ModalType.signup,
        redirectTo: "/",
        contextModule: ContextModule.artworkSidebar,
        intent: Intent.buyNow,
        copy: "Sign up to buy art with ease",
      },
    })
  }

  return (
    <div>
      <h1>conditions</h1>
    </div>
  )
}
