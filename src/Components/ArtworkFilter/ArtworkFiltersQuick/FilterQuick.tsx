import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Dropdown,
  DropdownActions,
  DropdownProps,
  Pill,
} from "@artsy/palette"
import { FC, useMemo } from "react"
import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"
import ChevronSmallUpIcon from "@artsy/icons/ChevronSmallUpIcon"
import {
  MultiSelectArtworkFilters,
  Slice,
  initialArtworkFilterState,
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
    setFilter(name, initialArtworkFilterState[name])
  }

  return (
    <Dropdown
      dropdown={({ onHide }) => {
        return (
          <FilterQuickDropdownPanel
            count={count}
            onConfirm={onHide}
            onClear={() => {
              handleClear()
              onHide()
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
          </FilterQuickDropdownPanel>
        )
      }}
      openDropdownByClick
      placement="bottom-start"
      {...rest}
    >
      {props => {
        return (
          <FilterQuickDropdownAnchor label={label} count={count} {...props} />
        )
      }}
    </Dropdown>
  )
}

interface FilterQuickDropdownAnchorProps extends DropdownActions {
  label: string
  count: number
}

export const FilterQuickDropdownAnchor: FC<FilterQuickDropdownAnchorProps> = ({
  anchorProps,
  anchorRef,
  label,
  count,
  visible,
}) => {
  return (
    <Pill
      ref={anchorRef as any}
      size="small"
      Icon={visible ? ChevronSmallUpIcon : ChevronSmallDownIcon}
      iconPosition="right"
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
}

interface FilterQuickDropdownPanelProps extends BoxProps {
  onClear: () => void
  onConfirm: () => void
  children: React.ReactNode
  count: number
}

export const FilterQuickDropdownPanel: FC<FilterQuickDropdownPanelProps> = ({
  onClear,
  onConfirm,
  children,
  count,
  p = 1,
  ...rest
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxHeight={230}
      width={300}
      {...rest}
    >
      <Box
        p={p}
        flex={1}
        minHeight={0}
        style={{
          overflowY: "scroll",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
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
          onClick={onClear}
          disabled={count === 0}
        >
          Clear
        </Button>

        <Button
          size="small"
          variant="primaryBlack"
          onClick={onConfirm}
          disabled={count === 0}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  )
}
