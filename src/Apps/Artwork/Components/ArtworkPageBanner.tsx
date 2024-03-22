import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { Text } from "@artsy/palette"
import { ArtworkPageBanner_artwork$key } from "__generated__/ArtworkPageBanner_artwork.graphql"
import { ArtworkPageBanner_me$key } from "__generated__/ArtworkPageBanner_me.graphql"
import { extractNodes } from "Utils/extractNodes"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { CascadingEndTimesBannerFragmentContainer } from "Components/CascadingEndTimesBanner"
import { UnlistedArtworkBannerFragmentContainer } from "Components/UnlistedArtworkBanner"

interface ArtworkPageBannerProps {
  artwork: ArtworkPageBanner_artwork$key
  me: ArtworkPageBanner_me$key
}
export const ArtworkPageBanner: FC<ArtworkPageBannerProps> = props => {
  const artwork = useFragment(ARTWORK_FRAGMENT, props.artwork)
  const me = useFragment(ME_FRAGMENT, props.me)
  const { match } = useRouter()

  const partnerOfferVisibilityEnabled = useFeatureFlag(
    "emerald_partner-offers-to-artwork-page"
  )

  const privateArtworksEnabled = useFeatureFlag(
    "amber_artwork_visibility_unlisted"
  )

  if (!artwork) return null

  const showUnlistedArtworkBanner = !!(
    privateArtworksEnabled &&
    artwork?.visibilityLevel == "UNLISTED" &&
    artwork?.partner
  )

  const expectedPartnerOfferID = match?.location?.query?.partner_offer_id as
    | string
    | undefined

  const partnerOffer = expectedPartnerOfferID
    ? extractNodes(me?.partnerOffersConnection)[0]
    : null

  const expectedPartnerOfferNotFound =
    partnerOfferVisibilityEnabled &&
    expectedPartnerOfferID &&
    (!partnerOffer || partnerOffer.internalID !== expectedPartnerOfferID)

  const showExpiredOfferBanner =
    expectedPartnerOfferNotFound || !!match?.location?.query?.expired_offer

  // show unavailable artwork imperatively if the query param is present
  const showUnavailableArtworkBanner = !!match?.location?.query?.unavailable

  // Does not necessariliy show a banner
  const showCascadingEndTimesBanner = !!artwork.sale

  const showUnpublishedArtworkBanner = !artwork.published

  return (
    <>
      {showUnpublishedArtworkBanner && (
        <FullBleedBanner variant="error">
          <Text>This work is not currently published on Artsy.</Text>
        </FullBleedBanner>
      )}

      {showCascadingEndTimesBanner && (
        <CascadingEndTimesBannerFragmentContainer sale={artwork.sale} />
      )}
      {showUnlistedArtworkBanner && artwork.partner && (
        <UnlistedArtworkBannerFragmentContainer partner={artwork.partner} />
      )}

      {showExpiredOfferBanner && (
        <FullBleedBanner variant="brand">
          <Text>
            This offer has expired. Please make an offer, purchase, or contact
            the gallery.
          </Text>
        </FullBleedBanner>
      )}

      {showUnavailableArtworkBanner && (
        <FullBleedBanner variant="brand">
          <Text>
            Sorry, this artwork is no longer available. Please create an alert
            or contact the gallery to find similar artworks.
          </Text>
        </FullBleedBanner>
      )}
    </>
  )
}

const ME_FRAGMENT = graphql`
  fragment ArtworkPageBanner_me on Me {
    partnerOffersConnection(artworkID: $artworkID, first: 1) {
      edges {
        node {
          internalID
        }
      }
    }
  }
`

const ARTWORK_FRAGMENT = graphql`
  fragment ArtworkPageBanner_artwork on Artwork {
    published
    visibilityLevel
    partner {
      __typename
      ...UnlistedArtworkBanner_partner
    }
    sale {
      __typename
      ...CascadingEndTimesBanner_sale
    }
  }
`
