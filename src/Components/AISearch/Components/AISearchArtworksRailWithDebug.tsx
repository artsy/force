import { Box, Clickable, Flex, Shelf, Spacer, Text } from "@artsy/palette"
import { AISearchDebugEntryList } from "Components/AISearch/Components/AISearchDebugEntryList"
import { debugLabel } from "Components/AISearch/Components/AISearchDebugPanel"
import type { AISearchDebugEntry } from "Components/AISearch/Utils/aiSearchTypes"
import { type FC, Fragment, useState } from "react"

interface AISearchArtworksRailWithDebugProps {
  title: string
  subTitle?: string
  entries: AISearchDebugEntry[]
  getItems: () => JSX.Element[]
}

/**
 * The artworks rail with a debug toggle alongside its title, expanding the
 * agent's queries between the title and the cards.
 *
 * This mirrors `Rail`'s own layout rather than using it, because `Rail` renders
 * its header and shelf as one unit with nothing to insert between them. Only
 * reached in debug mode, so the shared `Rail` everyone else gets is untouched.
 */
export const AISearchArtworksRailWithDebug: FC<
  AISearchArtworksRailWithDebugProps
> = ({ title, subTitle, entries, getItems }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Box width="100%">
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box pr={2}>
          {/* Matches `RailHeader`, which this rail can't use and still slot the queries in */}
          <Text variant="lg-display" as="h3" lineClamp={2} mr={2}>
            {title}
          </Text>

          {!!subTitle && (
            <Text
              display={["none", "block"]}
              as="h4"
              variant="lg-display"
              color="mono60"
              lineClamp={2}
            >
              {subTitle}
            </Text>
          )}
        </Box>

        <Clickable
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
          flexShrink={0}
        >
          <Text
            variant="xs"
            color="mono60"
            style={{ textDecoration: "underline" }}
          >
            {isExpanded ? "Hide" : debugLabel(entries.length)}
          </Text>
        </Clickable>
      </Flex>

      {isExpanded && (
        <Box mt={1} bg="mono5" px={2} py={1} borderRadius={4}>
          <AISearchDebugEntryList entries={entries} />
        </Box>
      )}

      <Spacer y={4} />

      <Shelf alignItems="flex-end">
        {getItems().map((item, index) => {
          return <Fragment key={index}>{item}</Fragment>
        })}
      </Shelf>
    </Box>
  )
}
