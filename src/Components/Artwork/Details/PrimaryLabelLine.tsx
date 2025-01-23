import { Text } from "@artsy/palette"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { processArtworkFulfillmentOptions } from "Utils/processFulfillmentOptions"
import type { PrimaryLabelLineQuery } from "__generated__/PrimaryLabelLineQuery.graphql"
import type { PrimaryLabelLine_artwork$data } from "__generated__/PrimaryLabelLine_artwork.graphql"
import type { PrimaryLabelLine_me$data } from "__generated__/PrimaryLabelLine_me.graphql"
import { type FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface PrimaryLabelLineProps {
  label: string | null | undefined
  artwork?: PrimaryLabelLine_artwork$data
  me?: PrimaryLabelLine_me$data
}

export const PrimaryLabelLine: React.FC<
  React.PropsWithChildren<PrimaryLabelLineProps>
> = ({ label, artwork, me }) => {
  const { hideSignals, updateSignals } = useArtworkGridContext()
  const partnerOffer = artwork?.collectorSignals?.partnerOffer

  const { freeShippingToUserCountry, freeGlobalShipping } =
    processArtworkFulfillmentOptions(artwork, me) || {}
  const shipsFree = freeShippingToUserCountry || freeGlobalShipping

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (updateSignals && artwork?.internalID) {
      const signals: string[] = []

      if (shipsFree) {
        signals.push("SHIPS_TO_YOU_FREE")
      }

      if (partnerOffer) {
        signals.push("PARTNER_OFFER")
      }

      if (label) {
        signals.push(label)
      }

      updateSignals(artwork.internalID, signals)
    }
  }, [partnerOffer, label, artwork?.internalID])

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

  if (shipsFree) {
    return (
      <Text
        variant="xs"
        color="green100"
        backgroundColor="green10"
        px={0.5}
        alignSelf="flex-start"
        borderRadius={3}
        my="1px"
        style={{ whiteSpace: "nowrap" }}
      >
        🎁 Free Shipping to YOU!
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
    me: graphql`
      fragment PrimaryLabelLine_me on Me {
        location {
          countryCode
          country
        }
      }
    `,
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
          curatorsPick
          increasedInterest
          runningShow {
            city
          }
        }
        ## Artwork fulfillment data
        isPurchasable
        shippingCountry
        domesticShippingFee {
          minor
        }
        euShippingOrigin
        internationalShippingFee {
          minor
        }
        artsyShippingDomestic
        artsyShippingInternational
        pickupAvailable
        onlyShipsDomestically # maybe ignored for make offer?
      }
    `,
  },
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
          me {
            ...PrimaryLabelLine_me
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
            me={props.me || undefined}
          />
        )
      }}
    />
  )
}
