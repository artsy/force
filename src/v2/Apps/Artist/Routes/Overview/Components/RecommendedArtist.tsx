import { ContextModule, Intent } from "@artsy/cohesion"
import { Box, EntityHeader, Sans } from "@artsy/palette"
import { RecommendedArtist_artist } from "v2/__generated__/RecommendedArtist_artist.graphql"
import { SystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { Carousel } from "v2/Components/Carousel"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import React, { FC, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"

interface RecommendedArtistProps {
  artist: RecommendedArtist_artist
  fullBleedRail?: boolean
}
const HEIGHT = 150

const handleOpenAuth = (mediator, artist) => {
  openAuthToFollowSave(mediator, {
    entity: artist,
    contextModule: ContextModule.relatedArtistsRail,
    intent: Intent.followArtist,
  })
}

@track({
  context_module: Schema.ContextModule.RecommendedArtists,
})
class RecommendedArtistWithTracking extends React.Component<
  RecommendedArtistProps
> {
  @track({
    type: Schema.Type.Thumbnail,
    action_type: Schema.ActionType.Click,
  })
  trackArtworkClicked() {
    // noop
  }

  render() {
    return (
      <RecommendedArtist
        {...this.props}
        onArtworkClicked={this.trackArtworkClicked.bind(this)}
      />
    )
  }
}

const RecommendedArtist: FC<
  RecommendedArtistProps & {
    onArtworkClicked: () => void
  }
> = ({ artist, onArtworkClicked, fullBleedRail }) => {
  const { user, mediator } = useContext(SystemContext)
  const artistData = get(artist, a => a.artworks_connection.edges, [])

  return (
    <Box data-test={ContextModule.relatedArtistsRail}>
      <EntityHeader
        mt={4}
        imageUrl={get(artist, a => a.image.cropped.url, "")}
        name={artist.name}
        meta={artist.formatted_nationality_and_birthday}
        href={artist.href}
        FollowButton={
          <FollowArtistButton
            artist={artist}
            user={user}
            trackingData={{
              modelName: Schema.OwnerType.Artist,
              context_module: Schema.ContextModule.RecommendedArtists,
              entity_id: artist.internalID,
              entity_slug: artist.slug,
            }}
            onOpenAuthModal={() => handleOpenAuth(mediator, artist)}
            render={({ is_followed }) => {
              return (
                <Sans
                  size="2"
                  weight="medium"
                  color="black"
                  data-test="followButton"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {is_followed ? "Following" : "Follow"}
                </Sans>
              )
            }}
          />
        }
      />

      <Carousel mt={3} arrowHeight={HEIGHT}>
        {artistData.map(artwork => {
          return (
            <FillwidthItem
              key={artwork.node.id}
              artwork={artwork.node}
              contextModule={ContextModule.relatedArtistsRail}
              imageHeight={HEIGHT}
              user={user}
              mediator={mediator}
              onClick={onArtworkClicked}
              lazyLoad
            />
          )
        })}
      </Carousel>
    </Box>
  )
}

export const RecommendedArtistFragmentContainer = createFragmentContainer(
  RecommendedArtistWithTracking,
  {
    artist: graphql`
      fragment RecommendedArtist_artist on Artist {
        slug
        internalID
        name
        formatted_nationality_and_birthday: formattedNationalityAndBirthday
        href
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
        artworks_connection: artworksConnection(
          first: 20
          sort: PUBLISHED_AT_DESC
          filter: IS_FOR_SALE
        ) {
          edges {
            node {
              id
              ...FillwidthItem_artwork
            }
          }
        }
        ...FollowArtistButton_artist
      }
    `,
  }
)
