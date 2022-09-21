import * as React from "react"
import { Text } from "@artsy/palette"
import { getContactAddressLines } from "./partnerContactUtils"
import { PartnerContactAddress_location$data } from "__generated__/PartnerContactAddress_location.graphql"
import { createFragmentContainer, graphql } from "react-relay"

export interface PartnerContactAddressProps {
  location: PartnerContactAddress_location$data
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

export const PartnerContactAddressFragmentContainer = createFragmentContainer(
  PartnerContactAddress,
  {
    location: graphql`
      fragment PartnerContactAddress_location on Location {
        city
        phone
        state
        address
        address2
        postalCode
        displayCountry
      }
    `,
  }
)
