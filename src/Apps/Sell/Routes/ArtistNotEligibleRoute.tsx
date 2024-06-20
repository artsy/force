import { Button, Flex, FullBleed, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ArtistNotEligiblText } from "Apps/Sell/Components/ArtistNotEligibleText"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { RouterLink } from "System/Components/RouterLink"
import { ArtistNotEligibleRoute_artist$key } from "__generated__/ArtistNotEligibleRoute_artist.graphql"
import * as React from "react"
import { graphql, useFragment } from "react-relay"

const FRAGMENT = graphql`
  fragment ArtistNotEligibleRoute_artist on Artist {
    ...EntityHeaderArtist_artist
  }
`
interface ArtistNotEligibleRouteProps {
  artist: ArtistNotEligibleRoute_artist$key
}

export const ArtistNotEligibleRoute: React.FC<ArtistNotEligibleRouteProps> = props => {
  const artist = useFragment(FRAGMENT, props.artist)

  return (
    <FullBleed>
      <AppContainer>
        <SubmissionLayout hideNavigation>
          <Text variant="xl" mb={2}>
            This artist isn’t currently eligible to sell on our platform
          </Text>

          {!!artist && (
            <EntityHeaderArtistFragmentContainer
              artist={artist}
              displayFollowButton={false}
            />
          )}

          <ArtistNotEligiblText />

          <Spacer y={4} />

          <Flex flexDirection="column" justifyContent="space-between" pb={2}>
            <Button
              // @ts-ignore
              as={RouterLink}
              to="/collector-profile/my-collection/artworks/new"
            >
              Add to My Collection
            </Button>

            <Spacer y={2} />

            <Button
              // @ts-ignore
              as={RouterLink}
              to="/sell2/submissions/new"
              variant="secondaryBlack"
            >
              Add Another Artist
            </Button>
          </Flex>
        </SubmissionLayout>
      </AppContainer>
    </FullBleed>
  )
}
