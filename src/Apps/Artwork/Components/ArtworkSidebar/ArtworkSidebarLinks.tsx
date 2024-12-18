import { Spacer, Text } from "@artsy/palette"

import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { ArtworkSidebarLinks_artwork$data } from "__generated__/ArtworkSidebarLinks_artwork.graphql"

interface ArtworkSidebarLinksProps {
  artwork: ArtworkSidebarLinks_artwork$data
}

const ArtworkSidebarLinks: React.FC<
  React.PropsWithChildren<ArtworkSidebarLinksProps>
> = ({ artwork }) => {
  const tracking = useTracking()
  const { sale, isInAuction, isUnlisted } = artwork

  const isInOpenAuction = isInAuction && sale && !sale.isClosed

  const trackClickedConditionsOfSale = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      subject: DeprecatedSchema.Subject.AuctionConditionsOfSale,
      type: DeprecatedSchema.Type.Link,
    })
  }

  const trackClickedSellWithArtsy = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      subject: "sell with artsy",
      type: DeprecatedSchema.Type.Link,
    })
  }

  if (isUnlisted) {
    return null
  }

  return (
    <>
      <Spacer y={2} />

      {isInOpenAuction && (
        <>
          <Text variant="xs" color="black60">
            By placing your bid you agree to Artsy's{" "}
            <RouterLink
              inline
              to="/terms"
              onClick={trackClickedConditionsOfSale}
            >
              General Terms and Conditions of Sale
            </RouterLink>
          </Text>

          <Spacer y={1} />
        </>
      )}

      <Text variant="xs" color="black60">
        Want to sell a work by this artist?{" "}
        <RouterLink inline to="/sell" onClick={trackClickedSellWithArtsy}>
          Sell with Artsy
        </RouterLink>
      </Text>
    </>
  )
}

export const ArtworkSidebarLinksFragmentContainer = createFragmentContainer(
  ArtworkSidebarLinks,
  {
    artwork: graphql`
      fragment ArtworkSidebarLinks_artwork on Artwork {
        isInAuction
        isUnlisted
        sale {
          isClosed
        }
      }
    `,
  }
)
