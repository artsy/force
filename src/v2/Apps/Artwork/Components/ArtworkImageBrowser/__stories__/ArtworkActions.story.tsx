import { Flex } from "@artsy/palette"
import { FullArtworkFixture } from "v2/Apps/__tests__/Fixtures/Artwork/FullArtwork.fixture"
import { MockRelayRenderer } from "v2/DevTools"
import { cloneDeep } from "lodash"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { ArtworkActionsFragmentContainer } from "../ArtworkActions"

const ArtworkActionsAuctionFixture = { artwork: cloneDeep(FullArtworkFixture) }
ArtworkActionsAuctionFixture.artwork.sale = {
  is_closed: false,
  is_auction: true,
}

const ArtworkActionsNonAdminFixture = {
  artwork: cloneDeep(FullArtworkFixture),
  user: { type: null },
}
ArtworkActionsNonAdminFixture.user.type = "User"

const MockArtworkActions = ({ artwork }) => {
  return (
    <MockRelayRenderer
      Component={ArtworkActionsFragmentContainer}
      mockData={{ artwork }}
      query={graphql`
        query ArtworkActionsStoryQuery {
          artwork(id: "unused") {
            ...ArtworkActions_artwork
          }
        }
      `}
    />
  )
}

storiesOf("Apps/Artwork/Components/ArtworkImageBrowser", module).add(
  "ArtworkActions",
  () => (
    <>
      <Section title="Default Share">
        <Flex justifyContent="center" alignItems="flex-end" height="200px">
          <MockArtworkActions artwork={FullArtworkFixture} />
        </Flex>
      </Section>
      <Section title="Auction Share">
        <Flex justifyContent="center" alignItems="flex-end" height="200px">
          <MockArtworkActions {...(ArtworkActionsAuctionFixture as any)} />
        </Flex>
      </Section>
      <Section title="Non-admin">
        <Flex justifyContent="center" alignItems="flex-end" height="200px">
          <MockArtworkActions {...(ArtworkActionsNonAdminFixture as any)} />
        </Flex>
      </Section>
    </>
  )
)
