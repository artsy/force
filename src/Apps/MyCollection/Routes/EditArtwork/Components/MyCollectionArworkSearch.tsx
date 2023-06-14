import { Box, Button, Clickable, Spacer, Text } from "@artsy/palette"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Masonry } from "Components/Masonry"
import { Fragment } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArworkSearchQuery } from "__generated__/MyCollectionArworkSearchQuery.graphql"

interface MyCollectionArworkSearchProps {
  artistId: string
  onClick: (artwork: any) => void
  onSkip: () => void
  query?: string | null
}

export const MyCollectionArworkSearch: React.FC<MyCollectionArworkSearchProps> = ({
  artistId,
  onClick,
  onSkip,
  query,
}) => {
  const input = query ? { keyword: query } : null

  const data = useLazyLoadQuery<MyCollectionArworkSearchQuery>(
    graphql`
      query MyCollectionArworkSearchQuery(
        $artistID: String!
        $input: FilterArtworksInput
      ) {
        artist(id: $artistID) {
          filterArtworksConnection(first: 40, input: $input) {
            edges {
              node {
                medium
                date
                depth
                editionSize
                editionNumber
                height
                images {
                  height
                  internalID
                  isDefault
                  url: url(
                    version: [
                      "main"
                      "normalized"
                      "larger"
                      "large"
                      "medium"
                      "small"
                    ]
                  )
                  width
                }
                id
                internalID
                isEdition
                category
                metric
                title
                width
                ...GridItem_artwork
              }
            }
          }
        }
      }
    `,
    { artistID: artistId, input }
  )

  const artworks = extractNodes(data.artist?.filterArtworksConnection)

  if (artworks.length === 0) {
    return <NoResults onSkip={onSkip} query={query} />
  }

  return (
    <Box mb={4}>
      <Text variant={["xs", "sm-display"]}>
        Or skip ahead to{" "}
        <Clickable onClick={onSkip} textDecoration="underline">
          <Text variant={["xs", "sm-display"]}>add artwork details</Text>
        </Clickable>
        .
      </Text>

      <Spacer y={4} />

      <Masonry columnCount={[2, 3, 4]} style={{ opacity: 1 }}>
        {artworks.map(artwork => {
          return (
            <Fragment key={artwork.internalID}>
              <ArtworkGridItemFragmentContainer
                artwork={artwork}
                hideSaleInfo
                showSaveButton={false}
                showHoverDetails={false}
                onClick={() => onClick(artwork)}
                to={null}
                data-testid={`artwork-${artwork.internalID}`}
              />

              <Spacer y={4} />
            </Fragment>
          )
        })}
      </Masonry>
    </Box>
  )
}

const NoResults: React.FC<{
  onSkip: () => void
  query?: string | null
}> = ({ onSkip, query }) => {
  return (
    <Box my={4}>
      <Text variant={["xs", "sm-display"]} flexWrap="wrap">
        We couldn’t find a work named “
        <Text
          variant={["xs", "sm-display"]}
          display="inline-block"
          color="blue100"
        >
          {query}
        </Text>
        “
      </Text>

      <Spacer y={4} />

      <Button width={300} variant="secondaryNeutral" onClick={onSkip}>
        Go to Add Artwork Details
      </Button>
    </Box>
  )
}
