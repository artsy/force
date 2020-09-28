import { Button, Flex, Text } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"

interface HeaderProps {
  buttonHref?: string
  children?: JSX.Element
  title: string
}

export const Header: React.SFC<HeaderProps> = props => {
  const { buttonHref, children, title } = props

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text variant="title" color="black100" mb={2} textAlign="center">
        {title}
      </Text>
      {buttonHref && (
        <RouterLink to={buttonHref}>
          <Button variant="secondaryOutline" mb={3}>
            View all
          </Button>
        </RouterLink>
      )}
      {children}
    </Flex>
  )
}
