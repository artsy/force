import { Box, Breakpoint, EntityHeader, Flex, Text } from "@artsy/palette"
import React, { useState } from "react"
import styled from "styled-components"

interface FeaturedArtistsProps {
  hasMultipleArtists: boolean
  featuredArtists: object[]
  breakpointSize: Breakpoint
}

export const FeaturedArtists: React.FC<FeaturedArtistsProps> = props => {
  const { featuredArtists, breakpointSize, hasMultipleArtists } = props
  const artistCount = getArtistCountAtBreakpoint(breakpointSize)
  const remainingCount = featuredArtists.length - artistCount
  const truncatedArtists = featuredArtists.slice(0, artistCount)
  const [showAll, setShowMore] = useState(false)
  const headlineLabel = "Featured Artist" + (hasMultipleArtists ? "s" : "")

  return (
    <Box pb={1}>
      <Text pb={15}>{headlineLabel}</Text>
      <Flex flexWrap="wrap">
        {showAll || featuredArtists.length <= artistCount ? (
          featuredArtists
        ) : (
          <>
            {truncatedArtists}
            <Box
              width={["100%", "33%", "33%", "25%"]}
              pb={20}
              key="view-more"
              onClick={() => {
                setShowMore(true)
              }}
            >
              <ViewMore size="3">
                <EntityHeader
                  initials={`+ ${remainingCount}`}
                  name="View more"
                />
              </ViewMore>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  )
}

const ViewMore = styled(Text)`
  div {
    div {
      text-decoration: underline;
      cursor: pointer;
    }

    div:first-child {
      text-decoration: none;
    }
  }
`

ViewMore.displayName = "ViewMore"

const getArtistCountAtBreakpoint = breakpointSize => {
  switch (breakpointSize) {
    case "xs":
    case "sm":
      return 3
    case "md":
      return 5
    case "lg":
    case "xl":
      return 7
    default:
      return 3
  }
}
