import * as React from "react";

interface MetaProps {
  meta: {
    canonical?: string
    title: string
    description: string
  }
}

export const AuthenticationMeta: React.SFC<MetaProps> = props => {
  const {
    meta: { canonical, description, title },
  } = props

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Don't index or follow links on this page */}
      <meta name="robots" content="none" />
    </>
  )
}
