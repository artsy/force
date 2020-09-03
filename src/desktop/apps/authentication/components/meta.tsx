import React from "react"

interface MetaProps {
  meta: {
    title: string
    description: string
  }
}

export const AuthenticationMeta: React.SFC<MetaProps> = props => {
  const {
    meta: { description, title },
  } = props

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />
      {/* Don't index or follow links on this page */}
      <meta name="robots" content="none" />
    </>
  )
}
