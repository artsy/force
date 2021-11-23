import { Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext, useTracking } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { HomeFeaturedGalleriesRail_orderedSet } from "v2/__generated__/HomeFeaturedGalleriesRail_orderedSet.graphql"
import { HomeFeaturedGalleriesRailQuery } from "v2/__generated__/HomeFeaturedGalleriesRailQuery.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import {
  ActionType,
  ClickedGalleryGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Rail } from "v2/Components/Rail"
import {
  PartnerCellFragmentContainer,
  PartnerCellPlaceholder,
} from "v2/Components/Cells/PartnerCell"

interface HomeFeaturedGalleriesRailProps {
  orderedSet: HomeFeaturedGalleriesRail_orderedSet
}

const HomeFeaturedGalleriesRail: React.FC<HomeFeaturedGalleriesRailProps> = ({
  orderedSet,
}) => {
  const { trackEvent } = useTracking()

  const nodes = extractNodes(orderedSet.orderedItemsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      title="Featured Galleries"
      countLabel={nodes.length}
      viewAllLabel="View All Galleries"
      viewAllHref="/galleries"
      viewAllOnClick={() => {
        const trackingEvent: ClickedGalleryGroup = {
          action: ActionType.clickedGalleryGroup,
          context_module: ContextModule.featuredGalleriesRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.galleries,
          type: "viewAll",
        }
        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return nodes.map((node, index) => {
          if (node.__typename !== "Profile") return <></>
          return (
            <PartnerCellFragmentContainer key={index} partner={node.owner} />
          )
        })
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Featured Galleries"
      viewAllLabel="View All Galleries"
      viewAllHref="/galleries"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <PartnerCellPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)

export const HomeFeaturedGalleriesRailFragmentContainer = createFragmentContainer(
  HomeFeaturedGalleriesRail,
  {
    orderedSet: graphql`
      fragment HomeFeaturedGalleriesRail_orderedSet on OrderedSet {
        orderedItemsConnection(first: 20) {
          edges {
            node {
              __typename
              ... on Profile {
                owner {
                  ...PartnerCell_partner
                }
              }
            }
          }
        }
      }
    `,
  }
)

export const HomeFeaturedGalleriesRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedGalleriesRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeFeaturedGalleriesRailQuery {
          orderedSet(id: "6193c9ede70512000fbf3e8d") {
            ...HomeFeaturedGalleriesRail_orderedSet
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.orderedSet) {
          return (
            <HomeFeaturedGalleriesRailFragmentContainer
              orderedSet={props.orderedSet}
            />
          )
        }

        return null
      }}
    />
  )
}
