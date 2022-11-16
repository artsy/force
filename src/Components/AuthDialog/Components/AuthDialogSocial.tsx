import {
  Button,
  Join,
  Spacer,
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
} from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { stringify } from "qs"
import { FC } from "react"
import { getENV } from "Utils/getENV"
import { sanitizeRedirect } from "Utils/sanitizeRedirect"

export const AuthDialogSocial: FC = () => {
  const { applePath, facebookPath, googlePath } = getENV("AP")

  const {
    state: { options },
  } = useAuthDialogContext()

  // These params are handled by the routes in the Passport app,
  // they get pushed onto the session and then handled when the social
  // service redirects back to Force.
  const query = stringify(
    {
      afterSignUpAction: options.afterAuthAction,
      "redirect-to": sanitizeRedirect(options.redirectTo),
      "signup-intent": options.intent,
      "signup-referer": null, // TODO: Add referer
      accepted_terms_of_service: true,
      agreed_to_receive_emails: true,
    },
    { skipNulls: true }
  )

  return (
    <Join separator={<Spacer y={1} />}>
      <Button
        variant="secondaryBlack"
        width="100%"
        Icon={AppleIcon}
        // @ts-ignore
        as="a"
        href={`${applePath}?${query}`}
      >
        Continue with Apple
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        Icon={GoogleIcon}
        // @ts-ignore
        as="a"
        href={`${googlePath}?${query}`}
      >
        Continue with Google
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        Icon={FacebookIcon}
        // @ts-ignore
        as="a"
        href={`${facebookPath}?${query}`}
      >
        Continue with Facebook
      </Button>
    </Join>
  )
}
