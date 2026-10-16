import { Shelf, Text } from "@artsy/palette"
import { ArtAssistantRailPlaceholder } from "Apps/ArtAssistant/Components/ArtAssistantRailPlaceholder"
import { CellArtistFragmentContainer } from "Components/Cells/CellArtist"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { extractNodes } from "Utils/extractNodes"
import type { ArtAssistantArtistRailQuery } from "__generated__/ArtAssistantArtistRailQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"

export const ArtAssistantArtistRail: FC<{ ids: string[] }> = ({ ids }) => {
  const { data, error } = useClientQuery<ArtAssistantArtistRailQuery>({
    query: graphql`
      query ArtAssistantArtistRailQuery($ids: [String], $first: Int!) {
        artistsConnection(ids: $ids, first: $first) {
          edges {
            node {
              internalID
              ...CellArtist_artist
            }
          }
        }
      }
    `,
    variables: { ids, first: ids.length },
  })
  if (error)
    return (
      <Text variant="xs" color="mono60">
        Artist suggestions are unavailable.
      </Text>
    )
  if (!data) return <ArtAssistantRailPlaceholder type="artists" />
  const nodes = extractNodes(data.artistsConnection)
  const artists = ids.flatMap(id =>
    nodes.filter(artist => artist.internalID === id),
  )
  if (!artists.length)
    return (
      <Text variant="xs" color="mono60">
        No matching artists found.
      </Text>
    )

  return (
    <Shelf alignItems="flex-start">
      {artists.map(artist => {
        return (
          <CellArtistFragmentContainer
            key={artist.internalID}
            artist={artist}
          />
        )
      })}
    </Shelf>
  )
}
