import type { AuthContextModule } from "@artsy/cohesion"
import { Clickable, Message, Spacer } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"

interface LogInPromptProps {
  contextModule: AuthContextModule
}

export const LogInPrompt: React.FC<
  React.PropsWithChildren<LogInPromptProps>
> = ({ contextModule }) => {
  const { isLoggedIn } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()

  const handleClick = () => {
    showAuthDialog({
      options: {
        title: "Sign up or log in to see your personalized recommendations",
      },
      analytics: {
        contextModule: contextModule,
      },
    })
  }

  return (
    <>
      {!isLoggedIn && (
        <>
          <Message variant="warning">
            <Clickable onClick={handleClick} textDecoration="underline">
              Log in
            </Clickable>{" "}
            to see your personalized recommendations.
          </Message>

          <Spacer y={4} />
        </>
      )}
    </>
  )
}
