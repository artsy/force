import { Text } from "@artsy/palette"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import type { PrimaryLabelLine_artwork$key } from "__generated__/PrimaryLabelLine_artwork.graphql"
import { graphql, createFragmentContainer } from "react-relay"
import { FC } from "react"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { PrimaryLabelLineQuery } from "__generated__/PrimaryLabelLineQuery.graphql"

interface PrimaryLabelLineProps {
  label: string | null | undefined
  artwork?: PrimaryLabelLine_artwork$key
}

export const PrimaryLabelLine: React.FC<React.PropsWithChildren<PrimaryLabelLineProps>> = ({
  label,
  artwork,
}) => {
  const { hideSignals } = useArtworkGridContext()
  const partnerOffer = artwork?.collectorSignals?.partnerOffer

  if (!!partnerOffer) {
    return (
      <Text
        variant="xs"
        color="blue100"
        backgroundColor="blue10"
        px={0.5}
        alignSelf="flex-start"
        borderRadius={3}
        my="1px"
        style={{ whiteSpace: "nowrap" }}
      >
        Limited-Time Offer
      </Text>
    )
  }

  if (label === "INCREASED_INTEREST" && !hideSignals) {
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

  if (label === "CURATORS_PICK" && !hideSignals) {
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

export const PrimaryLabelLineFragmentContainer = createFragmentContainer(
  PrimaryLabelLine,
  {
    artwork: graphql`
      fragment PrimaryLabelLine_artwork on Artwork {
        collectorSignals {
          primaryLabel
          partnerOffer {
            endAt
            priceWithDiscount {
              display
            }
          }
        }
      }
    `,
  }
)

interface PrimaryLabelLineQueryRendererProps {
  id: string
  label: string | null | undefined
}

export const PrimaryLabelLineQueryRenderer: FC<PrimaryLabelLineQueryRendererProps> = ({
  id,
  label,
}) => {
  return (
    <SystemQueryRenderer<PrimaryLabelLineQuery>
      lazyLoad
      query={graphql`
        query PrimaryLabelLineQuery($id: String!) {
          artwork(id: $id) {
            ...PrimaryLabelLine_artwork
          }
        }
      `}
      placeholder={<PrimaryLabelLine label={label} />}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.artwork) {
          return <PrimaryLabelLine label={label} />
        }

        return (
          <PrimaryLabelLineFragmentContainer
            label={label}
            artwork={props.artwork}
          />
        )
      }}
    />
  )
}
