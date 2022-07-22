import { StructuredData } from "./StructuredData"

export const CreativeWork = ({ data }) => {
  const schemaData = {
    "@type": "CreativeWork",
    ...data,
  }

  return <StructuredData schemaData={schemaData} />
}
