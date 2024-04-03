import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { PartnerOfferArtwork_artwork$key } from "__generated__/PartnerOfferArtwork_artwork.graphql"
import { resized } from "Utils/resized"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { RouterLink } from "System/Router/RouterLink"
import { Box, Button, Flex, Image, Link, THEME, Text } from "@artsy/palette"
import Metadata from "Components/Artwork/Metadata"
import { ContextModule } from "@artsy/cohesion"
import { useTimer } from "Utils/Hooks/useTimer"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"
import { useFeatureFlag } from "System/useFeatureFlag"

interface PartnerOfferArtworkProps {
  artwork: PartnerOfferArtwork_artwork$key
  targetHref: string
  endAt?: string | null
  note?: string | null
  available?: boolean | null
  partnerOfferID?: string
  priceWithDiscount?: string | null
}

export const PartnerOfferArtwork: FC<PartnerOfferArtworkProps> = ({
  artwork: artworkProp,
  targetHref,
  priceWithDiscount,
  endAt = "",
  note = "",
  available = false,
  partnerOfferID,
}) => {
  const { hasEnded } = useTimer(endAt || "")
  const fullyAvailable = !!(available && !hasEnded && priceWithDiscount)

  const artwork = useFragment(partnerOfferArtworkFragment, artworkProp)
  const priceListed = artwork.price || "Not publicly listed"
  const image = resized(artwork?.image?.src ?? "", { width: CARD_MAX_WIDTH })
  const label =
    (artwork.title ?? "Artwork") +
    (artwork.artistNames ? ` by ${artwork.artistNames}` : "")
  const partnerOfferVisibilityEnabled = useFeatureFlag(
    "emerald_partner-offers-to-artwork-page"
  )
  const artworkListingHref =
    artwork.href + "?partner_offer_id=" + partnerOfferID

  let buttonText = "Purchase"
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
      <Box
        display="flex"
        flexDirection="column"
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
          maxHeight={"35vh"}
        >
          <Link
            href={
              partnerOfferVisibilityEnabled && fullyAvailable
                ? artworkListingHref
                : href
            }
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
          </Link>
        </Box>

        <Metadata
          artwork={artwork}
          contextModule={ContextModule.activity}
          showSaveButton
          hideSaleInfo
          maxWidth="100%"
          to={
            partnerOfferVisibilityEnabled && fullyAvailable
              ? artworkListingHref
              : href
          }
        />

        {fullyAvailable && (
          <Flex flexDirection="row">
            <Text
              variant="xs"
              color="black100"
              fontWeight="bold"
              overflowEllipsis
            >
              {priceWithDiscount}
              {" "}
            </Text>
            <Text variant="xs" color="black60" overflowEllipsis>
              (List price: {priceListed})
            </Text>
          </Flex>
        )}
      </Box>
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
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        width="100%"
        maxWidth={CARD_MAX_WIDTH}
      >
        {partnerOfferVisibilityEnabled && fullyAvailable && (
          <Button
            // @ts-ignore
            as={RouterLink}
            to={artworkListingHref}
            data-testid="partner-offer-view-artwork-button"
            flex={1}
            mr={2}
            variant={"secondaryBlack"}
          >
            {"View Work"}
          </Button>
        )}
        <Button
          // @ts-ignore
          as={RouterLink}
          to={href}
          data-testid="partner-offer-artwork-button"
          flex={partnerOfferVisibilityEnabled && fullyAvailable ? 1 : undefined}
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
    price
    image {
      src: url(version: ["larger", "large"])
      width
      height
    }
    ...Metadata_artwork
  }
`
