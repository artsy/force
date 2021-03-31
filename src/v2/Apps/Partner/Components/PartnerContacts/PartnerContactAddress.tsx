import React from "react"
import { Text } from "@artsy/palette"
import { getContactAddressLines } from "./partnerContactUtils"
import { PartnerContactAddress_location } from "v2/__generated__/PartnerContactAddress_location.graphql"
import { createFragmentContainer, graphql } from "react-relay"

export interface PartnerContactAddressProps {
  location: PartnerContactAddress_location
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

graphql`
  fragment PartnerContactAddress_Fragment on Location {
    city
    phone
    state
    country
    address
    address2
    postalCode
  }
`

export const PartnerContactAddressFragmentContainer = createFragmentContainer(
  PartnerContactAddress,
  {
    location: graphql`
      fragment PartnerContactAddress_location on Location {
        ...PartnerContactAddress_Fragment @relay(mask: false)
      }
    `,
  }
)
