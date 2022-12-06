import { Box, BoxProps, Flex, Join, Spacer } from "@artsy/palette"
import { FC } from "react"
import { useArticleTracking } from "Apps/Article/useArticleTracking"
import { getENV } from "Utils/getENV"
import TwitterIcon from "@artsy/icons/TwitterIcon"
import FacebookIcon from "@artsy/icons/FacebookIcon"
import EnvelopeIcon from "@artsy/icons/EnvelopeIcon"

interface ArticleShareProps extends BoxProps {
  description: string | null
  pathname: string | null
}

export const ArticleShare: FC<ArticleShareProps> = ({
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
          // @ts-ignore
          href={`mailto:?subject=${description}&body=Check out ${description} on Artsy: ${url}`}
          onClick={clickedArticleShare}
        >
          <EnvelopeIcon />
        </Box>

        <Box
          as="a"
          display="flex"
          title="Post to Facebook"
          // @ts-ignore
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          onClick={clickedArticleShare}
        >
          <FacebookIcon />
        </Box>

        <Box
          as="a"
          display="flex"
          title="Share on Twitter"
          // @ts-ignore
          href={`https://twitter.com/intent/tweet?original_referer=${url}&text=${description}&url=${url}&via=artsy`}
          onClick={clickedArticleShare}
        >
          <TwitterIcon />
        </Box>
      </Join>
    </Flex>
  )
}
