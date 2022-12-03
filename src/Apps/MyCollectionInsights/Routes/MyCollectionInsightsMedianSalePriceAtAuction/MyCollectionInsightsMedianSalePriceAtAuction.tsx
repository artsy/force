import { Box, Clickable, Flex, ModalDialog, Spacer, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { MyCollectionInsightsMedianSalePriceAtAuction_artist$key } from "__generated__/MyCollectionInsightsMedianSalePriceAtAuction_artist.graphql"
import { Fragment, useState } from "react"
import { MyCollectionInsightsSelectArtistModal } from "./Components/MyCollectionInsightsSelectArtistModal"

interface MyCollectionInsightsMedianSalePriceAtAuctionProps {
  artist: MyCollectionInsightsMedianSalePriceAtAuction_artist$key
}

export const MyCollectionInsightsMedianSalePriceAtAuction: React.FC<MyCollectionInsightsMedianSalePriceAtAuctionProps> = ({
  artist,
}) => {
  const artistData = useFragment(medianSalePriceAtAuctionFragment, artist)
  const [showSelectArtistModal, setShowSelectArtistModal] = useState(false)

  return (
    <Box>
      <Text mt={2} variant={["lg-display", "lg"]}>
        Median Auction Price
      </Text>
      <Text variant={["xs", "sm-display"]} color="black60">
        Track price stability or growth of your artists
      </Text>

      <Spacer y={[2, 4]} />

      <Flex
        flexDirection={"row"}
        justifyContent={["space-between", "flex-start"]}
      >
        <EntityHeaderArtistFragmentContainer
          artist={artistData}
          FollowButton={<Fragment></Fragment>}
          displayLink={false}
        />

        <Spacer x={4} />

        <Clickable
          color="black60"
          textDecoration="underline"
          onClick={() => setShowSelectArtistModal(!showSelectArtistModal)}
        >
          Change Artist
        </Clickable>
      </Flex>

      {showSelectArtistModal && (
        <ModalDialog
          onClose={() => setShowSelectArtistModal(false)}
          width={["100%", 800]}
        >
          <MyCollectionInsightsSelectArtistModal />
        </ModalDialog>
      )}
    </Box>
  )
}

const medianSalePriceAtAuctionFragment = graphql`
  fragment MyCollectionInsightsMedianSalePriceAtAuction_artist on Artist {
    ...EntityHeaderArtist_artist
  }
`
