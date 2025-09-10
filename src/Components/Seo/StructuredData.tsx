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
    {/* FIXME: TypeScript error after dependency update - 'tag' prop doesn't exist on Meta component, should use script tag directly */}
    <Meta
      dangerouslySetInnerHTML={dangerousHtml}
      tag="script"
      type="application/ld+json"
    />
  )
}
