import { DESCRIPTION } from "Apps/About/AboutApp"
import { StructuredData } from "Components/Seo/StructuredData"
import { DOWNLOAD_APP_URLS, Device } from "Utils/Hooks/useDeviceDetection"
import { FACTS_AND_FIGURES } from "Utils/factsAndFigures"
import type { Organization } from "schema-dts"

export const ORGANIZATION_STUB_SCHEMA: Organization = {
  "@id": "https://www.artsy.net/#organization",
  "@type": "Organization",
  name: "Artsy",
  alternateName: "Artsy.net",
  url: "https://www.artsy.net",
  description: DESCRIPTION,
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
}

export const AboutStructuredData = () => {
  return (
    <>
      <StructuredData
        schemaData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Artsy",
          url: "https://www.artsy.net",
          applicationCategory: ["LifestyleApplication", "ShoppingApplication"],
          operatingSystem: "Web",
          browserRequirements: "Requires JavaScript",
          description: DESCRIPTION,
          downloadUrl: [
            DOWNLOAD_APP_URLS[Device.iPhone],
            DOWNLOAD_APP_URLS[Device.Android],
          ],
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            category: "free",
          },
          inLanguage: "en",
          author: ORGANIZATION_STUB_SCHEMA,
          hasPart: [
            {
              "@type": "MobileApplication",
              name: "Artsy",
              operatingSystem: "iOS 16.6 or later",
              applicationCategory: [
                "LifestyleApplication",
                "ShoppingApplication",
              ],
              downloadUrl: DOWNLOAD_APP_URLS[Device.iPhone],
              installUrl: DOWNLOAD_APP_URLS[Device.iPhone],
              contentRating: "17+",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                category: "free",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ...FACTS_AND_FIGURES.iosApp,
              },
            },
            {
              "@type": "MobileApplication",
              name: "Artsy",
              operatingSystem: "Android 7 or later",
              applicationCategory: [
                "LifestyleApplication",
                "ShoppingApplication",
              ],
              downloadUrl: DOWNLOAD_APP_URLS[Device.Android],
              installUrl: DOWNLOAD_APP_URLS[Device.Android],
              contentRating: "Teen",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                category: "free",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ...FACTS_AND_FIGURES.androidApp,
              },
            },
          ],
        }}
      />

      <StructuredData
        schemaData={{
          "@context": "https://schema.org",
          ...ORGANIZATION_STUB_SCHEMA,
          foundingDate: "2009",
          foundingLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "New York",
              addressRegion: "NY",
              addressCountry: "US",
            },
          },
          founders: [
            {
              "@type": "Person",
              name: "Carter Cleveland",
              jobTitle: "Founder",
              sameAs: "https://www.linkedin.com/in/cartercleveland",
            },
          ],
          employees: [
            {
              "@type": "Person",
              name: "Jeffrey Yin",
              jobTitle: "Chief Executive Officer",
              sameAs: "https://www.linkedin.com/in/jeffreyjyin/",
            },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "401 Broadway",
            addressLocality: "New York",
            addressRegion: "NY",
            postalCode: "10013",
            addressCountry: "US",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "support@artsy.net",
              contactType: "customer support",
            },
          ],
          brand: {
            "@type": "Brand",
            name: "Artsy",
            logo: "https://files.artsy.net/images/og_image.jpeg",
            slogan: "Discover and Buy Fine Art",
          },
          sameAs: [
            "https://www.instagram.com/artsy",
            "https://x.com/artsy",
            "https://www.linkedin.com/company/artsyinc/",
            "https://www.facebook.com/artsy",
            "https://www.youtube.com/artsy",
            "https://www.threads.com/@artsy",
            "https://www.tiktok.com/@artsy",
            "https://www.pinterest.com/artsy/",
            "https://soundcloud.com/artsypodcast",
            "https://podcasts.apple.com/us/podcast/the-artsy-podcast/id1096194516",
            "https://open.spotify.com/show/3Wc2AVcebdEf0yC7NoFQgt",
            DOWNLOAD_APP_URLS[Device.iPhone],
            DOWNLOAD_APP_URLS[Device.Android],
            "https://en.wikipedia.org/wiki/Artsy_(website)",
            "https://github.com/artsy",
            "https://artsy.github.io/",
          ],
          keywords:
            "online art, art marketplace, buy art, art auctions, contemporary art, art galleries, emerging artists",
          knowsAbout: [
            "Contemporary Art",
            "Fine Art Auctions",
            "Art Galleries",
            "Emerging Artists",
            "Art Market Trends",
          ],
        }}
      />
    </>
  )
}
