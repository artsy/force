import { Spacer, Text } from "@artsy/palette"

export const IdentityVerificationWarning: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <Text variant="sm-display">
        This auction requires Artsy to verify your identity before bidding.
      </Text>

      <Spacer y={1} />

      <Text variant="sm-display">
        After you register, you’ll receive an email with a link to complete
        identity verification.
      </Text>
    </>
  )
}
