import type * as React from "react"
import type {
  LocalBusiness as SchemaLocalBusiness,
  WithContext,
} from "schema-dts"
import { StructuredData } from "./StructuredData"

interface LocalBusinessProps {
  partnerData: {
    name: string
    profile: {
      locations: Array<{
        city: string | null
        address: string | null
        address2: string | null
        postalCode: string | null
        state: string | null
        country: string | null
        coordinates: {
          lat: number | null
          lng: number | null
        } | null
      }>
    }
  }
}

type LocalBusinessAddress = {
  "@type": "PostalAddress"
  streetAddress: string
  addressLocality: string
  addressRegion?: string
  postalCode?: string
  addressCountry?: string
}

type LocalBusinessPlace = {
  "@type": "Place"
  geo: {
    "@type": "GeoCoordinates"
    latitude: number
    longitude: number
  }
}

const computeOptionalSchemaData = (
  location: LocalBusinessProps["partnerData"]["profile"]["locations"][0],
) => {
  const address: LocalBusinessAddress = {
    "@type": "PostalAddress",
    streetAddress: [location.address, location.address2]
      .filter(Boolean)
      .join(" "),
    addressLocality: location.city ?? "",
  }

  if (location.state) {
    address.addressRegion = location.state
  }

  if (location.postalCode) {
    address.postalCode = location.postalCode
  }

  if (location.country) {
    address.addressCountry = location.country
  }

  let place: LocalBusinessPlace | undefined

  if (location.coordinates?.lat && location.coordinates?.lng) {
    place = {
      "@type": "Place",
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      },
    }
  }

  return { address, place }
}

export const LocalBusinessComponent: React.FC<LocalBusinessProps> = ({
  partnerData,
}) => {
  const location = partnerData.profile.locations[0]
  if (!location) return null

  const { address, place } = computeOptionalSchemaData(location)

  const schemaData: WithContext<SchemaLocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: partnerData.name,
    address,
    ...(place && { location: place }),
  }

  return <StructuredData schemaData={schemaData} />
}

export const LocalBusiness = LocalBusinessComponent
