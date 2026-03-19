import { Box, Flex, Image, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { resized } from "Utils/resized"
import type { SearchHoverArtworkPreviewQuery } from "__generated__/SearchHoverArtworkPreviewQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"
import type { SuggestionItemOptionProps } from "./SuggestionItem"

interface SearchHoverArtworkPreviewProps {
  option: SuggestionItemOptionProps
}

export const SearchHoverArtworkPreview: FC<SearchHoverArtworkPreviewProps> = ({
  option,
}) => {
  if (!option.item_id) {
    return (
      <div style={{ fontSize: "12px", color: "#999" }}>
        Unable to load artwork details
      </div>
    )
  }

  return (
    <SystemQueryRenderer<SearchHoverArtworkPreviewQuery>
      lazyLoad
      query={graphql`
        query SearchHoverArtworkPreviewQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            title
            href
            date
            medium
            dimensions {
              in
              cm
            }
            artistNames
            saleMessage
            price
            availability
            isAcquireable
            isOfferable
            isInquireable
            image {
              url(version: ["normalized", "larger", "large"])
              width
              height
            }
            partner {
              name
              href
              type
            }
            sale {
              name
              isClosed
              isAuction
            }
          }
        }
      `}
      variables={{ artworkID: option.item_id }}
      render={({ error, props }) => {
        if (error || !props?.artwork) {
          return (
            <div style={{ fontSize: "12px", color: "#999" }}>
              Unable to load artwork details
            </div>
          )
        }

        const { artwork } = props
        const image =
          artwork.image?.url && resized(artwork.image.url, { width: 120 })

        return (
          <Flex>
            {/* Artwork Image - Clickable */}
            {image && (
              <Box flexShrink={0} mr={2}>
                <RouterLink
                  to={artwork.href || option.href}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    width={90}
                    height={90}
                    bg="mono10"
                    borderRadius={2}
                    overflow="hidden"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      src={image.src}
                      srcSet={image.srcSet}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                      alt={artwork.title || "Artwork"}
                    />
                  </Box>
                </RouterLink>
              </Box>
            )}

            {/* Artwork Details */}
            <Box flex={1} minWidth={0}>
              {/* Artwork Title - Clickable */}
              <RouterLink
                to={artwork.href || option.href}
                style={{ textDecoration: "none" }}
              >
                <Text
                  variant="sm"
                  color="black100"
                  mb={0.5}
                  overflowEllipsis
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
                  {artwork.title || "Untitled"}
                </Text>
              </RouterLink>

              {/* Artist Name - Clickable to artist page */}
              {artwork.artistNames && (
                <Text variant="xs" color="mono90" mb={1}>
                  {artwork.artistNames}
                </Text>
              )}

              {artwork.date && (
                <Text variant="xs" color="mono60" mb={1}>
                  {artwork.date}
                </Text>
              )}

              {/* Partner - Clickable */}
              {artwork.partner && (
                <RouterLink
                  to={
                    artwork.partner.href || `/partner/${artwork.partner.name}`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Text
                    variant="xs"
                    color="mono60"
                    mb={1}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.textDecoration = "underline"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.textDecoration = "none"
                    }}
                  >
                    {artwork.partner.name}
                  </Text>
                </RouterLink>
              )}

              {/* Price Information - Non-clickable */}
              <Box mb={1}>
                {artwork.price && (
                  <Text variant="xs" fontWeight="medium">
                    {artwork.price}
                  </Text>
                )}
                {artwork.saleMessage && !artwork.price && (
                  <Text variant="xs" color="mono60">
                    {artwork.saleMessage}
                  </Text>
                )}
              </Box>

              {/* Availability Status - Non-clickable */}
              <Flex gap={1} mb={1}>
                {artwork.isAcquireable && (
                  <Text variant="xs" color="blue100">
                    Buy now
                  </Text>
                )}
                {artwork.isOfferable && (
                  <Text variant="xs" color="purple100">
                    Make offer
                  </Text>
                )}
                {artwork.isInquireable && (
                  <Text variant="xs" color="mono60">
                    Contact gallery
                  </Text>
                )}
              </Flex>

              {/* Medium - Non-clickable */}
              {artwork.medium && (
                <Text
                  variant="xs"
                  color="mono60"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {artwork.medium}
                </Text>
              )}
            </Box>
          </Flex>
        )
      }}
    />
  )
}
