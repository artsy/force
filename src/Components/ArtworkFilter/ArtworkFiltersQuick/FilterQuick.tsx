import {
  Box,
  Button,
  Checkbox,
  Dropdown,
  DropdownProps,
  Pill,
} from "@artsy/palette"
import { FC, useMemo } from "react"
import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"
import ChevronSmallUpIcon from "@artsy/icons/ChevronSmallUpIcon"
import {
  MultiSelectArtworkFilters,
  Slice,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"

interface FilterQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {
  label: string
  name: keyof MultiSelectArtworkFilters
  options: { name: string; value: string }[]
  slice?: Slice
}

export const FilterQuick: FC<FilterQuickProps> = ({
  name,
  label,
  options: _options,
  slice,
  ...rest
}) => {
  const { selectedFiltersCounts, aggregations = [] } = useArtworkFilterContext()

  const { setFilter } = useArtworkFilterContext()

  const selectedFilters = useCurrentlySelectedFilters()

  const count = selectedFiltersCounts[name] || 0
  const currentValue = selectedFilters[name] || []

  const options = useMemo(() => {
    if (!slice) return _options

    const aggregation = aggregations.find(aggregation => {
      return aggregation.slice === slice
    })

    if (!aggregation || aggregation.counts.length === 0) return _options

    return aggregation.counts
  }, [_options, aggregations, slice])

  const handleSelect = (value: string) => (selected: boolean) => {
    const nextValue = selected
      ? [...currentValue, value]
      : currentValue.filter(item => item !== value)

    setFilter(name, nextValue)
  }

  const handleClear = () => {
    setFilter(name, [])
  }

  return (
    <Dropdown
      dropdown={({ onHide }) => {
        return (
          <Box display="flex" flexDirection="column" height={230} width={300}>
            <Box
              p={1}
              flex={1}
              minHeight={0}
              style={{
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                {options.map(({ name, value }, index) => {
                  return (
                    <Checkbox
                      key={index}
                      onSelect={handleSelect(value)}
                      selected={currentValue.includes(value)}
                    >
                      {name}
                    </Checkbox>
                  )
                })}
              </Box>
            </Box>

            <Box
              flexShrink={0}
              display="flex"
              justifyContent="flex-end"
              gap={1}
              p={1}
              zIndex={1}
            >
              <Button
                size="small"
                variant="secondaryBlack"
                onClick={() => {
                  handleClear()
                  onHide()
                }}
              >
                Clear
              </Button>

              <Button size="small" variant="primaryBlack" onClick={onHide}>
                Confirm
              </Button>
            </Box>
          </Box>
        )
      }}
      openDropdownByClick
      placement="bottom-start"
      {...rest}
    >
      {({ anchorRef, anchorProps, visible }) => {
        return (
          <Pill
            ref={anchorRef as any}
            Icon={visible ? ChevronSmallUpIcon : ChevronSmallDownIcon}
            size="small"
            {...anchorProps}
          >
            {label}
            {count > 0 && (
              <Box as="span" color="blue100">
                {" "}
                • {count}
              </Box>
            )}
          </Pill>
        )
      }}
    </Dropdown>
  )
}
