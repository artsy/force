import { Text } from "@artsy/palette"

export const SignupFormDisclaimer = () => {
  const isTouchDevice = "ontouchstart" in window

  return (
    <Text variant="xs" color="mono60" textAlign="center">
      By {isTouchDevice ? "tapping" : "clicking"} Sign Up or Continue with
      Google, Facebook, or Apple, you agree to Artsy's{" "}
      <a href="/terms" target="_blank" rel="noopener noreferrer">
        Terms of Use
      </a>{" "}
      and{" "}
      <a href="/privacy" target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </a>
      .
    </Text>
  )
}
