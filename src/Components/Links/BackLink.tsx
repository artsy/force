import * as React from "react"
import { BoxProps, Text, boxMixin, TextProps } from "@artsy/palette"
import { StyledLink } from "./StyledLink"
import { RouterLinkProps } from "System/Components/RouterLink"
import styled from "styled-components"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"

type BackLinkProps = RouterLinkProps &
  BoxProps & { fontWeight?: TextProps["fontWeight"] }

const Container = styled(StyledLink)`
  display: flex;
  align-items: center;
  ${boxMixin}
`

/**
 * @deprecated Use `TopContextBar` instead
 */
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
      <ChevronLeftIcon color="black100" height={14} width={18} mr={0.5} />

      <Text
        variant="sm"
        fontWeight={rest.fontWeight ?? "bold"}
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
