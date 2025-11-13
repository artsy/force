import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import Metadata from "Components/Artwork/Metadata"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"
import { useNotificationsTracking } from "Components/Notifications/Hooks/useNotificationsTracking"
import { RouterLink } from "System/Components/RouterLink"
import { useTimer } from "Utils/Hooks/useTimer"
import { resized } from "Utils/resized"
import { ContextModule } from "@artsy/cohesion"
import { Box, Button, Image, Link, Text, useTheme } from "@artsy/palette"
import type { PartnerOfferArtwork_artwork$key } from "__generated__/PartnerOfferArtwork_artwork.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface PartnerOfferArtworkProps {
  artwork: PartnerOfferArtwork_artwork$key
  targetHref: string
  endAt?: string | null
  note?: string | null
  available?: boolean | null
  partnerOfferID?: string
  priceWithDiscount?: string | null
}

export const PartnerOfferArtwork: FC<
  React.PropsWithChildren<PartnerOfferArtworkProps>
> = ({
  artwork: artworkProp,
  targetHref,
  priceWithDiscount,
  endAt = "",
  note = "",
  available = false,
  partnerOfferID,
}) => {
  const { theme } = useTheme()

  const { tracking } = useNotificationsTracking()
  const { hasEnded } = useTimer(endAt || "")
  const fullyAvailable = !!(available && !hasEnded && priceWithDiscount)

  const artwork = useFragment(partnerOfferArtworkFragment, artworkProp)
  const priceListed = artwork.price || "Not publicly listed"
  const image = resized(artwork?.image?.src ?? "", { width: CARD_MAX_WIDTH })
  const label =
    (artwork.title ?? "Artwork") +
    (artwork.artistNames ? ` by ${artwork.artistNames}` : "")
  const partnerIcon = artwork.partner?.profile?.icon?.url
  const artworkListingHref = `${artwork.href}?partner_offer_id=${partnerOfferID}`

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
          <Link href={fullyAvailable ? artworkListingHref : href}>
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
              style={{
                objectFit: "contain",
                backgroundColor: theme.colors.mono0,
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
          hideSaleInfo={!fullyAvailable}
          maxWidth="100%"
          to={fullyAvailable ? artworkListingHref : href}
        />

        {fullyAvailable && (
          <Text variant="xs" color="mono60" overflowEllipsis>
            (List price: {priceListed})
          </Text>
        )}
      </Box>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        width="100%"
        maxWidth={CARD_MAX_WIDTH}
        gap={2}
      >
        <Button
          // @ts-expect-error
          as={RouterLink}
          to={href}
          onClick={() => {
            tracking.clickBuyNow(
              artwork.internalID,
              artwork.slug,
              artwork.collectorSignals ?? undefined
            )
          }}
          data-testid="partner-offer-artwork-button"
          flex={fullyAvailable ? 1 : [1, 0.5]}
        >
          {buttonText}
        </Button>
        {fullyAvailable && (
          <Button
            // @ts-expect-error
            as={RouterLink}
            to={artworkListingHref}
            onClick={() => {
              if (partnerOfferID) {
                tracking.clickedViewWork(artwork.internalID, partnerOfferID)
              }
            }}
            data-testid="partner-offer-view-artwork-button"
            flex={1}
            variant={"secondaryBlack"}
          >
            View Work
          </Button>
        )}
      </Box>
      {note && (
        <Box
          backgroundColor={"mono5"}
          padding={2}
          width="100%"
          maxWidth={CARD_MAX_WIDTH}
          display={"flex"}
          gap={1}
        >
          {partnerIcon && (
            <Box>
              <Image
                borderRadius={"50%"}
                src={partnerIcon}
                width={30}
                height={30}
                style={{
                  border: `1px solid ${theme.colors.mono30}`,
                }}
              />
            </Box>
          )}
          <Box flex={1}>
            <Text variant="sm" color="mono100" fontWeight={"bold"}>
              Note from the gallery
            </Text>
            <Text variant="sm" color="mono100">
              "{note}"
            </Text>
          </Box>
        </Box>
      )}
    </ManageArtworkForSavesProvider>
  )
}

const partnerOfferArtworkFragment = graphql`
  fragment PartnerOfferArtwork_artwork on Artwork {
    internalID
    slug
    href
    title
    artistNames
    price
    image {
      src: url(version: ["larger", "large"])
      width
      height
    }
    partner(shallow: true) {
      profile {
        icon {
          url(version: "square140")
        }
      }
    }
    collectorSignals {
      partnerOffer {
        endAt
      }
      increasedInterest
      curatorsPick
    }
    ...Metadata_artwork
  }
`
