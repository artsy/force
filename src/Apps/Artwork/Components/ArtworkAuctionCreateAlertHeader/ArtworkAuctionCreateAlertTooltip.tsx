import { Box, Flex, Pill, Text, Tooltip } from "@artsy/palette"
import * as React from "react"
import InfoIcon from "@artsy/icons/InfoIcon"
import { FC } from "react"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"

export const ArtworkAuctionCreateAlertTooltip: FC = () => {
  const { pills, entity } = useSavedSearchAlertContext()
  const artistName = entity.defaultCriteria?.artistIDs?.[0].displayValue ?? ""

  if (pills.length === 0) {
    return null
  }

  return (
    <Flex justifyContent="center" alignItems="center" mt={4}>
      <Text variant="sm">
        Available works by {artistName} based on similar tags and auction
        activity.
      </Text>
      <Tooltip
        width="auto"
        content={
          <>
            <Text variant="xs" mb={0.5}>
              We are showing you works you may have missed that match the
              similar tags. <br />
              All works are available and ready to purchase.
            </Text>
            {pills.map(pill => {
              return (
                <Pill
                  key={`pill-${pill.field}-${pill.value}`}
                  variant="filter"
                  disabled
                  width="auto"
                  mr={0.5}
                >
                  {pill.displayValue}
                </Pill>
              )
            })}
          </>
        }
        placement="bottom"
      >
        <Box as="span" ml={0.5}>
          <InfoIcon />
        </Box>
      </Tooltip>
    </Flex>
  )
}
