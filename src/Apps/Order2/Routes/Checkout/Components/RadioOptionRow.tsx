import { Flex } from "@artsy/palette"

interface RadioOptionRowProps {
  isSelected: boolean
  onClick?: () => void
  children: React.ReactNode
}

/**
 * Styled wrapper for a radio option row. Pass the radio button's selection
 * handler to `onClick` so the entire row is clickable, NOT the radio itself.
 */
export const RadioOptionRow: React.FC<RadioOptionRowProps> = ({
  isSelected,
  onClick,
  children,
}) => {
  return (
    <Flex
      backgroundColor={isSelected ? "mono5" : "mono0"}
      px={1}
      py={2}
      onClick={onClick}
    >
      {children}
    </Flex>
  )
}
