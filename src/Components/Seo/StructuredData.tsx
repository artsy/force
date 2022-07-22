import { Meta } from "react-head"

export const StructuredData = props => {
  const schemaData = {
    "@context": "http://schema.org",
    ...props.schemaData,
  }

  const schemaContent = JSON.stringify(schemaData, null, 2)
  const dangerousHtml = { __html: schemaContent }

  return (
    <Meta
      dangerouslySetInnerHTML={dangerousHtml}
      tag="script"
      type="application/ld+json"
    />
  )
}
