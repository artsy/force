import { compact } from "lodash"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import qs from "qs"
import { PartnerContactMap_location$data } from "__generated__/PartnerContactMap_location.graphql"
import { PartnerContactAddress_location$data } from "__generated__/PartnerContactAddress_location.graphql"

export function getContactAddressLines(
  location:
    | PartnerContactMap_location$data
    | PartnerContactAddress_location$data
) {
  if (!location) return []

  return compact([
    location.address?.trim(),
    location.address2?.trim(),
    compact([
      compact([location.city?.trim(), location.state?.trim()]).join(", "),
      location.postalCode?.trim(),
    ]).join(" "),
    location.displayCountry,
  ])
}

export function getGoogleMapUrl(location: PartnerContactMap_location$data) {
  if (!location) return null

  const locationString = location.coordinates
    ? `${location.coordinates.lat},${location.coordinates.lng}`
    : getContactAddressLines(location).join(", ")

  if (!locationString) return null

  const options = {
    q: locationString,
    hnear: !location.coordinates ? locationString : undefined,
  }

  return `https://maps.google.com/maps?${qs.stringify(options)}`
}

export function getGoogleStaticMapImageUrl(
  location: PartnerContactMap_location$data,
  width: number = 480,
  height: number = 480
) {
  if (!location) return null

  const locationString = location.coordinates
    ? `${location.coordinates.lat},${location.coordinates.lng}`
    : getContactAddressLines(location).join(", ")

  if (!locationString) return null

  const options = {
    maptype: "roadmap",
    sensor: false,
    style: "lightness:50|saturation:-100",
    scale: 1,
    zoom: 16,
    size: `${width}x${height}`,
    center: locationString,
    markers: `color:0x873ff0|${locationString}`,
    key: sd.PUBLIC_GOOGLE_MAPS_API_KEY
      ? sd.PUBLIC_GOOGLE_MAPS_API_KEY
      : undefined,
  }

  return `https://maps.googleapis.com/maps/api/staticmap?${qs.stringify(
    options
  )}`
}
