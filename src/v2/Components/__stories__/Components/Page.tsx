import { Box, BoxProps, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import * as React from "react"
import styled from "styled-components"

export const Page: React.FC<BoxProps & { title?: string }> = ({
  children,
  title = "",
  ...rest
}) => {
  return (
    <AppContainer {...rest} py={2} px={4}>
      {children}

      <Text variant="lg-display" my={6}>
        {title}
      </Text>
    </AppContainer>
  )
}

const AppContainer = styled(Box)`
  max-width: ${themeGet("breakpoints.lg")};
`

AppContainer.defaultProps = {
  mx: "auto",
  px: [2, 4],
}
