import {
  Box,
  BoxProps,
  EnvelopeIcon,
  FacebookIcon,
  Flex,
  Join,
  Spacer,
  TwitterIcon,
} from "@artsy/palette"
import { FC } from "react"
import { useArticleTracking } from "v2/Apps/Article/useArticleTracking"
import { getENV } from "v2/Utils/getENV"

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
      <Join separator={<Spacer ml={2} />}>
        <Box
          as="a"
          display="flex"
          title="Share via email"
          // @ts-ignore
          href={`mailto:?subject=${description}&body=Check out ${description} on Artsy: ${url}`}
          onClick={clickedArticleShare}
        >
          <EnvelopeIcon title="" />
        </Box>

        <Box
          as="a"
          display="flex"
          title="Post to Facebook"
          // @ts-ignore
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          onClick={clickedArticleShare}
        >
          <FacebookIcon title="" />
        </Box>

        <Box
          as="a"
          display="flex"
          title="Share on Twitter"
          // @ts-ignore
          href={`https://twitter.com/intent/tweet?original_referer=${url}&text=${description}&url=${url}&via=artsy`}
          onClick={clickedArticleShare}
        >
          <TwitterIcon title="" />
        </Box>
      </Join>
    </Flex>
  )
}
