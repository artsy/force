import { Text } from "@artsy/palette"

export const IdentityVerificationWarning: React.FC = () => {
  return (
    <>
      <Text variant="md">
        This auction requires Artsy to verify your identity before bidding.
      </Text>
      <Text variant="md">
        After you register, you’ll receive an email with a link to complete
        identity verification.
      </Text>
    </>
  )
}
