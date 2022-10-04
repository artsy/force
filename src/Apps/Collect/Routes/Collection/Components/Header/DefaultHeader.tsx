import { Shelf } from "@artsy/palette"
import { DefaultHeader_headerArtworks$data } from "__generated__/DefaultHeader_headerArtworks.graphql"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DefaultHeaderArtworkFragmentContainer as DefaultHeaderArtwork } from "./DefaultHeaderArtwork"
import { extractNodes } from "Utils/extractNodes"

export interface CollectionDefaultHeaderProps {
  headerArtworks: DefaultHeader_headerArtworks$data
  collectionId: string
  collectionSlug: string
}

export const CollectionDefaultHeader: FC<CollectionDefaultHeaderProps> = ({
  headerArtworks,
  collectionId,
  collectionSlug,
}) => {
  if ((headerArtworks.edges?.length ?? 0) === 0) return null

  const artworks = extractNodes(headerArtworks)

  return (
    <Shelf>
      {artworks.map((artwork, i) => (
        <DefaultHeaderArtwork
          key={i}
          artwork={artwork}
          collectionId={collectionId}
          collectionSlug={collectionSlug}
        />
      ))}
    </Shelf>
  )
}

export const CollectionDefaultHeaderFragmentContainer = createFragmentContainer(
  CollectionDefaultHeader,
  {
    headerArtworks: graphql`
      fragment DefaultHeader_headerArtworks on FilterArtworksConnection {
        edges {
          node {
            ...DefaultHeaderArtwork_artwork
          }
        }
      }
    `,
  }
)
