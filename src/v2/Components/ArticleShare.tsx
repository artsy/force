import {
  Box,
  EnvelopeIcon,
  FacebookIcon,
  Flex,
  TwitterIcon,
} from "@artsy/palette"
import { FC } from "react"
import { getENV } from "v2/Utils/getENV"

interface ArticleShareProps {
  description: string | null
  pathname: string | null
}

export const ArticleShare: FC<ArticleShareProps> = ({
  description: _description,
  pathname,
}) => {
  const description = _description ?? "Artsy Editorial"
  const url = [
    getENV("APP_URL"),
    pathname && pathname.startsWith("/") ? pathname : `/${pathname || ""}`,
  ].join("")

  return (
    <Flex>
      <Box
        as="a"
        display="flex"
        title="Share via email"
        mr={1}
        // @ts-ignore
        href={`mailto:?subject=${description}&body=Check out ${description} on Artsy: ${url}`}
      >
        <EnvelopeIcon title="" />
      </Box>

      <Box
        as="a"
        display="flex"
        title="Post to Facebook"
        mr={1}
        // @ts-ignore
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      >
        <FacebookIcon title="" />
      </Box>

      <Box
        as="a"
        display="flex"
        title="Share on Twitter"
        mr={1}
        // @ts-ignore
        href={`https://twitter.com/intent/tweet?original_referer=${url}&text=${description}&url=${url}&via=artsy`}
      >
        <TwitterIcon title="" />
      </Box>
    </Flex>
  )
}
