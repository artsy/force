import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { Shelf, Text } from "@artsy/palette"
import { ArtAssistantRailPlaceholder } from "Apps/ArtAssistant/Components/ArtAssistantRailPlaceholder"
import { CellArtistFragmentContainer } from "Components/Cells/CellArtist"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { extractNodes } from "Utils/extractNodes"
import type { ArtAssistantArtistRailQuery } from "__generated__/ArtAssistantArtistRailQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"

export const ArtAssistantArtistRail: FC<{ ids: string[] }> = ({ ids }) => {
  const { trackEvent } = useTracking()
  const { data, error } = useClientQuery<ArtAssistantArtistRailQuery>({
    query: graphql`
      query ArtAssistantArtistRailQuery($ids: [String], $first: Int!) {
        artistsConnection(ids: $ids, first: $first) {
          edges {
            node {
              internalID
              slug
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
      {artists.map((artist, index) => {
        return (
          <CellArtistFragmentContainer
            key={artist.internalID}
            artist={artist}
            onClick={() =>
              trackEvent({
                action: ActionType.clickedArtistGroup,
                context_module: ContextModule.artAssistantResults,
                context_page_owner_type: OwnerType.artAssistant,
                destination_page_owner_type: OwnerType.artist,
                destination_page_owner_id: artist.internalID,
                destination_page_owner_slug: artist.slug,
                horizontal_slide_position: index,
                type: "thumbnail",
              })
            }
          />
        )
      })}
    </Shelf>
  )
}
