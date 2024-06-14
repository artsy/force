import { Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HomeFeaturedGalleriesRail_orderedSet$data } from "__generated__/HomeFeaturedGalleriesRail_orderedSet.graphql"
import { HomeFeaturedGalleriesRailQuery } from "__generated__/HomeFeaturedGalleriesRailQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import {
  ActionType,
  ClickedGalleryGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Rail } from "Components/Rail/Rail"
import {
  CellPartnerFragmentContainer,
  CellPartnerPlaceholder,
} from "Components/Cells/CellPartner"

interface HomeFeaturedGalleriesRailProps {
  orderedSet: HomeFeaturedGalleriesRail_orderedSet$data
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
            <CellPartnerFragmentContainer
              key={index}
              partner={node.owner}
              onClick={() => {
                const trackingEvent: ClickedGalleryGroup = {
                  action: ActionType.clickedGalleryGroup,
                  context_module: ContextModule.featuredGalleriesRail,
                  context_page_owner_type: OwnerType.home,
                  destination_page_owner_id: node.owner.internalID,
                  destination_page_owner_slug: node.owner.slug,
                  destination_page_owner_type: OwnerType.galleries,
                  type: "thumbnail",
                }

                trackEvent(trackingEvent)
              }}
            />
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
          return <CellPartnerPlaceholder key={i} />
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
                  ...CellPartner_partner
                  ... on Partner {
                    internalID
                    slug
                  }
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
