import { Shelf, Text, useToasts } from "@artsy/palette"
import { ArtAssistantRailPlaceholder } from "Apps/ArtAssistant/Components/ArtAssistantRailPlaceholder"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { extractNodes } from "Utils/extractNodes"
import type { ArtAssistantArtworkRailQuery } from "__generated__/ArtAssistantArtworkRailQuery.graphql"
import { useEffect, type FC } from "react"
import { graphql } from "react-relay"

export const ArtAssistantArtworkRail: FC<{ ids: string[] }> = ({ ids }) => {
  const { sendToast } = useToasts()
  const { data, error } = useClientQuery<ArtAssistantArtworkRailQuery>({
    query: graphql`
      query ArtAssistantArtworkRailQuery($ids: [String], $first: Int!) {
        artworksConnection(artworkIDs: $ids, first: $first) {
          edges {
            node {
              internalID
              slug
              ...ShelfArtwork_artwork
            }
          }
        }
      }
    `,
    variables: { ids, first: ids.length },
  })
  useEffect(() => {
    if (!error) return
    console.error("Art Assistant artwork rail failed")
    sendToast({
      variant: "error",
      message: "Artwork suggestions are unavailable.",
    })
  }, [error, sendToast])
  if (error)
    return (
      <Text variant="xs" color="mono60">
        Artwork suggestions are unavailable.
      </Text>
    )
  if (!data) return <ArtAssistantRailPlaceholder type="artworks" />
  const nodes = extractNodes(data.artworksConnection)
  const artworks = ids.flatMap(id =>
    nodes.filter(artwork => artwork.internalID === id),
  )
  if (!artworks.length)
    return (
      <Text variant="xs" color="mono60">
        No matching artworks found.
      </Text>
    )

  return (
    <Shelf>
      {artworks.map(artwork => {
        return (
          <ShelfArtworkFragmentContainer
            key={artwork.internalID}
            artwork={artwork}
          />
        )
      })}
    </Shelf>
  )
}
