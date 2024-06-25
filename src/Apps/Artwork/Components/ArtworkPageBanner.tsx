import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { Text } from "@artsy/palette"
import { ArtworkPageBanner_artwork$key } from "__generated__/ArtworkPageBanner_artwork.graphql"
import { ArtworkPageBanner_me$key } from "__generated__/ArtworkPageBanner_me.graphql"
import { extractNodes } from "Utils/extractNodes"
import { useRouter } from "System/Hooks/useRouter"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { CascadingEndTimesBannerFragmentContainer } from "Components/CascadingEndTimesBanner"

interface ArtworkPageBannerProps {
  artwork: ArtworkPageBanner_artwork$key
  me: ArtworkPageBanner_me$key
}
export const ArtworkPageBanner: FC<ArtworkPageBannerProps> = props => {
  const artwork = useFragment(ARTWORK_FRAGMENT, props.artwork)
  const me = useFragment(ME_FRAGMENT, props.me)
  const { match } = useRouter()

  const expectedPartnerOfferID = match?.location?.query?.partner_offer_id as
    | string
    | undefined

  const partnerOffer = expectedPartnerOfferID
    ? extractNodes(me?.partnerOffersConnection)[0]
    : null

  const queryParams = match.location.query

  // First show banners requested imperatively from the query string
  if (!!queryParams.unavailable) {
    return <ArtworkUnavailableBanner />
  }

  if (!!queryParams.expired_offer) {
    return <ExpiredOfferBanner />
  }

  if (!!artwork.sale) {
    return <CascadingEndTimesBannerFragmentContainer sale={artwork.sale} />
  }

  if (!artwork.published) {
    return <UnpublishedArtworkBanner />
  }

  if (expectedPartnerOfferID) {
    if (!artwork.isPurchasable) {
      return <ArtworkUnavailableBanner />
    }

    if (
      me &&
      (!partnerOffer || partnerOffer.internalID !== expectedPartnerOfferID)
    ) {
      return <ExpiredOfferBanner />
    }
  }

  return null
}

const ArtworkUnavailableBanner = () => (
  <FullBleedBanner variant="brand">
    <Text>
      Sorry, this artwork is no longer available. Please create an alert or
      contact the gallery to find similar artworks.
    </Text>
  </FullBleedBanner>
)

const ExpiredOfferBanner = () => (
  <FullBleedBanner variant="brand">
    <Text>
      This offer has expired. Please make an offer, purchase, or contact the
      gallery.
    </Text>
  </FullBleedBanner>
)

const UnpublishedArtworkBanner = () => (
  <FullBleedBanner variant="error">
    <Text>This work is not currently published on Artsy.</Text>
  </FullBleedBanner>
)

const ME_FRAGMENT = graphql`
  fragment ArtworkPageBanner_me on Me
    @argumentDefinitions(artworkID: { type: "String!" }) {
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
    isPurchasable
    sale {
      __typename
      ...CascadingEndTimesBanner_sale
    }
  }
`
