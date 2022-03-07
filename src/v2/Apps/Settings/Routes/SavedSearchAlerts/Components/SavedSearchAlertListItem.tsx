import {
  Box,
  Text,
  Flex,
  Clickable,
  Spacer,
  Pill,
  IconProps,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@artsy/palette"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SavedSearchAlertListItem_item } from "v2/__generated__/SavedSearchAlertListItem_item.graphql"
import { EditAlertEntity } from "../types"

export type SavedSearchAlertListItemVariant = "active" | "inactive"

const AlertPill = styled(Pill)<{ active: boolean }>`
  pointer-events: none;
`

const DISPLAYED_PILLS_COUNT = 8

interface SavedSearchAlertListItemProps {
  item: SavedSearchAlertListItem_item
  variant?: SavedSearchAlertListItemVariant
  onEditAlertClick: (entity: EditAlertEntity) => void
}

export const SavedSearchAlertListItem: React.FC<SavedSearchAlertListItemProps> = ({
  item,
  variant,
  onEditAlertClick,
}) => {
  const viewAllHref = `${item.href}&search_criteria_id=${item.internalID}`
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon: React.FC<IconProps> = isExpanded ? ArrowUpIcon : ArrowDownIcon
  const shouldDisplayAllFilters =
    isExpanded && item.labels.length > DISPLAYED_PILLS_COUNT
  const labels = shouldDisplayAllFilters
    ? item.labels
    : item.labels.slice(0, DISPLAYED_PILLS_COUNT)

  const toggleExpandFilters = () => setIsExpanded(isExpanded => !isExpanded)

  const toggleExpandFiltersText = isExpanded
    ? "Close all filters"
    : "Show all filters"

  return (
    <Box
      key={item.internalID}
      px={[2, 4]}
      py={4}
      opacity={variant === "inactive" ? 0.24 : 1}
      bg={variant === "active" ? "black5" : "transparent"}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex flex={1} mr={2}>
          <Text
            variant="lg"
            color={variant === "active" ? "blue100" : "black100"}
          >
            {item.userAlertSettings.name}
          </Text>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Clickable
            textDecoration="underline"
            onClick={() => {
              onEditAlertClick({
                id: item.internalID,
                name: item.userAlertSettings.name!,
                artistId: item.artistIDs![0],
              })
            }}
          >
            <Text variant="sm">Edit</Text>
          </Clickable>
          <Spacer ml={2} />
          <RouterLink to={viewAllHref} textDecoration="underline">
            <Text variant="sm">View All</Text>
          </RouterLink>
        </Flex>
      </Flex>
      <Spacer my={2} />
      {labels.map(label => (
        <AlertPill key={label.value} variant="textSquare" active mr={1} mb={1}>
          {label.value}
        </AlertPill>
      ))}
      {item.labels.length > DISPLAYED_PILLS_COUNT && (
        <Clickable textDecoration="underline" onClick={toggleExpandFilters}>
          <Flex flexDirection="row" alignItems="center">
            <Text variant="sm">{toggleExpandFiltersText}</Text>
            <Icon height={18} width={18} ml={0.5} />
          </Flex>
        </Clickable>
      )}
    </Box>
  )
}

export const SavedSearchAlertListItemFragmentContainer = createFragmentContainer(
  SavedSearchAlertListItem,
  {
    item: graphql`
      fragment SavedSearchAlertListItem_item on SearchCriteria {
        internalID
        artistIDs
        href
        labels {
          value
        }
        userAlertSettings {
          name
        }
      }
    `,
  }
)
