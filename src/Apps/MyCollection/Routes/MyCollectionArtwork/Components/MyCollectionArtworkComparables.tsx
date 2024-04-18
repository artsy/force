import { Column, Join, Spacer, Text } from "@artsy/palette"
import { ArtistAuctionResultItemFragmentContainer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultItem"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArtworkComparables_artwork$data } from "__generated__/MyCollectionArtworkComparables_artwork.graphql"

interface MyCollectionArtworkComparablesProps {
  artwork: MyCollectionArtworkComparables_artwork$data
}

const MyCollectionArtworkComparables: React.FC<MyCollectionArtworkComparablesProps> = ({
  artwork,
}) => {
  if (!artwork.auctionResult) {
    return null
  }
  const results = extractNodes(artwork.auctionResult)

  if (!results.length) {
    return null
  }

  const titleString = `${artwork.artist?.name} - Comparable Works on Artsy`

  return (
    <>
      <MetaTags title={titleString} />

      <Spacer y={2} />

      <Text variant={["sm-display", "md"]} textAlign="left">
        Comparable Works
      </Text>

      <Spacer y={2} />

      <Column span={9}>
        <Spacer y={[2, 0]} />
        <Join separator={<Spacer y={2} />}>
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
