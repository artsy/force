import { Stack, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { RouterLink } from "System/Components/RouterLink"
import { isTouch } from "Utils/device"
import type { FC } from "react"
import styled from "styled-components"

type AuthDialogDisclaimerProps = {}

export const AuthDialogDisclaimer: FC<
  React.PropsWithChildren<AuthDialogDisclaimerProps>
> = props => {
  const { isAutomaticallySubscribed } = useCountryCode()

  return (
    <Stack gap={1}>
      <Text
        variant="xs"
        color="mono60"
        textAlign="center"
        data-testid="disclaimer"
      >
        By {isTouch ? "tapping" : "clicking"} Sign Up or Continue with Email,
        Apple, Google, or Facebook, you agree to Artsy’s{" "}
        <AuthDialogDisclaimerLink inline to="/terms" target="_blank">
          Terms and Conditions
        </AuthDialogDisclaimerLink>{" "}
        and{" "}
        <AuthDialogDisclaimerLink inline to="/privacy" target="_blank">
          Privacy Policy
        </AuthDialogDisclaimerLink>
        {isAutomaticallySubscribed && <> and to receiving emails from Artsy</>}.
      </Text>

      <Text variant="xs" color="mono60" textAlign="center">
        This site is protected by reCAPTCHA and the{" "}
        <AuthDialogDisclaimerLink
          inline
          to="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </AuthDialogDisclaimerLink>{" "}
        and{" "}
        <AuthDialogDisclaimerLink
          inline
          to="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </AuthDialogDisclaimerLink>{" "}
        apply.
      </Text>
    </Stack>
  )
}

const AuthDialogDisclaimerLink = styled(RouterLink)`
  color: ${themeGet("colors.mono100")};
`
