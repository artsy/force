import { StructuredData } from "./StructuredData"

export const Product = ({ data }) => {
  const schemaData = {
    "@type": "Product",
    ...data,
  }

  return <StructuredData schemaData={schemaData} />
}
