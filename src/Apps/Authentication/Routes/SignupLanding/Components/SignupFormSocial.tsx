import { Button, Stack } from "@artsy/palette"
import GoogleIcon from "@artsy/icons/GoogleIcon"
import AppleIcon from "@artsy/icons/AppleIcon"
import FacebookIcon from "@artsy/icons/FacebookIcon"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { setSocialAuthTracking } from "Components/AuthDialog/Hooks/useSocialAuthTracking"
import { getENV } from "Utils/getENV"
import { stringify } from "qs"
import { useAfterAuthenticationRedirectUrl } from "Components/AuthDialog/Hooks/useAfterAuthenticationRedirectUrl"

export const SignupFormSocial = () => {
  const {
    state: { analytics, mode },
  } = useAuthDialogContext()

  const { redirectUrl } = useAfterAuthenticationRedirectUrl(false)

  const { applePath, facebookPath, googlePath } = getENV("AP") ?? {
    applePath: "/users/auth/apple",
    facebookPath: "/users/auth/facebook",
    googlePath: "/users/auth/google",
  }

  const query = stringify(
    {
      "redirect-to": redirectUrl,
      "signup-intent": "signup",
      "signup-referer": getENV("AUTHENTICATION_REFERER"),
      accepted_terms_of_service: true,
      agreed_to_receive_emails: true,
    },
    { skipNulls: true },
  )

  const handleClick = (service: "facebook" | "apple" | "google") => () => {
    setSocialAuthTracking({
      action: { Login: "loggedIn", SignUp: "signedUp" }[mode],
      analytics,
      service,
    })
  }

  return (
    <Stack gap={1}>
      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${googlePath}?${query}`}
        onClick={handleClick("google")}
        rel="nofollow"
        Icon={GoogleIcon}
      >
        Google
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${facebookPath}?${query}`}
        onClick={handleClick("facebook")}
        rel="nofollow"
        Icon={FacebookIcon}
      >
        Facebook
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${applePath}?${query}`}
        onClick={handleClick("apple")}
        rel="nofollow"
        Icon={AppleIcon}
      >
        Apple
      </Button>
    </Stack>
  )
}
