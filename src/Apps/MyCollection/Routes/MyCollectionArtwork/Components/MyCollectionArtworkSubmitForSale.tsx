import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Button, Separator, Text } from "@artsy/palette"
import { createOrUpdateConsignSubmission } from "Apps/Sell/Utils/createOrUpdateConsignSubmission"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { MyCollectionArtworkSubmitForSale_artwork$key } from "__generated__/MyCollectionArtworkSubmitForSale_artwork.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface MyCollectionArtworkSubmitForSaleProps {
  artwork: MyCollectionArtworkSubmitForSale_artwork$key
}

export const MyCollectionArtworkSubmitForSale: React.FC<React.PropsWithChildren<MyCollectionArtworkSubmitForSaleProps>> = props => {
  const { trackEvent } = useTracking()
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { router } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const artwork = useFragment(
    MyCollectionArtworkSubmitForSaleFragment,
    props.artwork
  )

  const isHighDemand = (artwork?.marketPriceInsights?.demandRank || 0) >= 0.9
  const isTargetSupply = artwork?.artist?.targetSupply?.priority === "TRUE"

  const handleSubmitArtwork = async () => {
    trackEvent({
      contextModule: ContextModule.topWorksRail,
      context_page_owner_type: OwnerType.myCollectionArtwork,
      context_page_owner_id: artwork.internalID,
      context_page_owner_slug: artwork?.artist?.slug,
      destination_page_owner_type: OwnerType.consignmentFlow,
      subject: "Submit This Artwork to Sell",
      platform: "web",
    })

    setIsLoading(true)

    try {
      let submissionID = artwork.consignmentSubmission?.internalID

      if (!submissionID) {
        submissionID = await createOrUpdateConsignSubmission(relayEnvironment, {
          sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
          artistID: artwork.artist?.internalID,
          myCollectionArtworkID: artwork.internalID,
        })
      }

      router.push(`/sell/submissions/${submissionID}/artist`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isTargetSupply) return null

  return (
    <Box>
      <Separator my={4} />

      <Text mb={0.5} variant="md">
        Interested in Selling This Work?
      </Text>

      <Text mb={2} color="black60" variant="sm">
        {!!isHighDemand && "Your artwork is in high demand. "}
        Let our experts find the best sales option for you.
      </Text>

      <Button
        variant="primaryBlack"
        data-testid="submit-for-sale-link"
        onClick={handleSubmitArtwork}
        loading={isLoading}
      >
        Submit for Sale
      </Button>
    </Box>
  )
}

const MyCollectionArtworkSubmitForSaleFragment = graphql`
  fragment MyCollectionArtworkSubmitForSale_artwork on Artwork {
    internalID
    artist {
      internalID
      slug
      targetSupply {
        priority
      }
    }
    consignmentSubmission {
      internalID
    }
    marketPriceInsights {
      demandRank
    }
  }
`
