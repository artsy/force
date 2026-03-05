import { Flex } from "@artsy/palette"
import React from "react"

interface RadioOptionRowProps {
  onClick?: () => void
  children: React.ReactNode
  value?: unknown
  onSelect?: (args: { selected: boolean; value: unknown }) => void
  selected?: boolean
}

/**
 * Styled wrapper for a radio option row. Pass the radio button's selection
 * handler to `onClick` so the entire row is clickable, NOT the radio itself.
 */
export const RadioOptionRow: React.FC<RadioOptionRowProps> = ({
  onClick,
  onSelect,
  selected = false,
  value: _value,
  children,
}) => {
  const [radioChild, ...otherChildren] = React.Children.toArray(children)
  const clonedRadio = React.cloneElement(radioChild as React.ReactElement, {
    onSelect,
    selected,
  })

  return (
    <Flex
      backgroundColor={selected ? "mono5" : "mono0"}
      p={1}
      onClick={onClick}
    >
      {clonedRadio}
      {otherChildren}
    </Flex>
  )
}
