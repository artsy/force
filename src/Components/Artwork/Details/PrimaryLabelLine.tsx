import { Text } from "@artsy/palette"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { PrimaryLabelLineQuery } from "__generated__/PrimaryLabelLineQuery.graphql"
import type { PrimaryLabelLine_artwork$data } from "__generated__/PrimaryLabelLine_artwork.graphql"
import { type FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface PrimaryLabelLineProps {
  label: string | null | undefined
  artwork?: PrimaryLabelLine_artwork$data
}

const MY_FAKE_LOCATIONS = ["US", "DE"]
const EU_COUNTRY_CODES = ["DE", "FR", "IT", "ES", "NL", "BE", "LU", "AT", "PT"]

const getShippingSignal: (
  artwork?: PrimaryLabelLine_artwork$data,
) => null | "SHIPS_TO_YOU_FREE" = artwork => {
  if (artwork) {
    if (artwork.domesticShippingFee?.minor === 0) {
      if (
        artwork.shippingCountry &&
        MY_FAKE_LOCATIONS.includes(artwork.shippingCountry)
      ) {
        return "SHIPS_TO_YOU_FREE"
      }
      if (
        artwork.euShippingOrigin &&
        MY_FAKE_LOCATIONS.reduce(
          (prev, current) => prev || EU_COUNTRY_CODES.includes(current),
          false,
        )
      ) {
        return "SHIPS_TO_YOU_FREE"
      }
    } else if (artwork.internationalShippingFee?.minor === 0) {
      return "SHIPS_TO_YOU_FREE"
    }
  }
  return null
}

export const PrimaryLabelLine: React.FC<
  React.PropsWithChildren<PrimaryLabelLineProps>
> = ({ label, artwork }) => {
  const { hideSignals, updateSignals } = useArtworkGridContext()
  const partnerOffer = artwork?.collectorSignals?.partnerOffer
  const shippingSignal = getShippingSignal(artwork)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (updateSignals && artwork?.internalID) {
      const signals: string[] = []

      if (shippingSignal) {
        signals.push(shippingSignal)
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

  if (shippingSignal === "SHIPS_TO_YOU_FREE") {
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
    artwork: graphql`
      fragment PrimaryLabelLine_artwork on Artwork {
        internalID

        pickupAvailable
        shippingCountry
        euShippingOrigin
        processWithArtsyShippingDomestic # Maybe mooea
        domesticShippingFee {
          __typename
          minor # 0 = free
        }
        internationalShippingFee {
          __typename
          minor # 0 = free
        }
        artsyShippingDomestic # Artsy shipping domestic
        artsyShippingInternational # Artsy shipping international
        onlyShipsDomestically

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
