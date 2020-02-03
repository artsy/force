import React from "react"

interface FairWeekMetaProps {
  meta: {
    title: string
    description: string
  }
}

export const FairWeekMeta: React.SFC<FairWeekMetaProps> = props => {
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
    </>
  )
}
