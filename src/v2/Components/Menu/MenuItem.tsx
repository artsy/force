import React from "react"
import styled from "styled-components"
import {
  BoxProps,
  Text,
  TextProps,
  TextVariant,
  boxMixin,
  color,
} from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

const Container = styled(RouterLink)<
  BoxProps & { hasLighterTextColor: boolean }
>`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  ${boxMixin};

  &:hover,
  &:focus {
    outline: none;
    background-color: ${({ hasLighterTextColor }) =>
      hasLighterTextColor ? color("black10") : color("black5")};
  }
`

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
  px = 2,
  py = 1,
  hasLighterTextColor,
  variant = "text",
  color,
  ...rest
}) => {
  return (
    <Container
      to={href}
      hasLighterTextColor={hasLighterTextColor}
      px={px}
      py={py}
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
