import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { FC } from "react"

interface AISearchResultFooterProps {
  href: string
  label: string
}

export const AISearchResultFooter: FC<AISearchResultFooterProps> = ({
  href,
  label,
}) => {
  return (
    <RouterLink to={href} display="inline-block" textDecoration="none">
      <Flex alignItems="center">
        <Text variant="sm-display" color="blue100">
          {label}
        </Text>

        <ChevronRightIcon fill="blue100" ml={0.5} />
      </Flex>
    </RouterLink>
  )
}
