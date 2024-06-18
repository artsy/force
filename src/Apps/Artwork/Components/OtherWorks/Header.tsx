import { Flex, SkeletonText, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import * as React from "react"

interface HeaderProps {
  buttonHref?: string
  children?: JSX.Element
  title: string
}

export const Header: React.FC<HeaderProps> = ({
  buttonHref,
  children,
  title,
}) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Text variant="lg-display">{title}</Text>

      {buttonHref && (
        <RouterLink to={buttonHref} ml={2} flexShrink={0}>
          <Text variant="sm-display">View All</Text>
        </RouterLink>
      )}

      {children}
    </Flex>
  )
}

export const HeaderPlaceholder: React.FC<
  Omit<HeaderProps, "buttonHref"> & { buttonHref?: boolean }
> = ({ buttonHref, children, title }) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <SkeletonText variant="lg-display">{title}</SkeletonText>

      {buttonHref && (
        <SkeletonText ml={2} flexShrink={0} variant="sm-display">
          View All
        </SkeletonText>
      )}

      {children}
    </Flex>
  )
}
