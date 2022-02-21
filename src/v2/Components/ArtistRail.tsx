import { FC, Fragment } from "react"
import {
  Box,
  EntityHeader,
  Flex,
  Shelf,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistRailQuery } from "v2/__generated__/ArtistRailQuery.graphql"
import { ArtistRail_artist$data } from "v2/__generated__/ArtistRail_artist.graphql"
import { ShelfArtworkFragmentContainer } from "./Artwork/ShelfArtwork"
import { FollowArtistButtonFragmentContainer } from "./FollowButton/FollowArtistButton"

interface ArtistRailProps {
  artist: ArtistRail_artist$data
}

const ArtistRail: FC<ArtistRailProps> = ({ artist }) => {
  if (!artist || !artist.name) return null

  const artworks = extractNodes(artist.artworksConnection)

  return (
    <>
      <EntityHeader
        name={artist.name}
        initials={artist.initials!}
        href={artist.href!}
        meta={artist.formattedNationalityAndBirthday!}
        image={{
          src: artist.avatar?.cropped?.src,
          srcSet: artist.avatar?.cropped?.srcSet,
        }}
        FollowButton={
          <FollowArtistButtonFragmentContainer
            contextModule={{} as any} // TODO:
            artist={artist}
            buttonProps={{ size: "small", variant: "secondaryOutline" }}
          >
            Follow
          </FollowArtistButtonFragmentContainer>
        }
        mb={2}
      />

      {artworks.length > 0 ? (
        <Shelf>
          {artworks.map(artwork => {
            return (
              <ShelfArtworkFragmentContainer
                key={artwork.internalID}
                contextModule={{} as any} // TODO:
                artwork={artwork}
                lazyLoad
              />
            )
          })}
        </Shelf>
      ) : (
        <Text variant="lg" color="black60" textAlign="center">
          No works available by the artist at this time.
        </Text>
      )}
    </>
  )
}

export const ARTIST_RAIL_PLACEHOLDER = (
  <Skeleton>
    <Flex alignItems="center" mb={2}>
      <SkeletonBox width={45} height={45} borderRadius="50%" mr={1} />

      <Box>
        <SkeletonText variant="md">Artist Name</SkeletonText>
        <SkeletonText variant="xs">Country, b. 0000</SkeletonText>
      </Box>
    </Flex>

    <Shelf>
      {[...new Array(10)].map((_, i) => {
        return (
          <Fragment key={i}>
            <SkeletonBox
              width={200}
              height={[
                [100, 150, 200, 250][i % 4],
                [100, 320, 200, 250][i % 4],
              ]}
              mb={1}
            />

            <SkeletonText variant="md">Artist Name</SkeletonText>
            <SkeletonText variant="md">Artwork Title</SkeletonText>
            <SkeletonText variant="xs">Partner</SkeletonText>
            <SkeletonText variant="xs">US$0,000</SkeletonText>
          </Fragment>
        )
      })}
    </Shelf>
  </Skeleton>
)

export const ArtistRailFragmentContainer = createFragmentContainer(ArtistRail, {
  artist: graphql`
    fragment ArtistRail_artist on Artist {
      name
      href
      initials
      formattedNationalityAndBirthday
      avatar: image {
        cropped(width: 45, height: 45) {
          src
          srcSet
        }
      }
      ...FollowArtistButton_artist
      artworksConnection(first: 10) {
        edges {
          node {
            internalID
            ...ShelfArtwork_artwork
          }
        }
      }
    }
  `,
})

interface ArtistRailQueryRendererProps {
  id: string
}

export const ArtistRailQueryRenderer: FC<ArtistRailQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<ArtistRailQuery>
      placeholder={ARTIST_RAIL_PLACEHOLDER}
      variables={{ id }}
      query={graphql`
        query ArtistRailQuery($id: String!) {
          artist(id: $id) {
            ...ArtistRail_artist
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.artist) {
          return ARTIST_RAIL_PLACEHOLDER
        }

        return <ArtistRailFragmentContainer artist={props.artist} />
      }}
    />
  )
}
