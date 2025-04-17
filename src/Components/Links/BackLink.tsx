import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import { type BoxProps, Text, type TextProps, boxMixin } from "@artsy/palette"
import type { RouterLinkProps } from "System/Components/RouterLink"
import type * as React from "react"
import styled from "styled-components"
import { StyledLink } from "./StyledLink"

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
export const BackLink: React.FC<React.PropsWithChildren<BackLinkProps>> = ({
  children,
  to,
  ...rest
}) => {
  return (
    // TODO: Anything using a `RouterLink` has issues with the typings.
    // These props are infact valid.
    // @ts-ignore
    <Container to={to} {...rest}>
      <ChevronLeftIcon color="mono100" height={14} width={18} mr={0.5} />
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
