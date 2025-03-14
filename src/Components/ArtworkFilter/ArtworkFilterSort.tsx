import SortIcon from "@artsy/icons/SortIcon"
import {
  Clickable,
  Dropdown,
  type DropdownProps,
  Radio,
  RadioGroup,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import type { FC } from "react"
import styled from "styled-components"

interface ArtworkFilterSortProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const ArtworkFilterSort: FC<
  React.PropsWithChildren<ArtworkFilterSortProps>
> = props => {
  const { sortOptions, filters, setFilter } = useArtworkFilterContext()

  const activeSort = sortOptions?.find(({ value }) => {
    return value === (filters?.sort ?? "-decayed_merch")
  }) || { text: "Default", value: "-decayed_merch" }

  let hideDropdown

  return (
    <Dropdown
      dropdown={
        <RadioGroup
          defaultValue={filters?.sort}
          onSelect={option => {
            setFilter("sort", option)
            hideDropdown?.()
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
      {/*
        FIXME: REACT_18_UPGRADE
        @ts-ignore */}
      {({ anchorRef, anchorProps, onHide }) => {
        // Store ref to hide action to access up above
        hideDropdown = onHide

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
