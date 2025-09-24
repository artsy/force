import { StructuredData } from "Components/Seo/StructuredData"

export const HomeStructuredData = () => {
  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://www.artsy.net/#organization",
        name: "Artsy",
        alternateName: "Artsy.net",
        url: "https://www.artsy.net",
        description: "Artsy is the leading global online art marketplace.",
        logo: {
          "@type": "ImageObject",
          url: "https://files.artsy.net/images/artsymark-800x800.png",
          width: {
            "@type": "QuantitativeValue",
            value: 800,
            unitCode: "E37",
          },
          height: {
            "@type": "QuantitativeValue",
            value: 800,
            unitCode: "E37",
          },
        },
      }}
    />
  )
}
