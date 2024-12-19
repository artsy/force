import { type BoxProps, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import type * as React from "react"

interface SectionContainerProps extends BoxProps {}

export const SectionContainer: React.FC<
  React.PropsWithChildren<SectionContainerProps>
> = ({ children, ...rest }) => {
  return (
    <FullBleed overflow="hidden" textAlign="center" py={6} {...rest}>
      <AppContainer>
        <HorizontalPadding>{children}</HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
