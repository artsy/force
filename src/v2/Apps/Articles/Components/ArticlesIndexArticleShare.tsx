import {
  Box,
  EnvelopeIcon,
  FacebookIcon,
  Flex,
  Tooltip,
  TwitterIcon,
} from "@artsy/palette"
import { FC } from "react"

interface ArticlesIndexArticleShareProps {
  description: string
  url: string
}

export const ArticlesIndexArticleShare: FC<ArticlesIndexArticleShareProps> = ({
  description,
  url,
}) => {
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
