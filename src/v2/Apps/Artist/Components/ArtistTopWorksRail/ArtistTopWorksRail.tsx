import { Flex, Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistTopWorksRail_artist } from "v2/__generated__/ArtistTopWorksRail_artist.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { Media } from "v2/Utils/Responsive"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { useTracking } from "v2/Artsy"
import styled from "styled-components"
import { ContextModule, OwnerType, clickedEntityGroup } from "@artsy/cohesion"

const HEIGHT = 300

interface ArtistTopWorksRailProps {
  artist: ArtistTopWorksRail_artist
  onOverviewTab?: boolean
}

export const ArtistTopWorksRail: React.FC<ArtistTopWorksRailProps> = ({
  artist,
  onOverviewTab,
}) => {
  const tracking = useTracking()
  const artworks = artist?.filterArtworksConnection?.edges ?? []
  const handleViewWorksClick = overviewTab => {
    const ms = overviewTab ? 500 : 0

    tracking.trackEvent(
      clickedEntityGroup({
        contextModule: ContextModule.topWorksRail,
        contextPageOwnerType: OwnerType.artist,
        destinationPageOwnerType: OwnerType.artist,
        destinationPageOwnerId: artist.slug,
        destinationPageOwnerSlug: artist.slug,
        type: "viewAll",
        contextPageOwnerSlug: artist.slug,
        contextPageOwnerId: artist.id,
      })
    )

    return setTimeout(
      () => scrollIntoView({ offset: 60, selector: "#jump--artworkFilter" }),
      ms
    )
  }

  return artworks.length > 0 ? (
    <Flex flexDirection="column">
      <Flex my={1} justifyContent="space-between">
        {/**
         * The H2 tag was added for SEO purposes
         * TODO: Remove when palette provides the ability to override typography element
         */}
        <H2>
          <Sans size="4" color="black100">
            Notable Works
          </Sans>
        </H2>
        <StyledLink
          data-test="link-to-works-for-sale"
          onClick={() => handleViewWorksClick(onOverviewTab)}
          to={onOverviewTab ? `/artist/${artist.slug}/works-for-sale` : null} // no need to route if already on Works tab
        >
          <Media at="xs">
            <Sans size="4" color="black60">
              View all
            </Sans>
          </Media>
          <Media greaterThan="xs">
            <Sans size="4" color="black60">
              View all works
            </Sans>
          </Media>
        </StyledLink>
      </Flex>
      <Carousel mb={3} arrowHeight={HEIGHT}>
        {artworks.map(({ node }, index) => {
          const { id, slug } = node

          return (
            <FillwidthItem
              key={id}
              contextModule={ContextModule.topWorksRail}
              artwork={node}
              hidePartnerName
              hideArtistName
              imageHeight={HEIGHT}
              showMetadata
              showExtended={false}
              onClick={() => {
                tracking.trackEvent(
                  clickedEntityGroup({
                    contextModule: ContextModule.topWorksRail,
                    contextPageOwnerType: OwnerType.artist,
                    destinationPageOwnerType: OwnerType.artwork,
                    destinationPageOwnerId: id,
                    destinationPageOwnerSlug: slug,
                    horizontalSlidePosition: index + 1,
                    type: "thumbnail",
                    contextPageOwnerSlug: artist.slug,
                    contextPageOwnerId: artist.id,
                  })
                )
              }}
            />
          )
        })}
      </Carousel>
    </Flex>
  ) : null
}

const H2 = styled.h2``

export const ArtistTopWorksRailFragmentContainer = createFragmentContainer(
  ArtistTopWorksRail,
  {
    artist: graphql`
      fragment ArtistTopWorksRail_artist on Artist {
        slug
        id
        filterArtworksConnection(sort: "-weighted_iconicity", first: 10) {
          edges {
            node {
              id
              slug
              ...FillwidthItem_artwork
            }
          }
        }
      }
    `,
  }
)
