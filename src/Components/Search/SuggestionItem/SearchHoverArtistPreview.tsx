import { Box, Text } from "@artsy/palette"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { RouterLink } from "System/Components/RouterLink"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import type { SearchHoverArtistPreviewQuery } from "__generated__/SearchHoverArtistPreviewQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"
import type { SuggestionItemOptionProps } from "./SuggestionItem"

interface SearchHoverArtistPreviewProps {
  option: SuggestionItemOptionProps
}

export const SearchHoverArtistPreview: FC<SearchHoverArtistPreviewProps> = ({
  option,
}) => {
  if (!option.item_id) {
    return (
      <div style={{ fontSize: "12px", color: "#999" }}>
        Unable to load artist details
      </div>
    )
  }

  return (
    <SystemQueryRenderer<SearchHoverArtistPreviewQuery>
      lazyLoad
      query={graphql`
        query SearchHoverArtistPreviewQuery($artistID: String!) {
          artist(id: $artistID) {
            name
            href
            nationality
            birthday
            deathday
            artworksConnection(first: 6, sort: PUBLISHED_AT_DESC) {
              edges {
                node {
                  ...ShelfArtwork_artwork
                  internalID
                }
              }
            }
          }
        }
      `}
      variables={{ artistID: option.item_id }}
      render={({ error, props }) => {
        if (error || !props?.artist) {
          return (
            <div style={{ fontSize: "12px", color: "#999" }}>
              Unable to load artist details
            </div>
          )
        }

        const { artist } = props
        const artworks = extractNodes(artist.artworksConnection)

        return (
          <div>
            {/* Artist Title - Clickable */}
            <RouterLink
              to={artist.href || option.href}
              style={{ textDecoration: "none" }}
            >
              <Text
                variant="sm"
                color="black100"
                mb={1}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.textDecoration = "underline"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.textDecoration = "none"
                }}
              >
                {artist.name}
              </Text>
            </RouterLink>

            {/* Artist Info - Non-clickable */}
            {artist.nationality && (
              <Text variant="xs" color="mono60" mb={2}>
                {artist.nationality}
                {artist.birthday && `, b. ${artist.birthday}`}
                {artist.deathday && ` - d. ${artist.deathday}`}
              </Text>
            )}

            {/* Recent Artworks Section */}
            <Text variant="xs" color="mono60" mb={1}>
              Recent Artworks ({artworks.length})
            </Text>

            {artworks.length > 0 ? (
              <Box
                overflowX="auto"
                overflowY="hidden"
                width="100%"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#ccc transparent",
                }}
                onWheel={e => {
                  // Allow horizontal scrolling with mouse wheel
                  if (e.deltaY !== 0) {
                    e.currentTarget.scrollLeft += e.deltaY
                    e.preventDefault()
                  }
                }}
              >
                <Box display="flex" gap={4} pb={2} px={2}>
                  {artworks.map(artwork => (
                    <Box key={artwork.internalID} width={100} flexShrink={0}>
                      <ShelfArtworkFragmentContainer
                        artwork={artwork}
                        lazyLoad
                        area={10000} // 100x100 area for preview thumbnails
                        maxImageHeight={100}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Text variant="xs" color="mono60">
                No recent artworks available
              </Text>
            )}
          </div>
        )
      }}
    />
  )
}
