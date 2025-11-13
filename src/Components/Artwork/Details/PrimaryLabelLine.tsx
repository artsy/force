import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Text } from "@artsy/palette"
import type { PrimaryLabelLine_artwork$data } from "__generated__/PrimaryLabelLine_artwork.graphql"
import type { PrimaryLabelLineQuery } from "__generated__/PrimaryLabelLineQuery.graphql"
import { type FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface PrimaryLabelLineProps {
  label: string | null | undefined
  artwork?: PrimaryLabelLine_artwork$data
}

export const PrimaryLabelLine: React.FC<
  React.PropsWithChildren<PrimaryLabelLineProps>
> = ({ label, artwork }) => {
  const { hideSignals, updateSignals } = useArtworkGridContext()
  const partnerOffer = artwork?.collectorSignals?.partnerOffer

  useEffect(() => {
    if (updateSignals && artwork?.internalID) {
      const signals: string[] = []

      if (partnerOffer) {
        signals.push("PARTNER_OFFER")
      }

      if (label) {
        signals.push(label)
      }
      updateSignals(artwork.internalID, signals)
    }
  }, [updateSignals, partnerOffer, label, artwork?.internalID])

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
        borderColor="mono100"
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
        borderColor="mono100"
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
        internalID
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

export const PrimaryLabelLineQueryRenderer: FC<
  PrimaryLabelLineQueryRendererProps
> = ({ id, label }) => {
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
