import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"
import ChevronSmallUpIcon from "@artsy/icons/ChevronSmallUpIcon"
import {
  Box,
  type BoxProps,
  Button,
  Checkbox,
  Dropdown,
  type DropdownActions,
  type DropdownProps,
  Pill,
} from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  type Slice,
  initialArtworkFilterState,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import type { MultiSelectArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { type FC, useCallback, useMemo } from "react"

interface FilterQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {
  label: string
  name: keyof MultiSelectArtworkFilters
  options: { name: string; value: string }[]
  slice?: Slice
  /** Show the applied values instead of the label: "Painting", not "Medium • 1" */
  labelAppliedValues?: boolean
  /** For slices whose names aren't display-ready — periods arrive as "1990" */
  formatOptionName?: (name: string) => string
}

export const FilterQuick: FC<React.PropsWithChildren<FilterQuickProps>> = ({
  name,
  label,
  options: _options,
  slice,
  labelAppliedValues,
  formatOptionName,
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

  const displayName = useCallback(
    (name: string): string => {
      return formatOptionName ? formatOptionName(name) : name
    },
    [formatOptionName],
  )

  // Walks `currentValue`, so the pill names the value applied first rather than
  // whichever comes first in `options`. Names come from `options`, so the pill
  // reads "Work on Paper", not "work-on-paper".
  const appliedLabels = useMemo(() => {
    if (!labelAppliedValues) return undefined

    return currentValue.flatMap(value => {
      const option = options.find(option => {
        return option.value === value
      })

      return option ? [displayName(option.name)] : []
    })
  }, [labelAppliedValues, options, currentValue, displayName])

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
      dropdownZIndex={Z.dropdown}
      // eslint-disable-next-line react/no-unstable-nested-components
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
                    {displayName(name)}
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
          <FilterQuickDropdownAnchor
            label={label}
            count={count}
            appliedLabels={appliedLabels}
            {...props}
          />
        )
      }}
    </Dropdown>
  )
}

interface FilterQuickDropdownAnchorProps extends DropdownActions {
  label: string
  count: number
  /** When present, replaces the label and the pill reads as selected */
  appliedLabels?: string[]
}

export const FilterQuickDropdownAnchor: FC<
  React.PropsWithChildren<FilterQuickDropdownAnchorProps>
> = ({ anchorProps, anchorRef, label, count, appliedLabels, visible }) => {
  const hasAppliedLabels = !!appliedLabels?.length

  return (
    <Pill
      ref={anchorRef as any}
      size="small"
      selected={hasAppliedLabels}
      Icon={visible ? ChevronSmallUpIcon : ChevronSmallDownIcon}
      iconPosition="right"
      {...anchorProps}
    >
      {hasAppliedLabels ? formatAppliedLabels(appliedLabels, count) : label}

      {!hasAppliedLabels && count > 0 && (
        <Box as="span" color="blue100">
          {" "}
          • {count}
        </Box>
      )}
    </Pill>
  )
}

/**
 * Only the first value is named; joining them all overflows the row. The
 * remainder is counted off `count` rather than the named labels, so a value
 * `options` can't name still shows up in the total.
 */
const formatAppliedLabels = (
  appliedLabels: string[],
  count: number,
): string => {
  const [first] = appliedLabels

  if (count <= 1) {
    return first
  }

  return `${first} +${count - 1}`
}

interface FilterQuickDropdownPanelProps extends BoxProps {
  onClear: () => void
  onConfirm: () => void
  children: React.ReactNode
  count: number
}

export const FilterQuickDropdownPanel: FC<
  React.PropsWithChildren<FilterQuickDropdownPanelProps>
> = ({ onClear, onConfirm, children, count, p = 1, ...rest }) => {
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
