import { Box, Sans, Separator } from "@artsy/palette"
import { ArtistCollectionsRail_collections } from "v2/__generated__/ArtistCollectionsRail_collections.graphql"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { ArrowButton, Carousel } from "v2/Components/Carousel"
import { once } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import Events from "v2/Utils/Events"
import { ArtistCollectionEntityFragmentContainer as ArtistCollectionEntity } from "./ArtistCollectionEntity"
import { getENV } from "v2/Utils/getENV"

interface ArtistCollectionsRailProps {
  collections: ArtistCollectionsRail_collections
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

  render() {
    const { collections } = this.props
    const isMobile = getENV("IS_MOBILE") === true

    if (collections.length > 3) {
      return (
        <Box>
          <Waypoint onEnter={once(this.trackImpression.bind(this))} />

          <Separator my={3} />
          {/**
           * The H2 tag was added for SEO purposes
           * TODO: Remove when palette provides the ability to override typography element
           */}
          <H2>
            <Sans size="4" color="black100" my={1}>
              Iconic Collections
            </Sans>
          </H2>

          <Box mx={[-20, 0]}>
            <Carousel
              height="200px"
              options={{
                groupCells: isMobile ? 1 : 4,
                cellAlign: "left",
                pageDots: false,
                contain: true,
              }}
              onArrowClick={this.trackCarouselNav.bind(this)}
              data={collections}
              render={(slide, index: number) => {
                return (
                  <Box ml={isMobile && index === 0 ? 2 : 0}>
                    <ArtistCollectionEntity
                      lazyLoad={index > 5}
                      collection={slide}
                    />
                  </Box>
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
        </Box>
      )
    } else {
      return null
    }
  }
}

const H2 = styled.h2``

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
