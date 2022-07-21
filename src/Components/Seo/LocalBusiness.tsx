import * as React from "react";
import { StructuredData } from "./StructuredData"
import { identity, pickBy } from "lodash"

interface PostalAddressSchemaData {
  "@type": string
  addressCountry: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  streetAddress: string
  telephone: string
}

interface PlaceSchemaData {
  "@type": string
  latitude: number
  longitude: number
}

interface LocalBusinessSchemaData {
  "@type": string
  address?: PostalAddressSchemaData
  legalName: string
  location?: PlaceSchemaData
  name: string
}

export const computeOptionalSchemaData = partnerLocation => {
  let address: PostalAddressSchemaData | undefined
  let location: PlaceSchemaData | undefined

  if (partnerLocation) {
    const {
      address: address1,
      address2,
      city,
      coordinates,
      country,
      phone,
      postalCode,
      state,
    } = partnerLocation

    const streetAddress = [address1, address2].filter(Boolean).join(", ")

    const addressParts = {
      "@type": "PostalAddress",
      addressCountry: country,
      addressLocality: city,
      addressRegion: state,
      postalCode: postalCode,
      streetAddress,
      telephone: phone,
    }

    address = pickBy(addressParts, identity) as PostalAddressSchemaData

    if (coordinates?.lat && coordinates?.lng) {
      location = {
        "@type": "Place",
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      }
    }
  }

  return { address, location }
}

interface LocalBusinessProps {
  partnerLocation
  partnerName
}

export const LocalBusiness: React.FC<LocalBusinessProps> = props => {
  const { partnerLocation, partnerName } = props

  const schemaData: LocalBusinessSchemaData = {
    "@type": "LocalBusiness",
    legalName: partnerName,
    name: partnerName,
  }

  const { address, location } = computeOptionalSchemaData(partnerLocation)

  if (address) {
    schemaData.address = address
  }

  if (location) {
    schemaData.location = location
  }

  return <StructuredData schemaData={schemaData} />
}
