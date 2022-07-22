import { StructuredData } from "./StructuredData"

export const Person = ({ data }) => {
  const schemaData = {
    "@type": "Person",
    ...data,
  }

  return <StructuredData schemaData={schemaData} />
}
