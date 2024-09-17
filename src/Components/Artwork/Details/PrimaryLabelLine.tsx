import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { PrimaryLabelLine_artwork$key } from "__generated__/PrimaryLabelLine_artwork.graphql"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

interface PrimaryLabelLineProps {
  artwork: PrimaryLabelLine_artwork$key
}

export const PrimaryLabelLine: React.FC<PrimaryLabelLineProps> = ({
  artwork,
}) => {
  const data = useFragment(primaryLabelLineFragment, artwork)
  const primaryLabel = data.collectorSignals?.primaryLabel
  const { hideSignals } = useArtworkGridContext()

  const increasedInterestCuratorsPickEnabled = useFeatureFlag(
    "emerald_signals-increased-interest-curators-pick"
  )

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
      >
        Limited-Time Offer
      </Text>
    )
  }

  if (
    primaryLabel === "INCREASED_INTEREST" &&
    !hideSignals &&
    increasedInterestCuratorsPickEnabled
  ) {
    return (
      <Text
        variant="xs"
        border="1px solid"
        borderRadius={3}
        borderColor="black100"
        px={0.5}
        alignSelf="flex-start"
      >
        Increased Interest
      </Text>
    )
  }

  if (
    primaryLabel === "CURATORS_PICK" &&
    !hideSignals &&
    increasedInterestCuratorsPickEnabled
  ) {
    return (
      <Text
        variant="xs"
        border="1px solid"
        borderRadius={3}
        borderColor="black100"
        px={0.5}
        alignSelf="flex-start"
      >
        Curators' Pick
      </Text>
    )
  }

  return null
}

const primaryLabelLineFragment = graphql`
  fragment PrimaryLabelLine_artwork on Artwork {
    collectorSignals {
      primaryLabel
    }
  }
`
