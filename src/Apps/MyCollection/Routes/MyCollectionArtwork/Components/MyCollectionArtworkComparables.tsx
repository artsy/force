import { Column, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArtworkComparables_artwork } from "__generated__/MyCollectionArtworkComparables_artwork.graphql"

interface MyCollectionArtworkComparablesProps {
  artwork: MyCollectionArtworkComparables_artwork
}

const MyCollectionArtworkComparables: React.FC<MyCollectionArtworkComparablesProps> = ({
  artwork,
}) => {
  if (!artwork.auctionResult) {
    return null
  }
  const results = extractNodes(artwork.auctionResult)
  const titleString = `${artwork.artist?.name!} - Comparable Works on Artsy`

  return (
    <>
      <MetaTags title={titleString} />

      <Text variant={["sm-display", "lg-display"]} textAlign="left">
        Comparable Works
      </Text>

      <Spacer my={2} />

      <Column span={9}>
        <Spacer mt={[2, 0]} />
        <Join separator={<Spacer mt={2} />}>
          {results.map((result, index) => {
            return (
              <ArtistAuctionResultItemFragmentContainer
                key={index}
                auctionResult={result}
                filtersAtDefault={false}
              />
            )
          })}
        </Join>
      </Column>
      <Spacer pb={6} />
    </>
  )
}

export const MyCollectionArtworkComparablesFragmentContainer = createFragmentContainer(
  MyCollectionArtworkComparables,
  {
    artwork: graphql`
      fragment MyCollectionArtworkComparables_artwork on Artwork {
        auctionResult: comparableAuctionResults(first: 6) @optionalField {
          edges {
            cursor
            node {
              ...ArtistAuctionResultItem_auctionResult
              artistID
              internalID
            }
          }
        }
        artist {
          name
        }
      }
    `,
  }
)
