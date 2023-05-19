import styled from "styled-components"

import { themeGet } from "@styled-system/theme-get"
import { Clickable, ClickableProps, Separator } from "@artsy/palette"

interface ContextualMenuItemProps extends ClickableProps {
  children: React.ReactNode
  onClick?: () => void
}

export const ContextualMenuItem: React.FC<ContextualMenuItemProps> = ({
  children,
  onClick,
  padding = 2,
  ...rest
}) => {
  return (
    <ContextualMenuItemContent
      onClick={onClick}
      display="block"
      width="100%"
      padding={padding}
      {...rest}
    >
      {children}
    </ContextualMenuItemContent>
  )
}

const ContextualMenuItemContent = styled(Clickable)`
  user-select: none;

  transition: background-color 250ms;
  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`

export const ContextualMenuDivider: React.FC = () => {
  return <Separator color="black10" as="hr" width="100%" />
}
