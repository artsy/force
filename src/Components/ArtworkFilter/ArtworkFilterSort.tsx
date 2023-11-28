import {
  Clickable,
  Dropdown,
  DropdownProps,
  Radio,
  RadioGroup,
  Text,
} from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FC } from "react"
import SortIcon from "@artsy/icons/SortIcon"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface ArtworkFilterSortProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const ArtworkFilterSort: FC<ArtworkFilterSortProps> = props => {
  const { sortOptions, filters, setFilter } = useArtworkFilterContext()

  const activeSort = sortOptions?.find(({ value }) => {
    return value === (filters?.sort ?? "-decayed_merch")
  }) || { text: "Default", value: "-decayed_merch" }

  return (
    <Dropdown
      dropdown={
        <RadioGroup
          defaultValue={filters?.sort}
          onSelect={option => {
            setFilter("sort", option)
          }}
          p={2}
          gap={2}
        >
          {(sortOptions || []).map(({ value, text }) => {
            return <Radio key={value} value={value} label={text} />
          })}
        </RadioGroup>
      }
      openDropdownByClick
      placement="bottom-end"
      {...props}
    >
      {({ anchorRef, anchorProps }) => {
        return (
          <Button ref={anchorRef as any} {...anchorProps}>
            <SortIcon />
            <Text variant="xs">Sort: {activeSort.text}</Text>
          </Button>
        )
      }}
    </Dropdown>
  )
}

const Button = styled(Clickable).attrs({
  gap: 0.5,
  px: 2,
  py: 0.5,
})`
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    color: ${themeGet("colors.blue100")};
  }
`
