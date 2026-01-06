import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"
import ChevronSmallUpIcon from "@artsy/icons/ChevronSmallUpIcon"
import {
  Box,
  type BoxProps,
  Button,
  Dropdown,
  type DropdownActions,
  type DropdownProps,
  Pill,
} from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import type { FC } from "react"

interface DropdownFilterProps
  extends Omit<DropdownProps, "dropdown" | "children"> {
  label: string
  count: number
  children: React.ReactNode
  onClear: () => void
}

export const DropdownFilter = ({
  label,
  count,
  children,
  onClear,
  ...rest
}: DropdownFilterProps) => {
  return (
    <Dropdown
      openDropdownByClick
      dropdownZIndex={Z.dropdown}
      placement="bottom-start"
      dropdown={({ onHide }) => {
        return (
          <DropdownFilterDropdownPanel
            onClear={() => {
              onClear()
              onHide()
            }}
            onConfirm={onHide}
            count={count}
          >
            {children}
          </DropdownFilterDropdownPanel>
        )
      }}
      {...rest}
    >
      {actions => {
        return <DropdownFilterAnchor {...actions} label={label} count={count} />
      }}
    </Dropdown>
  )
}

interface DropdownFilterAnchorProps extends DropdownActions {
  label: string
  count: number
}

export const DropdownFilterAnchor: FC<
  React.PropsWithChildren<DropdownFilterAnchorProps>
> = ({ anchorProps, anchorRef, label, count, visible }) => {
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

interface DropdownFilterDropdownPanelProps extends BoxProps {
  onClear: () => void
  onConfirm: () => void
  children: React.ReactNode
  count: number
}

export const DropdownFilterDropdownPanel: FC<
  React.PropsWithChildren<DropdownFilterDropdownPanelProps>
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
