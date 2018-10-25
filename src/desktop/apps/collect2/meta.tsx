import React, { Fragment } from "react"

interface Props {
  appUrl: string
  headTags: JSX.Element
}

export const Meta = (props: Props) => {
  const { headTags } = props

  const description =
    "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."

  return (
    <Fragment>
      {headTags}
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
    </Fragment>
  )
}
