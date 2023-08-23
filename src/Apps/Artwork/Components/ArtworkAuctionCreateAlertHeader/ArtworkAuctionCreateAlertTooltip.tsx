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
    <Flex justifyContent="center" alignItems="center">
      <Text variant="sm">
        You may be interested in these similar works by {artistName}.
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
            <Flex flexWrap="wrap" gap={1}>
              {pills.map(pill => {
                return (
                  <Pill
                    key={`pill-${pill.field}-${pill.value}`}
                    variant="filter"
                    disabled
                    width="auto"
                  >
                    {pill.displayValue}
                  </Pill>
                )
              })}
            </Flex>
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
