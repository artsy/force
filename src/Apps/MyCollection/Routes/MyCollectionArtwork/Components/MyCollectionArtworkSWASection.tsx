import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Button, Clickable, Separator, Text } from "@artsy/palette"
import { useCreateSubmissionFromArtwork } from "Apps/Sell/Mutations/useCreateSubmissionFromArtwork"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import { MyCollectionArtworkSWASection_artwork$key } from "__generated__/MyCollectionArtworkSWASection_artwork.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface MyCollectionArtworkSWASectionProps {
  learnMore: () => void
  artwork: MyCollectionArtworkSWASection_artwork$key
  ctaColor?: "primaryBlack" | "secondaryNeutral" | null
}

export const MyCollectionArtworkSWASection: React.FC<MyCollectionArtworkSWASectionProps> = ({
  learnMore,
  ...restProps
}) => {
  const artwork = useFragment(
    MyCollectionArtworkSWASectionFragment,
    restProps.artwork
  )

  const enableNewSubmissionFlow = useFeatureFlag("onyx_new_submission_flow")
  const tracking = useTracking()
  const { createSubmissionFromArtwork } = useCreateSubmissionFromArtwork()
  const { router } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitArtwork = async () => {
    tracking.trackEvent({
      contextModule: ContextModule.topWorksRail,
      context_page_owner_type: OwnerType.myCollectionArtwork,
      context_page_owner_id: artwork.internalID,
      context_page_owner_slug: artwork?.artist?.slug,
      destination_page_owner_type: OwnerType.consignmentFlow,
      subject: "Submit This Artwork to Sell",
      platform: "web",
    })

    if (!enableNewSubmissionFlow) return

    setIsLoading(true)

    try {
      const submissionID =
        artwork.consignmentSubmission?.internalID ||
        (await createSubmissionFromArtwork(artwork.internalID))

      router.push(`/sell2/submissions/${submissionID}/artist`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box>
      <Separator my={2} />

      <Text mb={0.5} variant="sm-display">
        Interested in Selling This Work?
      </Text>

      <Text mb={2} color="black60" variant="xs">
        Let our experts find the best sales option for you.
      </Text>

      <Button
        variant="primaryBlack"
        width="100%"
        mb={2}
        // @ts-ignore
        as={enableNewSubmissionFlow ? undefined : RouterLink}
        to={
          !enableNewSubmissionFlow &&
          `/collector-profile/my-collection/submission/artwork-details/${artwork.internalID}`
        }
        data-testid="submit-for-sale-link"
        onClick={handleSubmitArtwork}
        loading={isLoading}
      >
        Submit for Sale
      </Button>

      <Text color="black60" variant="xs">
        Learn more about{" "}
        <Clickable
          onClick={() => {
            learnMore()
            tracking.trackEvent({
              contextModule: ContextModule.topWorksRail,
              context_page_owner_type: OwnerType.myCollectionArtwork,
              context_page_owner_id: artwork.internalID,
              context_page_owner_slug: artwork?.artist?.slug,
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

      <Separator my={2} />
    </Box>
  )
}

const MyCollectionArtworkSWASectionFragment = graphql`
  fragment MyCollectionArtworkSWASection_artwork on Artwork {
    internalID
    artist {
      slug
    }
    consignmentSubmission {
      internalID
    }
  }
`
