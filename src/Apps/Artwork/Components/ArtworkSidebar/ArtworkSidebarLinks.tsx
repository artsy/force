import { RouterLink } from "System/Components/RouterLink"

import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Spacer, Text } from "@artsy/palette"
import type { ArtworkSidebarLinks_artwork$data } from "__generated__/ArtworkSidebarLinks_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

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

  if (isUnlisted) {
    return null
  }

  return (
    <>
      <Spacer y={2} />

      {isInOpenAuction && (
        <>
          <Text variant="xs" color="mono60">
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
