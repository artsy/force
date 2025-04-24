import type { Person as SchemaPerson, WithContext } from "schema-dts"
import { StructuredData } from "./StructuredData"

interface PersonProps {
  data: Omit<SchemaPerson, "@type">
}

export const Person = ({ data }: PersonProps) => {
  const schemaData: WithContext<SchemaPerson> = {
    "@context": "https://schema.org",
    "@type": "Person",
    ...data,
  }

  return <StructuredData schemaData={schemaData} />
}
