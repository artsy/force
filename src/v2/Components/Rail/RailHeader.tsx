import { Box, Flex, SkeletonText, Sup, Text as BaseText } from "@artsy/palette"
import React from "react"
import { RouterLink } from "v2/System/Router/RouterLink"

export interface RailHeaderProps {
  countLabel?: number
  isLoading?: boolean
  title: string
  subTitle?: string
  viewAllHref?: string
  viewAllLabel?: string
  viewAllOnClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void
}

export const computeTitleContent = (viewAllHref, viewAllOnClick, title) => {
  if (!viewAllHref) return title

  return (
    <RouterLink
      // @ts-ignore
      to={viewAllHref}
      onClick={viewAllOnClick}
    >
      {title}
    </RouterLink>
  )
}

export const RailHeader: React.FC<RailHeaderProps> = ({
  countLabel,
  isLoading = false,
  title,
  subTitle,
  viewAllHref,
  viewAllLabel,
  viewAllOnClick = () => null,
}) => {
  const showViewAll = Boolean(viewAllLabel && viewAllHref)

  const Text = isLoading ? SkeletonText : BaseText
  const titleContent = computeTitleContent(viewAllHref, viewAllOnClick, title)

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Text variant="lg" as="h3">
          {titleContent}{" "}
          {countLabel && countLabel > 1 && (
            <Sup color="brand">{countLabel}</Sup>
          )}
        </Text>

        {subTitle && (
          <Text as="h3" variant="lg" color="black60">
            {subTitle}
          </Text>
        )}
      </Box>

      {showViewAll && (
        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to={viewAllHref}
          onClick={viewAllOnClick}
        >
          {viewAllLabel}
        </Text>
      )}
    </Flex>
  )
}
