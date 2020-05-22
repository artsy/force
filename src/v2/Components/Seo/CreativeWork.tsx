import React from "react"
import { Meta } from "react-head"

export const CreativeWork = ({ data }) => {
  return (
    <Meta
      tag="script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "CreativeWork",
          ...data,
        }),
      }}
    />
  )
}
