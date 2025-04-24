import type {
  CreativeWork as SchemaCreativeWork,
  WithContext,
} from "schema-dts"
import { StructuredData } from "./StructuredData"

interface CreativeWorkProps {
  data: Omit<SchemaCreativeWork, "@type">
}

export const CreativeWork = ({ data }: CreativeWorkProps) => {
  const schemaData: WithContext<SchemaCreativeWork> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    ...data,
  }

  return <StructuredData schemaData={schemaData} />
}
