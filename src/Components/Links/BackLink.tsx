import * as React from "react"
import { BoxProps, ChevronIcon, Text, boxMixin } from "@artsy/palette"
import { StyledLink } from "./StyledLink"
import { RouterLinkProps } from "System/Router/RouterLink"
import styled from "styled-components"

type BackLinkProps = RouterLinkProps & BoxProps

const Container = styled(StyledLink)`
  display: flex;
  align-items: center;
  ${boxMixin}
`

export const BackLink: React.FC<BackLinkProps> = ({
  children,
  to,
  ...rest
}) => {
  return (
    // TODO: Anything using a `RouterLink` has issues with the typings.
    // These props are infact valid.
    // @ts-ignore
    <Container to={to} {...rest}>
      <ChevronIcon
        direction="left"
        color="black100"
        height={14}
        width={18}
        mr={0.5}
      />

      <Text
        variant="sm"
        fontWeight="bold"
        lineHeight="solid"
        // HACK: Visually align with the chevron because
        // Unica's baseline is abnormally high
        position="relative"
        bottom={-1}
      >
        {children}
      </Text>
    </Container>
  )
}
