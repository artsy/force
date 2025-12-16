import SortIcon from "@artsy/icons/SortIcon"
import {
  Button,
  Dropdown,
  type DropdownProps,
  Radio,
  RadioGroup,
} from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import type { FC } from "react"

interface ArtworkFilterSortProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const ArtworkFilterSort: FC<
  React.PropsWithChildren<ArtworkFilterSortProps>
> = props => {
  const { sortOptions, filters, setFilter } = useArtworkFilterContext()

  const activeSort = sortOptions?.find(({ value }) => {
    return value === (filters?.sort ?? "-decayed_merch")
  }) || { text: "Default", value: "-decayed_merch" }

  return (
    <Dropdown
      dropdownZIndex={Z.dropdown}
      dropdown={({ onHide }) => {
        return (
          <RadioGroup
            defaultValue={filters?.sort}
            onSelect={option => {
              setFilter("sort", option)
              onHide()
            }}
            p={2}
            gap={2}
          >
            {(sortOptions || []).map(({ value, text }) => {
              return <Radio key={value} value={value} label={text} />
            })}
          </RadioGroup>
        )
      }}
      openDropdownByClick
      placement="bottom-end"
      {...props}
    >
      {({ anchorRef, anchorProps }) => {
        return (
          <Button
            ref={anchorRef as any}
            {...anchorProps}
            Icon={SortIcon}
            size="small"
            variant="tertiary"
          >
            Sort: {activeSort.text}
          </Button>
        )
      }}
    </Dropdown>
  )
}
