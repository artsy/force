import { Meta } from "react-head"
import type { Graph, Thing, WithContext } from "schema-dts"

type SchemaData = WithContext<Thing> | Graph

interface StructuredDataProps {
  schemaData: SchemaData
}

export const StructuredData = ({ schemaData }: StructuredDataProps) => {
  // `JSON.stringify` does not escape `<`, and this string is injected into a
  // `<script>` tag. A stored value containing `</script>` would close the tag
  // early and run whatever followed it. `\u003c` is a valid JSON escape, so
  // parsers still read the same string.
  const schemaContent = JSON.stringify(schemaData, null, 2).replace(
    /</g,
    "\\u003c",
  )
  const dangerousHtml = { __html: schemaContent }

  return (
    <Meta
      dangerouslySetInnerHTML={dangerousHtml}
      tag="script"
      type="application/ld+json"
    />
  )
}
