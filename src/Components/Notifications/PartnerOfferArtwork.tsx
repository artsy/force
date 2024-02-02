import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { PartnerOfferArtwork_artwork$key } from "__generated__/PartnerOfferArtwork_artwork.graphql"
import { resized } from "Utils/resized"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { RouterLink } from "System/Router/RouterLink"
import { Box, Button, Image } from "@artsy/palette"
import Metadata from "Components/Artwork/Metadata"
import { ContextModule } from "@artsy/cohesion"
import { useTimer } from "Utils/Hooks/useTimer"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"

interface PartnerOfferArtworkProps {
  artwork: PartnerOfferArtwork_artwork$key
  targetHref: string
  expiresAt?: string | null
  available?: boolean | null
}

export const PartnerOfferArtwork: FC<PartnerOfferArtworkProps> = ({
  artwork: artworkProp,
  targetHref,
  expiresAt = "",
  available = false,
}) => {
  const { hasEnded } = useTimer(expiresAt || "")
  const fullyAvailable = !!(available && !hasEnded)

  const artwork = useFragment(partnerOfferArtworkFragment, artworkProp)
  const image = resized(artwork?.image?.src ?? "", { width: CARD_MAX_WIDTH })
  const label =
    (artwork.title ?? "Artwork") +
    (artwork.artistNames ? ` by ${artwork.artistNames}` : "")

  let buttonText = "Continue To Purchase"
  if (hasEnded) buttonText = "View Work"
  if (!available) buttonText = "Create Alert"

  const href = fullyAvailable ? targetHref : artwork?.href

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
          bg="black10"
        >
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            lazyLoad
            alt=""
          />
        </Box>

        <Metadata
          artwork={artwork}
          contextModule={ContextModule.activity}
          showSaveButton
          disableRouterLinking
          maxWidth="100%"
        />
      </RouterLink>

      <Box mb={4} width="100%" maxWidth={CARD_MAX_WIDTH}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to={href}
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
