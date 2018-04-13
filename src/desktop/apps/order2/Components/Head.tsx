import React, { Fragment, SFC } from 'react'

interface Props {}

export const Head: SFC<Props> = (_props) => {
  return (
    <Fragment>
      <title>TODO TITLE</title>
      <meta property="og:title" />
      <meta name="description" />
      <meta property="og:description" />
      <meta property="twitter:description" />
      <meta property="og:url" content="TODO Route url" />
      <link rel="canonical" href="TODO App url" />
      <meta property="og:type" content="website" />
      <meta property="og:event" content="auction" />
      <meta property="twitter:card" content="summary" />
      <meta name="fragment" content="!" />
    </Fragment>
  )
}
