import React, { Fragment } from "react"

interface Props {
  appUrl: string
  headTags: JSX.Element[]
}

export const Meta = (props: Props) => {
  const { headTags } = props

  return (
    <Fragment>
      {headTags}

      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
    </Fragment>
  )
}
