import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { PartnerOfferArtwork_artwork$key } from "__generated__/PartnerOfferArtwork_artwork.graphql"
import { resized } from "Utils/resized"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { RouterLink } from "System/Router/RouterLink"
import { Box, Button, Flex, Image, THEME, Text } from "@artsy/palette"
import Metadata from "Components/Artwork/Metadata"
import { ContextModule } from "@artsy/cohesion"
import { useTimer } from "Utils/Hooks/useTimer"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"

interface PartnerOfferArtworkProps {
  artwork: PartnerOfferArtwork_artwork$key
  targetHref: string
  endAt?: string | null
  note?: string | null
  available?: boolean | null
  priceListedMessage?: string | null
  priceWithDiscountMessage?: string | null
}

export const PartnerOfferArtwork: FC<PartnerOfferArtworkProps> = ({
  artwork: artworkProp,
  targetHref,
  priceListedMessage,
  priceWithDiscountMessage,
  endAt = "",
  note = "",
  available = false,
}) => {
  const { hasEnded } = useTimer(endAt || "")
  const fullyAvailable = !!(
    available &&
    !hasEnded &&
    priceWithDiscountMessage &&
    priceListedMessage
  )

  const artwork = useFragment(partnerOfferArtworkFragment, artworkProp)
  const image = resized(artwork?.image?.src ?? "", { width: CARD_MAX_WIDTH })
  const label =
    (artwork.title ?? "Artwork") +
    (artwork.artistNames ? ` by ${artwork.artistNames}` : "")

  let buttonText = "Continue To Purchase"
  if (hasEnded) buttonText = "View Work"
  if (!available) buttonText = "Create Alert"

  let href = targetHref
  if (!available) {
    href = `${artwork.href}${
      artwork.href?.includes("?") ? "&" : "?"
    }unavailable=true`
  } else if (hasEnded) {
    href = `${artwork.href}${
      artwork.href?.includes("?") ? "&" : "?"
    }expired_offer=true`
  }

  return (
    <ManageArtworkForSavesProvider>
      <RouterLink
        to={href}
        display="flex"
        flexDirection="column"
        textDecoration="none"
        aria-label={label}
        maxWidth={CARD_MAX_WIDTH}
        overflow="hidden"
        width="100%"
        mb={2}
      >
        <Box
          width="100%"
          style={{
            aspectRatio: `${artwork.image?.width ?? 1} / ${
              artwork.image?.height ?? 1
            }`,
          }}
          maxHeight={"40vh"}
        >
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            style={{
              objectFit: "contain",
              backgroundColor: THEME.colors.white100,
            }}
            lazyLoad
            alt=""
          />
        </Box>

        <Metadata
          artwork={artwork}
          contextModule={ContextModule.activity}
          showSaveButton
          disableRouterLinking
          hideSaleInfo
          maxWidth="100%"
        />

        {fullyAvailable && (
          <Flex flexDirection="row">
            <Text
              variant="xs"
              color="black100"
              fontWeight="bold"
              overflowEllipsis
            >
              {priceWithDiscountMessage}
              {" "}
            </Text>
            <Text variant="xs" color="black60" overflowEllipsis>
              (List price: {priceListedMessage})
            </Text>
          </Flex>
        )}
      </RouterLink>
      {note && (
        <Box
          backgroundColor={"black10"}
          mb={2}
          padding={1}
          width="100%"
          maxWidth={CARD_MAX_WIDTH}
        >
          <Text variant="xs" color="black100">
            Note from the gallery:
          </Text>
          <Text variant="xs" color="black60">
            {note}
          </Text>
        </Box>
      )}
      <Box mb={4} width="100%" maxWidth={CARD_MAX_WIDTH}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to={href}
          data-testid="partner-offer-artwork-button"
        >
          {buttonText}
        </Button>
      </Box>
    </ManageArtworkForSavesProvider>
  )
}

const partnerOfferArtworkFragment = graphql`
  fragment PartnerOfferArtwork_artwork on Artwork {
    href
    title
    artistNames
    image {
      src: url(version: ["larger", "large"])
      width
      height
    }
    ...Metadata_artwork
  }
`
