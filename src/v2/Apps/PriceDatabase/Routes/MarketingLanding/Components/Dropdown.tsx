import {
  ClickableProps,
  useThemeConfig,
  splitBoxProps,
  Box,
  Clickable,
  Flex,
  Text,
  ChevronIcon,
} from "@artsy/palette"
import React, { useState } from "react"
import { TextProps } from "v2/Components/Text"

export interface DropdownProps extends ClickableProps {
  label?: string | JSX.Element
  expanded?: boolean
  children: React.ReactNode
}

/**
 * A toggleable component used to show / hide content
 */
export const Dropdown: React.FC<DropdownProps> = ({
  label,
  expanded: defaultExpanded,
  children,
  disabled,
  onClick,
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: {
      borderColor: "black10",
      textProps: { variant: "small", fontWeight: "bold" } as TextProps,
      chevronSize: 12,
      mr: undefined,
    },
    v3: {
      borderColor: "black60",
      textProps: { variant: "md" } as TextProps,
      chevronSize: 14,
      mr: 1,
    },
  })

  const [expanded, setExpanded] = useState(defaultExpanded)

  const [boxProps, clickableProps] = splitBoxProps(rest)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setExpanded(prevExpanded => !prevExpanded)
    onClick && onClick(event)
  }

  return (
    <Box {...boxProps}>
      <Clickable
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderTop="1px solid"
        borderColor={tokens.borderColor}
        pt={1}
        disabled={disabled}
        aria-expanded={expanded}
        onClick={handleClick}
        {...clickableProps}
      >
        <Flex flex={1} minHeight={40} display="flex" alignItems="center">
          {<Text>{label}</Text>}
        </Flex>

        {!disabled && (
          <ChevronIcon
            direction={expanded ? "up" : "down"}
            width={tokens.chevronSize}
            height={tokens.chevronSize}
            ml={1}
            mr={tokens.mr}
            aria-hidden="true"
          />
        )}
      </Clickable>

      {expanded && children}
    </Box>
  )
}
