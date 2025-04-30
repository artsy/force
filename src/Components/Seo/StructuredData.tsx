import { Meta } from "react-head"
import type { Thing, WithContext } from "schema-dts"

interface StructuredDataProps<T extends Thing> {
  schemaData: WithContext<T>
}

export const StructuredData = <T extends Thing>({
  schemaData,
}: StructuredDataProps<T>) => {
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
