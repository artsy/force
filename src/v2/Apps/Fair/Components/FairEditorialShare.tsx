import {
  Box,
  BoxProps,
  EnvelopeIcon,
  FacebookIcon,
  TwitterIcon,
} from "@artsy/palette"
import React from "react"

interface FairEditorialShareProps extends BoxProps {
  subject: string
  url: string
}

export const FairEditorialShare: React.FC<FairEditorialShareProps> = ({
  subject,
  url,
  ...rest
}) => (
  <Box display="flex" alignItems="center" {...rest}>
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      target="_blank"
      rel="noopener"
    >
      <FacebookIcon title="Post this article to Facebook" mr={0.5} />
    </a>

    <a
      href={`mailto:?subject=${subject}&amp;body=Check out ${subject} on Artsy: ${url}`}
    >
      <EnvelopeIcon title="Share this article via email" mr={0.5} />
    </a>

    <a
      href={`https://twitter.com/intent/tweet?original_referer=${url}&amp;text=${subject}&amp;url=${url}&amp;via=artsy`}
      target="_blank"
      rel="noopener"
    >
      <TwitterIcon title="Share this article on Twitter" />
    </a>
  </Box>
)
