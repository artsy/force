import { Text } from "@artsy/palette"
import { Details_artwork$data } from "__generated__/Details_artwork.graphql"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

interface PrimaryLabelLineProps {
  primaryLabel: NonNullable<
    Details_artwork$data["collectorSignals"]
  >["primaryLabel"]
}

export const PrimaryLabelLine: React.FC<PrimaryLabelLineProps> = ({
  primaryLabel,
}) => {
  if (!primaryLabel) {
    return null
  }

  if (primaryLabel === "PARTNER_OFFER") {
    return (
      <Text
        variant="xs"
        color="blue100"
        backgroundColor="blue10"
        px={0.5}
        alignSelf="flex-start"
        borderRadius={3}
        style={{ whiteSpace: "nowrap" }}
      >
        Limited-Time Offer
      </Text>
    )
  }

  if (primaryLabel === "INCREASED_INTEREST") {
    return (
      <Text
        variant="xs"
        border="1px solid"
        borderRadius={3}
        borderColor="black100"
        px={0.5}
        alignSelf="flex-start"
        my="1px"
        lineHeight="18px"
        style={{ whiteSpace: "nowrap" }}
      >
        Increased Interest
      </Text>
    )
  }

  if (primaryLabel === "CURATORS_PICK") {
    return (
      <Text
        variant="xs"
        border="1px solid"
        borderRadius={3}
        borderColor="black100"
        px={0.5}
        alignSelf="flex-start"
        my="1px"
        lineHeight="18px"
        style={{ whiteSpace: "nowrap" }}
      >
        Curators’ Pick
      </Text>
    )
  }

  return null
}
