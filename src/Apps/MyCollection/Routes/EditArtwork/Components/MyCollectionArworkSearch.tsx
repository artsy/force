import { Spacer } from "@artsy/palette"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Masonry } from "Components/Masonry"
import { Fragment } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { MyCollectionArworkSearchQuery } from "__generated__/MyCollectionArworkSearchQuery.graphql"

interface MyCollectionArworkSearchProps {
  artistId: string
  onClick: (artwork: any) => void
  query?: string | null
}

export const MyCollectionArworkSearch: React.FC<MyCollectionArworkSearchProps> = ({
  artistId,
  onClick,
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
          filterArtworksConnection(first: 30, input: $input) {
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
                  isDefault
                  imageURL
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

  return (
    <Masonry columnCount={[2, 3, 4]} style={{ opacity: 1 }}>
      {artworks.map(artwork => {
        return (
          <Fragment key={artwork.internalID}>
            <ArtworkGridItemFragmentContainer
              artwork={artwork}
              hideSaleInfo
              showSaveButton={false}
              showHoverDetails={false}
              disableRouterLinking
              onClick={() => onClick(artwork)}
            />

            <Spacer y={4} />
          </Fragment>
        )
      })}
    </Masonry>
  )
}
