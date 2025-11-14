import { useAuctionResultsFilterContext } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { useAuctionResultsActiveFilters } from "Apps/Artist/Routes/AuctionResults/useAuctionResultsActiveFilters"
import { Button, Flex, Pill } from "@artsy/palette"

export const ArtistAuctionResultsActiveFilters = () => {
  const { pills, removePill } = useAuctionResultsActiveFilters()
  const { resetFilters } = useAuctionResultsFilterContext()

  if (pills.length === 0) {
    return null
  }

  return (
    <Flex flexWrap="wrap" gap={1}>
      {pills.map(pill => {
        return (
          <Pill
            key={[pill.field, pill.value].join(":")}
            variant="gray"
            selected
            onClick={() => {
              removePill(pill)
            }}
          >
            {pill.displayValue}
          </Pill>
        )
      })}

      <Button
        variant="tertiary"
        size="small"
        onClick={() => {
          resetFilters?.()
        }}
      >
        Clear all
      </Button>
    </Flex>
  )
}
