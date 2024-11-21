import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { PrimaryLabelLine_artwork$key } from "__generated__/PrimaryLabelLine_artwork.graphql"

interface PrimaryLabelLineProps {
  artwork: PrimaryLabelLine_artwork$key
}

export const PrimaryLabelLine: React.FC<React.PropsWithChildren<PrimaryLabelLineProps>> = ({
  artwork,
}) => {
  const data = useFragment(primaryLabelLineFragment, artwork)
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

const primaryLabelLineFragment = graphql`
  fragment PrimaryLabelLine_artwork on Artwork {
    collectorSignals {
      primaryLabel
    }
  }
`
