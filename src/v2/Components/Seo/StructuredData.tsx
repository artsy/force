import React from "react"
import { Meta } from "react-head"

export const StructuredData = props => {
  const schemaData = {
    "@context": "http://schema.org",
    ...props.schemaData,
  }

  const schemaContent = JSON.stringify(schemaData, null, 2)

  return (
    <Meta tag="script" type="application/ld+json">
      {schemaContent}
    </Meta>
  )
}
