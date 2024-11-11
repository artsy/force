import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { Text } from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { PrimaryLabelLine_artwork$key } from "__generated__/PrimaryLabelLine_artwork.graphql"
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

  if (!label || !!partnerOffer) {
    return null
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
