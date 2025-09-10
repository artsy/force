import { Meta } from "react-head"
import type { Graph, Thing, WithContext } from "schema-dts"

type SchemaData = WithContext<Thing> | Graph

interface StructuredDataProps {
  schemaData: SchemaData
}

export const StructuredData = ({ schemaData }: StructuredDataProps) => {
  const schemaContent = JSON.stringify(schemaData, null, 2)
  const dangerousHtml = { __html: schemaContent }

  return (
    <script
      dangerouslySetInnerHTML={dangerousHtml}
      type="application/ld+json"
    />
  )
}
