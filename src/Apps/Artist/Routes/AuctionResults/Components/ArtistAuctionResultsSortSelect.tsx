import SortIcon from "@artsy/icons/SortIcon"
import { Button, Dropdown, Radio, RadioGroup } from "@artsy/palette"
import { useAuctionResultsFilterContext } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { type FC, useMemo } from "react"

export const SORTS = [
  { value: "DATE_DESC", text: "Sale Date (Most Recent)" },
  { value: "ESTIMATE_AND_DATE_DESC", text: "Estimate" },
  { value: "PRICE_AND_DATE_DESC", text: "Sale Price" },
]

interface ArtistAuctionResultsSortSelectProps {
  disabled?: boolean
}

export const ArtistAuctionResultsSortSelect: FC<
  ArtistAuctionResultsSortSelectProps
> = ({ disabled }) => {
  const { filters, setFilter } = useAuctionResultsFilterContext()

  const activeSort = useMemo(
    () => SORTS.find(sort => sort.value === filters.sort),
    [filters.sort],
  )

  if (!activeSort) return null

  return (
    <Dropdown
      openDropdownByClick
      placement="bottom-end"
      dropdown={({ onHide }) => {
        return (
          <RadioGroup defaultValue={filters.sort} p={2} gap={2}>
            {SORTS.map(sort => {
              return (
                <Radio
                  key={sort.value}
                  value={sort.value}
                  label={sort.text}
                  onSelect={() => {
                    setFilter("sort", sort.value)
                    onHide()
                  }}
                />
              )
            })}
          </RadioGroup>
        )
      }}
    >
      {({ anchorRef, anchorProps }) => {
        return (
          <Button
            ref={anchorRef as any}
            {...anchorProps}
            Icon={SortIcon}
            variant="tertiary"
            size="small"
            disabled={disabled}
          >
            Sort: {activeSort.text}
          </Button>
        )
      }}
    </Dropdown>
  )
}
