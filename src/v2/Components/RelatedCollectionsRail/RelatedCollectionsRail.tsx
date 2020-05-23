import { Box, Serif, Spacer } from "@artsy/palette"
import { RelatedCollectionsRail_collections } from "v2/__generated__/RelatedCollectionsRail_collections.graphql"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { ArrowButton, Carousel } from "v2/Components/Carousel"
import { once } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import { data as sd } from "sharify"
import styled from "styled-components"
import Events from "v2/Utils/Events"
import { RelatedCollectionEntityFragmentContainer as RelatedCollectionEntity } from "./RelatedCollectionEntity"

interface RelatedCollectionsRailProps {
  collections: RelatedCollectionsRail_collections
  title?: string
  lazyLoadImages?: boolean
}

@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class RelatedCollectionsRail extends React.Component<
RelatedCollectionsRailProps
> {
  @track({
    action_type: Schema.ActionType.Impression,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Collection,
  })
  trackImpression() {
    // noop
  }

  @track({
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Collection,
    type: Schema.Type.Button,
    subject: Schema.Subject.ClickedNextButton,
  })
  trackCarouselNav() {
    // noop
  }

  render() {
    const { collections } = this.props
    const { title, lazyLoadImages } = this.props
    const collectionsWithArtworks = collections.filter(collection =>
      Boolean(collection.artworksConnection)
    )

    if (collectionsWithArtworks.length > 3) {
      return (
        <Box>
          <Waypoint onEnter={once(this.trackImpression.bind(this))} />
          <Serif size="8" color="black100">
            More like {title}
          </Serif>
          <Spacer pb={4} />

          <Carousel
            height="200px"
            options={{
              groupCells: sd.IS_MOBILE ? 1 : 4,
              cellAlign: "left",
              contain: true,
              wrapAround: sd.IS_MOBILE ? true : false,
              pageDots: false,
              draggable: sd.IS_MOBILE ? true : false,
            }}
            onArrowClick={this.trackCarouselNav.bind(this)}
            data={collectionsWithArtworks}
            render={slide => {
              return (
                <RelatedCollectionEntity
                  lazyLoad={lazyLoadImages}
                  collection={slide}
                />
              )
            }}
            renderLeftArrow={({ Arrow }) => {
              return (
                <ArrowContainer>
                  <Arrow />
                </ArrowContainer>
              )
            }}
            renderRightArrow={({ Arrow }) => {
              return (
                <ArrowContainer>
                  {collections.length > 4 && <Arrow />}
                </ArrowContainer>
              )
            }}
          />
        </Box>
      )
    } else {
      return null
    }
  }
}

const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 60%;
  }
`

export const RelatedCollectionsRailFragmentContainer = createFragmentContainer(
  RelatedCollectionsRail,
  {
    collections: graphql`
      fragment RelatedCollectionsRail_collections on MarketingCollection
        @relay(plural: true) {
        ...RelatedCollectionEntity_collection
        # We need this so we can filter out collections w/o artworks that would
        # otherwise break the carousel.
        artworksConnection(
          first: 3
          aggregations: [TOTAL]
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  }
)
