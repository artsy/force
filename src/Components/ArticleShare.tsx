import { useArticleTracking } from "Apps/Article/useArticleTracking"
import { getENV } from "Utils/getENV"
import EnvelopeIcon from "@artsy/icons/EnvelopeIcon"
import FacebookIcon from "@artsy/icons/FacebookIcon"
import XIcon from "@artsy/icons/XIcon"
import { Box, type BoxProps, Flex, Join, Spacer } from "@artsy/palette"
import type { FC } from "react"

interface ArticleShareProps extends BoxProps {
  description: string | null | undefined
  pathname: string | null | undefined
}

export const ArticleShare: FC<React.PropsWithChildren<ArticleShareProps>> = ({
  description: _description,
  pathname,
  ...rest
}) => {
  const { clickedArticleShare } = useArticleTracking()

  const description = _description ?? "Artsy Editorial"
  const url = [
    getENV("APP_URL"),
    pathname && pathname.startsWith("/") ? pathname : `/${pathname || ""}`,
  ].join("")

  return (
    <Flex {...rest}>
      <Join separator={<Spacer x={2} />}>
        <Box
          as="a"
          display="flex"
          title="Share via email"
          // @ts-expect-error
          href={`mailto:?subject=${description}&body=Check out ${description} on Artsy: ${url}`}
          onClick={clickedArticleShare}
        >
          <EnvelopeIcon />
        </Box>

        <Box
          as="a"
          display="flex"
          title="Post to Facebook"
          // @ts-expect-error
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          onClick={clickedArticleShare}
        >
          <FacebookIcon />
        </Box>

        <Box
          as="a"
          display="flex"
          title="Share on X"
          // @ts-expect-error
          href={`https://twitter.com/intent/post?original_referer=${url}&text=${description}&url=${url}&via=artsy`}
          onClick={clickedArticleShare}
        >
          <XIcon />
        </Box>
      </Join>
    </Flex>
  )
}
