import { Box, Flex, SkeletonText, Sup, Text as BaseText } from "@artsy/palette"
import * as React from "react"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"

export interface RailHeaderProps {
  countLabel?: number
  isLoading?: boolean
  title: string
  subTitle?: string
  viewAllHref?: string | null
  viewAllLabel?: string
  viewAllOnClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void
}

type RailHeaderTitleProps = Pick<
  RailHeaderProps,
  "title" | "viewAllHref" | "viewAllOnClick"
>

export const RailHeaderTitle: React.FC<RailHeaderTitleProps> = ({
  viewAllHref,
  viewAllOnClick,
  title,
}) => {
  if (!viewAllHref) return <>{title}</>

  return (
    <RouterLink to={viewAllHref} onClick={viewAllOnClick} textDecoration="none">
      {title}
    </RouterLink>
  )
}

export const RailHeader: React.FC<RailHeaderProps> = ({
  countLabel,
  isLoading = false,
  title,
  subTitle,
  viewAllHref: _viewAllHref,
  viewAllLabel,
  viewAllOnClick = () => null,
}) => {
  const Text = isLoading ? SkeletonText : BaseText

  const showViewAll = Boolean(viewAllLabel && _viewAllHref)

  const viewAllHref = useReturnTo(_viewAllHref)

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box pr={2}>
        <Text variant="lg-display" as="h3" lineClamp={2} mr={2}>
          <RailHeaderTitle
            title={title}
            viewAllHref={viewAllHref}
            viewAllOnClick={viewAllOnClick}
          />{" "}
          {countLabel && countLabel > 1 && (
            <Sup color="brand">{countLabel}</Sup>
          )}
        </Text>

        {subTitle && (
          <Text
            display={["none", "block"]}
            as="h4"
            variant="lg-display"
            color="black60"
            lineClamp={2}
          >
            {subTitle}
          </Text>
        )}
      </Box>

      {showViewAll && (
        <Text
          textAlign="right"
          variant={["xs", "sm-display"]}
          flexShrink={0}
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

const useReturnTo = (href?: string | null): string | null => {
  const router = useRouter()

  if (!href) return null

  const referrer = router.match?.location?.pathname

  if (!referrer) return href

  try {
    const withReferrer = new URL(href, getENV("APP_URL"))
    withReferrer.searchParams.append("returnTo", referrer)

    return withReferrer.toString()
  } catch {
    return href
  }
}
