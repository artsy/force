import { Box, Flex, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import * as React from "react"

interface HeaderProps {
  buttonHref?: string
  children?: JSX.Element
  title: string
}

export const Header: React.FC<HeaderProps> = props => {
  const { buttonHref, children, title } = props

  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Text variant="lg-display" color="black100">
        {title}
      </Text>

      {buttonHref && (
        <Box ml={2} flexShrink={0}>
          <RouterLink to={buttonHref}>
            <Text variant="sm-display">View All</Text>
          </RouterLink>
        </Box>
      )}

      {children}
    </Flex>
  )
}
