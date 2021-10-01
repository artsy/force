import { Flex, Sup, Text } from "@artsy/palette"
import React from "react"
import { RouterLink } from "v2/System/Router/RouterLink"

export interface RailHeaderProps {
  countLabel?: number
  title: string
  viewAllHref: string
  viewAllLabel: string
  viewAllOnClick?(): void
}

export const RailHeader: React.FC<RailHeaderProps> = ({
  countLabel,
  title,
  viewAllHref,
  viewAllLabel,
  viewAllOnClick = () => null,
}) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg">
          {title}{" "}
          {countLabel && countLabel > 1 && (
            <Sup color="brand">{countLabel}</Sup>
          )}
        </Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to={viewAllHref}
          onClick={viewAllOnClick}
        >
          {viewAllLabel}
        </Text>
      </Flex>
    </>
  )
}
