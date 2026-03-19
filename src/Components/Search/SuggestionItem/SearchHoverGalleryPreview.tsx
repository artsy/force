import { Box, Text } from "@artsy/palette"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { RouterLink } from "System/Components/RouterLink"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import type { SearchHoverGalleryPreviewQuery } from "__generated__/SearchHoverGalleryPreviewQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"
import type { SuggestionItemOptionProps } from "./SuggestionItem"

interface SearchHoverGalleryPreviewProps {
  option: SuggestionItemOptionProps
}

export const SearchHoverGalleryPreview: FC<SearchHoverGalleryPreviewProps> = ({
  option,
}) => {
  if (!option.item_id) {
    return (
      <div style={{ fontSize: "12px", color: "#999" }}>
        Unable to load gallery details
      </div>
    )
  }

  return (
    <SystemQueryRenderer<SearchHoverGalleryPreviewQuery>
      lazyLoad
      query={graphql`
        query SearchHoverGalleryPreviewQuery($partnerID: String!) {
          partner(id: $partnerID) {
            name
            href
            type
            cities
            profile {
              bio
            }
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
      variables={{ partnerID: option.item_id }}
      render={({ error, props }) => {
        if (error || !props?.partner) {
          return (
            <div style={{ fontSize: "12px", color: "#999" }}>
              Unable to load gallery details
            </div>
          )
        }

        const { partner } = props
        const artworks = extractNodes(partner.artworksConnection)

        return (
          <div>
            {/* Gallery Title - Clickable */}
            <RouterLink
              to={partner.href || option.href}
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
                {partner.name}
              </Text>
            </RouterLink>

            {/* Gallery Info - Non-clickable */}
            <Text variant="xs" color="mono60" mb={1}>
              {partner.type}
              {partner.cities &&
                partner.cities.length > 0 &&
                ` • ${partner.cities.join(", ")}`}
            </Text>

            {partner.profile?.bio && (
              <Text
                variant="xs"
                color="mono60"
                mb={2}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {partner.profile.bio}
              </Text>
            )}

            {/* Featured Artworks Section */}
            <Text variant="xs" color="mono60" mb={1}>
              Featured Artworks ({artworks.length})
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
                        area={10000}
                        maxImageHeight={100}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Text variant="xs" color="mono60">
                No artworks available
              </Text>
            )}
          </div>
        )
      }}
    />
  )
}
