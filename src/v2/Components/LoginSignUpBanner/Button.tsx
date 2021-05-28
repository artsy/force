import React from "react"
import { Box, color, BoxProps } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import styled from "styled-components"

interface Props extends BoxProps {
  href: string
}

const Button = styled(Box).attrs({
  flexGrow: 1,
  py: "8px",
})`
  width: 50%;
  height: 40px;
  text-align: center;
  background-color: ${color("black80")};
  color: ${color("white100")};
  font-family: "ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 15px;
`

export const BannerButton: React.FC<Props> = props => {
  const { href, children, ...rest } = props

  return (
    <Button {...rest}>
      <RouterLink to={href} noUnderline>
        {children}
      </RouterLink>
    </Button>
  )
}
