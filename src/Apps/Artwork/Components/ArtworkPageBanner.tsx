import { type BannerVariant, Flex, Spacer, Text } from "@artsy/palette"
import { CascadingEndTimesBannerFragmentContainer } from "Components/CascadingEndTimesBanner"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { extractNodes } from "Utils/extractNodes"
import type { ArtworkPageBannerOrdersQuery } from "__generated__/ArtworkPageBannerOrdersQuery.graphql"
import type { ArtworkPageBanner_artwork$key } from "__generated__/ArtworkPageBanner_artwork.graphql"
import type { ArtworkPageBanner_me$key } from "__generated__/ArtworkPageBanner_me.graphql"
import type { FC } from "react"
import { graphql, useFragment, useLazyLoadQuery } from "react-relay"

interface ArtworkPageBannerProps {
  artwork: ArtworkPageBanner_artwork$key
  me: ArtworkPageBanner_me$key | null | undefined
}
export const ArtworkPageBanner: FC<
  React.PropsWithChildren<ArtworkPageBannerProps>
> = props => {
  const artwork = useFragment(ARTWORK_FRAGMENT, props.artwork)
  const me = useFragment(ME_FRAGMENT, props.me)
  const { match } = useRouter()

  const expectedPartnerOfferID = match?.location?.query?.partner_offer_id as
    | string
    | undefined

  const partnerOffer = expectedPartnerOfferID
    ? extractNodes(me?.partnerOffersConnection)[0]
    : null

  // Lazy load orders using the real artwork.internalID
  const { loading, data: ordersData } =
    useClientQuery<ArtworkPageBannerOrdersQuery>({
      query: ORDERS_QUERY,
      variables: {
        artworkID: artwork.internalID,
      },
    })

  const orders = extractNodes(ordersData?.me?.ordersConnection)
  const order = orders[0]

  const queryParams = match.location.query

  if (loading) {
    return null
  }

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
      partnerOffer &&
      partnerOffer.internalID === expectedPartnerOfferID &&
      !partnerOffer.isActive
    ) {
      return <ExpiredOfferBanner />
    }
  }

  if (order) {
    return <OrderBanner order={order} />
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

interface OrderBannerProps {
  order: {
    readonly internalID: string
    readonly buyerState: string | null | undefined
    readonly displayTexts: {
      readonly title: string
    }
  }
}

const OrderBanner: FC<React.PropsWithChildren<OrderBannerProps>> = ({
  order,
}) => {
  let variant: BannerVariant = "defaultLight"
  let copy = "You ordered this artwork"
  let linkCopy = "View order"

  switch (order.buyerState) {
    case "APPROVED":
      copy = "Your order has been approved!"
      variant = "success"
      break
    case "COMPLETED":
      copy = "Your order is complete!"
      break
    case "OFFER_RECEIVED":
      copy = "The gallery has responded to your offer."
      linkCopy = "View offer"
      variant = "defaultDark"
      break
    case "PAYMENT_FAILED":
      copy = "Your payment failed."
      linkCopy = "Update payment information"
      variant = "error"
      break
    case "PROCESSING_OFFLINE_PAYMENT":
      copy = "Your order is being processed."
      linkCopy = "Please complete the payment."
      variant = "defaultDark"
      break
    case "REFUNDED":
      copy = "Your order has been refunded."
      variant = "defaultDark"
      break
    case "SHIPPED":
      copy = "Your order has been shipped!"
      variant = "success"
      break
    case "PROCESSING_PAYMENT":
      copy = "Your payment is being processed."
      break
  }

  return (
    <FullBleedBanner variant={variant}>
      <Flex gap={1}>
        <Text>{copy}</Text>
        <Text>
          <RouterLink
            to={`/orders/${order.internalID}/details`}
            textDecoration="underline"
          >
            {linkCopy}
          </RouterLink>
        </Text>
      </Flex>
    </FullBleedBanner>
  )
}

const ME_FRAGMENT = graphql`
  fragment ArtworkPageBanner_me on Me
  @argumentDefinitions(artworkID: { type: "String!" }) {
    partnerOffersConnection(artworkID: $artworkID, first: 1) {
      edges {
        node {
          internalID
          isActive
        }
      }
    }
  }
`

const ORDERS_QUERY = graphql`
  query ArtworkPageBannerOrdersQuery($artworkID: String!) {
    me {
      ordersConnection(
        artworkID: $artworkID
        first: 10
        buyerState: [
          SUBMITTED
          APPROVED
          COMPLETED
          OFFER_RECEIVED
          PROCESSING_OFFLINE_PAYMENT
          REFUNDED
          PAYMENT_FAILED
          SHIPPED
          PROCESSING_PAYMENT
        ]
      ) {
        edges {
          node {
            internalID
            buyerState
            displayTexts {
              title
            }
          }
        }
      }
    }
  }
`

const ARTWORK_FRAGMENT = graphql`
  fragment ArtworkPageBanner_artwork on Artwork {
    internalID
    published
    visibilityLevel
    isPurchasable
    sale {
      __typename
      ...CascadingEndTimesBanner_sale
    }
  }
`
