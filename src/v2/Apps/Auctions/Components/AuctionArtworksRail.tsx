import * as React from "react"
import { BoxProps, Skeleton, SkeletonBox, SkeletonText } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionArtworksRail_sale } from "v2/__generated__/AuctionArtworksRail_sale.graphql"
import { tabTypeToContextModuleMap } from "../Utils/tabTypeToContextModuleMap"
import { useTracking } from "react-tracking"
import {
  ActionType,
  AuthContextModule,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext, useSystemContext } from "v2/System"
import { Rail } from "v2/Components/Rail"
import { extractNodes } from "v2/Utils/extractNodes"
import {
  ShelfArtworkFragmentContainer,
  IMG_HEIGHT,
} from "v2/Components/Artwork/ShelfArtwork"
import { trackHelpers } from "v2/Utils/cohesionHelpers"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { AuctionArtworksRailQuery } from "v2/__generated__/AuctionArtworksRailQuery.graphql"

export type TabType =
  | "current"
  | "myBids"
  | "upcoming"
  | "past"
  | "worksByArtistsYouFollow"

interface AuctionArtworksRailProps extends BoxProps {
  sale: AuctionArtworksRail_sale
  tabType: TabType
}

export const AuctionArtworksRail: React.FC<AuctionArtworksRailProps> = ({
  sale,
  tabType,
  ...rest
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap[tabType] as AuthContextModule
  const nodes = extractNodes(sale.artworksConnection)

  return (
    <Rail
      title={sale.name!}
      subTitle={sale.formattedStartDateTime!}
      viewAllLabel="View All"
      viewAllHref={sale.href!}
      viewAllOnClick={() => {
        trackEvent(
          tracks.clickedArtworkGroupHeader(
            contextModule,
            contextPageOwnerType!,
            sale.internalID,
            sale.slug
          )
        )
      }}
      getItems={() => {
        return nodes.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              contextModule={contextModule}
              lazyLoad
              onClick={() => {
                trackEvent(
                  trackHelpers.clickedArtworkGroup(
                    contextModule,
                    contextPageOwnerType!,
                    node.internalID,
                    node.slug,
                    index
                  )
                )
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
      isLoading
      title="Some title"
      subTitle="Some subtitle"
      getItems={() => {
        return [...new Array(10)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonBox
                width={200}
                height={[IMG_HEIGHT.mobile, IMG_HEIGHT.desktop]}
                mb={1}
              />
              <SkeletonText variant="mediumText">Artist Name</SkeletonText>
              <SkeletonText variant="text">Artwork Title</SkeletonText>
              <SkeletonText variant="text">Price</SkeletonText>
            </React.Fragment>
          )
        })
      }}
    />
  </Skeleton>
)

export const AuctionArtworksRailFragmentContainer = createFragmentContainer(
  AuctionArtworksRail,
  {
    sale: graphql`
      fragment AuctionArtworksRail_sale on Sale {
        artworksConnection(first: 20) {
          edges {
            node {
              internalID
              slug
              ...ShelfArtwork_artwork @arguments(width: 200)
            }
          }
        }
        internalID
        slug
        href
        name
        formattedStartDateTime
      }
    `,
  }
)

export const AuctionArtworkRailQueryRenderer = ({ slug, tabType }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<AuctionArtworksRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query AuctionArtworksRailQuery($slug: String!) {
          sale(id: $slug) {
            ...AuctionArtworksRail_sale
          }
        }
      `}
      variables={{
        slug,
      }}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.sale) {
          return (
            <AuctionArtworksRailFragmentContainer
              tabType={tabType}
              sale={props.sale}
            />
          )
        }

        return null
      }}
    />
  )
}

const tracks = {
  clickedArtworkGroupHeader: (
    contextModule: ContextModule,
    contextPageOwnerType: PageOwnerType,
    saleID: string,
    saleSlug: string
  ): ClickedArtworkGroup => ({
    action: ActionType.clickedArtworkGroup,
    context_module: contextModule,
    context_page_owner_type: contextPageOwnerType,
    destination_page_owner_id: saleID,
    destination_page_owner_slug: saleSlug,
    destination_page_owner_type: OwnerType.sale,
    type: "viewAll",
  }),
}
