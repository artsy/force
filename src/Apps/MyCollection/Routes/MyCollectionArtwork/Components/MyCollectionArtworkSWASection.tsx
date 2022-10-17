import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Button, Clickable, Separator, Text } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Router/RouterLink"

interface Props {
  route: string
  learnMore: () => void
  slug: string
  artworkId: string
}

export const MyCollectionArtworkSWASectionMobileLayout: React.FC<Props> = ({
  route,
  learnMore,
  slug,
  artworkId,
}) => {
  const tracking = useTracking()

  return (
    <>
      <Text mb={0.5} mt={4} variant="sm-display">
        Interested in Selling This Work?
      </Text>
      <Text mb={2} color="black60" variant="xs">
        Let our experts find the best sales option for you.
      </Text>
      <RouterLink noUnderline to={route} data-testid="submit-for-sale-link">
        <Button
          variant="primaryBlack"
          width="100%"
          mb={2}
          data-testid="submit-for-sale"
          onClick={() => {
            tracking.trackEvent({
              contextModule: ContextModule.topWorksRail,
              context_page_owner_type: OwnerType.myCollectionArtwork,
              context_page_owner_id: artworkId,
              context_page_owner_slug: slug,
              destination_page_owner_type: OwnerType.consignmentFlow,
              subject: "Submit This Artwork to Sell",
              platform: "web",
            })
          }}
        >
          Submit for Sale
        </Button>
      </RouterLink>

      <Text color="black60" variant="xs">
        Learn more about{" "}
        <Clickable
          onClick={() => {
            learnMore()
            tracking.trackEvent({
              contextModule: ContextModule.topWorksRail,
              context_page_owner_type: OwnerType.myCollectionArtwork,
              context_page_owner_id: artworkId,
              context_page_owner_slug: slug,
              subject: "Learn More",
              platform: "web",
            })
          }}
          color="black60"
          textDecoration="underline"
          data-testid="learn-more"
        >
          selling with Artsy.
        </Clickable>
      </Text>
    </>
  )
}

export const MyCollectionArtworkSWASectionDesktopLayout: React.FC<Props> = ({
  route,
  learnMore,
  slug,
  artworkId,
}) => {
  const tracking = useTracking()

  return (
    <>
      <Separator my={2} />
      <Text mb={0.5} variant="sm-display">
        Interested in Selling This Work?
      </Text>
      <Text mb={2} color="black60" variant="xs">
        Let our experts find the best sales option for you.
      </Text>
      <RouterLink
        noUnderline
        to={route}
        data-testid="submit-for-sale-link"
        onClick={() => {
          tracking.trackEvent({
            contextModule: ContextModule.topWorksRail,
            context_page_owner_type: OwnerType.myCollectionArtwork,
            context_page_owner_id: artworkId,
            context_page_owner_slug: slug,
            destination_page_owner_type: OwnerType.consignmentFlow,
            subject: "Submit This Artwork to Sell",
            platform: "web",
          })
        }}
      >
        <Button
          variant="secondaryNeutral"
          width="100%"
          mb={2}
          data-testid="submit-for-sale-desktop"
        >
          Submit for Sale
        </Button>
      </RouterLink>
      <Text mb={2} color="black60" variant="xs">
        Learn more about{" "}
        <Clickable
          onClick={() => {
            learnMore()
            tracking.trackEvent({
              contextModule: ContextModule.topWorksRail,
              context_page_owner_type: OwnerType.myCollectionArtwork,
              context_page_owner_id: artworkId,
              context_page_owner_slug: slug,
              subject: "Learn More",
              platform: "web",
            })
          }}
          color="black60"
          textDecoration="underline"
          data-testid="learn-more-desktop"
        >
          selling with Artsy.
        </Clickable>
      </Text>
      <Separator mt={2} />
    </>
  )
}
