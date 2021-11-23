import * as React from "react"
import { BoxProps, ChevronIcon, Text, boxMixin } from "@artsy/palette"
import { StyledLink } from "./StyledLink"
import styled from "styled-components"

interface ForwardLinkProps extends BoxProps {
  to: string
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
  children,
  to,
  ...rest
}) => {
  return (
    <Link
      to={to}
      display="flex"
      flexDirection="row"
      alignItems="center"
      {...rest}
    >
      <Text variant="mediumText" mr={0.3}>
        {children}
      </Text>

      <ChevronIcon
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
