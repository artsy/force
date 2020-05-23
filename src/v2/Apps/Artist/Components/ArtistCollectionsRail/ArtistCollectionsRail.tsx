import { Box, Sans, Separator } from "@artsy/palette"
import { ArtistCollectionsRail_collections } from "v2/__generated__/ArtistCollectionsRail_collections.graphql"
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
import { ArtistCollectionEntityFragmentContainer as ArtistCollectionEntity } from "./ArtistCollectionEntity"

interface ArtistCollectionsRailProps {
  collections: ArtistCollectionsRail_collections
  includeTopSpacer?: boolean
}

@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class ArtistCollectionsRail extends React.Component<
ArtistCollectionsRailProps
> {
  @track({
    action_type: Schema.ActionType.Impression,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Artist,
  })
  trackImpression() {
    // noop
  }

  @track({
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Artist,
    type: Schema.Type.Button,
    subject: Schema.Subject.ClickedNextButton,
  })
  trackCarouselNav() {
    // noop
  }

  static defaultProps = {
    includeTopSpacer: true,
  }

  render() {
    const { collections, includeTopSpacer } = this.props
    if (collections.length > 3) {
      return (
        <Box>
          <Waypoint onEnter={once(this.trackImpression.bind(this))} />

          {includeTopSpacer && <Separator my={3} />}

          <Sans size="5" color="black100" mb={2}>
            Iconic Collections
          </Sans>

          <Carousel
            height="200px"
            options={{
              groupCells: sd.IS_MOBILE ? 1 : 4,
              wrapAround: sd.IS_MOBILE ? true : false,
              cellAlign: "left",
              pageDots: false,
              contain: true,
            }}
            onArrowClick={this.trackCarouselNav.bind(this)}
            data={collections}
            render={(slide, index: number) => {
              return (
                <ArtistCollectionEntity
                  lazyLoad={index > 5}
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

export const ArtistCollectionsRailFragmentContainer = createFragmentContainer(
  ArtistCollectionsRail,
  {
    collections: graphql`
      fragment ArtistCollectionsRail_collections on MarketingCollection
        @relay(plural: true) {
        ...ArtistCollectionEntity_collection
      }
    `,
  }
)
