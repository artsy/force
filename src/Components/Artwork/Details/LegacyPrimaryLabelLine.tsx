import { Text } from "@artsy/palette"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import type { LegacyPrimaryLabelLine_artwork$key } from "__generated__/LegacyPrimaryLabelLine_artwork.graphql"
import { graphql, useFragment } from "react-relay"

interface PrimaryLabelLineProps {
  artwork: LegacyPrimaryLabelLine_artwork$key
}

export const LegacyPrimaryLabelLine: React.FC<
  React.PropsWithChildren<PrimaryLabelLineProps>
> = ({ artwork }) => {
  const data = useFragment(legacyPrimaryLabelLineFragment, artwork)
  const primaryLabel = data.collectorSignals?.primaryLabel
  const { hideSignals } = useArtworkGridContext()

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

  if (primaryLabel === "INCREASED_INTEREST" && !hideSignals) {
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

  if (primaryLabel === "CURATORS_PICK" && !hideSignals) {
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

const legacyPrimaryLabelLineFragment = graphql`
  fragment LegacyPrimaryLabelLine_artwork on Artwork {
    collectorSignals {
      primaryLabel
    }
  }
`
