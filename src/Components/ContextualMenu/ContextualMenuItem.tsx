import { Clickable, type ClickableProps, Separator } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

interface ContextualMenuItemProps extends ClickableProps {
  children: React.ReactNode
  onClick?: () => void
}

export const ContextualMenuItem: React.FC<
  React.PropsWithChildren<ContextualMenuItemProps>
> = ({ children, onClick, padding = 2, ...rest }) => {
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
    background-color: ${themeGet("colors.mono5")};
  }
`

export const ContextualMenuDivider: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <Separator color="mono10" as="hr" width="100%" />
}
