import { Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

export const IdentityVerificationWarning: React.FC<{
  additionalText?: string
}> = ({ additionalText }) => {
  const showNewDisclaimer = useFeatureFlag("diamond_new-terms-and-conditions")

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

      <Spacer y={1} />

      {!showNewDisclaimer && (
        <Text variant="sm-display">
          To complete your registration, please confirm that you agree to the{" "}
          <RouterLink
            inline
            color="black100"
            to="/conditions-of-sale"
            target="_blank"
          >
            Conditions of Sale
          </RouterLink>
          {additionalText}.
        </Text>
      )}
    </>
  )
}
