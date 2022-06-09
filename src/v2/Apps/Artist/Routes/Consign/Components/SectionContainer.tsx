import { BoxProps, FullBleed } from "@artsy/palette"
import * as React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"

interface SectionContainerProps extends BoxProps {}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  ...rest
}) => {
  return (
    <FullBleed overflow="hidden" textAlign="center" py={6} {...rest}>
      <AppContainer>
        <HorizontalPadding>{children}</HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
