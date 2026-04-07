import { ContextModule } from "@artsy/cohesion"
import { Box, Text } from "@artsy/palette"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { ProgressiveOnboardingFollowArtist } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { formatFollowerCount } from "Utils/formatFollowerCount"
import type { ArtistTombstone_artist$key } from "__generated__/ArtistTombstone_artist.graphql"
import { useMemo } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistTombstoneProps {
  artist: ArtistTombstone_artist$key
}

export const ArtistTombstone: React.FC<ArtistTombstoneProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  const followButton = useMemo(
    () => (
      <FollowArtistButtonQueryRenderer
        id={artist.internalID}
        contextModule={ContextModule.artistHeader}
        size={["small", "small", "large"]}
      />
    ),
    [artist.internalID],
  )

  return (
    <Box
      display="flex"
      flexDirection={["column", "row"]}
      alignItems={["flex-start", "center"]}
      gap={2}
    >
      <Box flex={1}>
        <Text as="h1" variant="xl">
          {artist.name}
        </Text>

        <Text as="h2" variant={["md", "xl"]} color="mono60">
          {artist.formattedNationalityAndBirthday}
        </Text>
      </Box>

      <Box
        display="flex"
        flexDirection={["row", "column"]}
        alignItems="center"
        width="fit-content"
        gap={[1, 0.5]}
      >
        <ProgressiveOnboardingFollowArtist>
          {followButton}
        </ProgressiveOnboardingFollowArtist>

        {!!artist.counts?.follows && (
          <Text variant="xs" color="mono60" textAlign="center" flexShrink={0}>
            {formatFollowerCount(artist.counts.follows)} Follower
            {artist.counts.follows === 1 ? "" : "s"}
          </Text>
        )}
      </Box>
    </Box>
  )
}

const fragment = graphql`
  fragment ArtistTombstone_artist on Artist {
    internalID
    name
    formattedNationalityAndBirthday
    counts {
      follows
    }
  }
`
