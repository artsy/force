import React from "react"
import { Text } from "@artsy/palette"
import { getContactAddressLines } from "./partnerContactUtils"
import { PartnerContactCard_location } from "v2/__generated__/PartnerContactCard_location.graphql"

export interface PartnerContactAddressProps {
  location: PartnerContactCard_location
}

export const PartnerContactAddress: React.FC<PartnerContactAddressProps> = ({
  location,
}) => {
  const addressLines = getContactAddressLines(location)

  return (
    <>
      {addressLines.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
      {location.phone && <Text mt={1}>{`Tel: ${location.phone?.trim()}`}</Text>}
    </>
  )
}
