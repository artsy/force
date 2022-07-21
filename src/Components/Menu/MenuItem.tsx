import * as React from "react"
import styled from "styled-components"
import {
  Box,
  BoxProps,
  Text,
  TextProps,
  TextVariant,
  boxMixin,
} from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { themeGet } from "@styled-system/theme-get"

const MENU_ITEM_DEFAULT_PROPS = {
  display: "flex",
  alignItems: "center",
  px: 2,
  py: 1,
}

export const MenuItemPlaceholder = styled(Box)``

MenuItemPlaceholder.defaultProps = MENU_ITEM_DEFAULT_PROPS

const Container = styled(RouterLink)<
  BoxProps & { hasLighterTextColor: boolean }
>`
  text-decoration: none;
  cursor: pointer;
  ${boxMixin};

  &:hover,
  &:focus {
    outline: none;
    background-color: ${({ hasLighterTextColor }) =>
      hasLighterTextColor
        ? themeGet("colors.black10")
        : themeGet("colors.black5")};
  }
`

Container.defaultProps = MENU_ITEM_DEFAULT_PROPS

interface MenuItemProps
  extends BoxProps,
    Omit<React.HTMLAttributes<HTMLAnchorElement>, "color"> {
  href?: string
  hasLighterTextColor?: boolean
  children: React.ReactNode
  variant?: TextVariant
  color?: TextProps["textColor"]
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href,
  hasLighterTextColor,
  variant = "sm",
  color,
  ...rest
}) => {
  return (
    <Container
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      to={href}
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      hasLighterTextColor={hasLighterTextColor}
      px={2}
      py={1}
      {...rest}
    >
      <Text
        display="flex"
        alignItems="center"
        variant={variant}
        textColor={color}
      >
        {children}
      </Text>
    </Container>
  )
}
