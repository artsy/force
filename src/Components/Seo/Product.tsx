import type { Product as SchemaProduct, WithContext } from "schema-dts"
import { StructuredData } from "./StructuredData"

interface ProductProps {
  data: Omit<SchemaProduct, "@type">
}

export const Product = ({ data }: ProductProps) => {
  const schemaData: WithContext<SchemaProduct> = {
    "@context": "https://schema.org",
    "@type": "Product",
    ...data,
  }

  return <StructuredData schemaData={schemaData} />
}
