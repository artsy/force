import { Spacer, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const IdentityVerificationWarning: React.FC = () => {
  return (
    <>
      <Text variant="md">
        This auction requires Artsy to verify your identity before bidding.
      </Text>

      <Spacer my={1} />

      <Text variant="md">
        After you register, you’ll receive an email with a link to complete
        identity verification.
      </Text>

      <Spacer my={1} />

      <Text variant="md">
        To complete your registration, please confirm that you agree to the{" "}
        <RouterLink color="black100" to="/conditions-of-sale" target="_blank">
          Conditions of Sale
        </RouterLink>
        .
      </Text>
    </>
  )
}
