import React from "react"
import { BoxProps, ChevronIcon, Text, boxMixin } from "@artsy/palette"
import { StyledLink } from "./StyledLink"
import styled from "styled-components"

interface ForwardLinkProps extends BoxProps {
  linkText: string
  path: string
}

const Link = styled(StyledLink)<BoxProps>`
  ${boxMixin}

  svg {
    transition: opacity 250ms;
  }

  &:hover {
    svg {
      opacity: 0.5;
    }
  }
`

export const ForwardLink: React.FC<ForwardLinkProps> = ({
  linkText,
  path,
  ...rest
}) => {
  return (
    <Link
      to={path}
      display="flex"
      flexDirection="row"
      alignItems="center"
      {...rest}
    >
      <Text variant="mediumText" mr={0.3}>
        {linkText}
      </Text>

      <ChevronIcon
        title={null}
        direction="right"
        color="black"
        height="18px"
        width="14px"
        top="-1px"
      />
    </Link>
  )
}
