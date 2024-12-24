import { Text } from "@artsy/palette"
import type { PartnerContactAddress_location$data } from "__generated__/PartnerContactAddress_location.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { getContactAddressLines } from "./partnerContactUtils"

export interface PartnerContactAddressProps {
  location: PartnerContactAddress_location$data
}

export const PartnerContactAddress: React.FC<
  React.PropsWithChildren<PartnerContactAddressProps>
> = ({ location }) => {
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
  },
)
