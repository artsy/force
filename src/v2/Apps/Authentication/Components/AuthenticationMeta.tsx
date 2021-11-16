import * as React from "react"

export interface AuthenticationMetaProps {
  // FIXME: Flatten this out once old code is retired
  meta: {
    canonical?: string
    title: string
    description: string
  }
}

export const AuthenticationMeta: React.FC<AuthenticationMetaProps> = props => {
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
