import { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { CollectorProfileArtistsListArtist_userInterestEdge$key } from "__generated__/CollectorProfileArtistsListArtist_userInterestEdge.graphql"
import { Box, Button, Checkbox, SkeletonText, Text } from "@artsy/palette"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import styled from "styled-components"

interface CollectorProfileArtistsListArtistProps {
  userInterestEdge: CollectorProfileArtistsListArtist_userInterestEdge$key
}

export const CollectorProfileArtistsListArtist: FC<CollectorProfileArtistsListArtistProps> = ({
  userInterestEdge,
}) => {
  const { private: isPrivate, node: artist } = useFragment(
    COLLECTOR_PROFILE_ARTISTS_LIST_ARTIST_FRAGMENT,
    userInterestEdge
  )

  if (!artist || artist.__typename !== "Artist") {
    return null
  }

  const count = artist.counts?.artworks || 0

  return (
    <CollectorProfileArtistsListArtistRow>
      <EntityHeaderArtistFragmentContainer
        artist={artist}
        displayFollowButton={false}
        flex={1}
      />

      <Text variant="sm-display" flex={1} overflowEllipsis>
        {count} artwork{count === 1 ? "" : "s"}
      </Text>

      <Checkbox selected={!isPrivate} flex={1}>
        Share with galleries
      </Checkbox>

      <Box flex={1} display="flex" justifyContent="flex-end">
        <FollowArtistButtonQueryRenderer id={artist.internalID} size="small" />
      </Box>
    </CollectorProfileArtistsListArtistRow>
  )
}

export const CollectorProfileArtistsListArtistSkeleton: FC = () => {
  return (
    <CollectorProfileArtistsListArtistRow>
      <EntityHeaderPlaceholder flex={1} />

      <SkeletonText variant="sm-display" flex={1} overflowEllipsis>
        00 artworks
      </SkeletonText>

      <Checkbox disabled flex={1}>
        Share with galleries
      </Checkbox>

      <Box flex={1} display="flex" justifyContent="flex-end">
        <Button variant="secondaryNeutral" size="small" disabled>
          Follow
        </Button>
      </Box>
    </CollectorProfileArtistsListArtistRow>
  )
}

const CollectorProfileArtistsListArtistRow = styled(Box).attrs({
  display: "flex",
  gap: 2,
  flexDirection: "row",
  alignItems: "center",
  borderBottom: "1px solid",
  borderColor: "black10",
  py: 4,
})``

const COLLECTOR_PROFILE_ARTISTS_LIST_ARTIST_FRAGMENT = graphql`
  fragment CollectorProfileArtistsListArtist_userInterestEdge on UserInterestEdge {
    private
    node {
      __typename
      ... on Artist {
        ...EntityHeaderArtist_artist
        internalID
        name
        counts {
          artworks
        }
      }
    }
  }
`
