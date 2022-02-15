import {
  Box,
  EnvelopeIcon,
  FacebookIcon,
  Flex,
  Tooltip,
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
      <Tooltip content="Share via email">
        <Box
          as="a"
          display="flex"
          aria-label="Share via email"
          mr={1}
          // @ts-ignore
          href={`mailto:?subject=${description}&body=Check out ${description} on Artsy: ${url}`}
        >
          <EnvelopeIcon title="" />
        </Box>
      </Tooltip>

      <Tooltip content="Post to Facebook">
        <Box
          as="a"
          display="flex"
          aria-label="Post to Facebook"
          mr={1}
          // @ts-ignore
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        >
          <FacebookIcon title="" />
        </Box>
      </Tooltip>

      <Tooltip content="Share on Twitter">
        <Box
          as="a"
          display="flex"
          aria-label="Share on Twitter"
          mr={1}
          // @ts-ignore
          href={`https://twitter.com/intent/tweet?original_referer=${url}&text=${description}&url=${url}&via=artsy`}
        >
          <TwitterIcon title="" />
        </Box>
      </Tooltip>
    </Flex>
  )
}
