import React, { Fragment } from "react"
import { capitalize } from "underscore.string"

interface Props {
  appUrl: string
  medium?: string
}

export const Meta = (props: Props) => {
  const { appUrl, medium } = props

  // TODO: custom page title / description based on params
  const title = medium
    ? `${capitalize(medium)} for Sale | Collect on Artsy`
    : "Collect | Artsy"
  const description = `Buy, bid, and inquire on ${medium ||
    "artworks"} on Artsy, the world’s largest online marketplace for art and design.`

  return (
    <Fragment>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />
      <meta property="og:url" content={`${appUrl}/collect`} />
      <meta property="og:image" content={`${appUrl}/images/og_image.jpg`} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
    </Fragment>
  )
}
