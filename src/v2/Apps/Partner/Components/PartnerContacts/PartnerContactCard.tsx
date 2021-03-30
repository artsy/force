import React from "react"
import { Column, GridColumns } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerContactAddress } from "./PartnerContactAddress"
import { PartnerContactMap } from "./PartnerContactMap"
import { PartnerContactCard_location } from "v2/__generated__/PartnerContactCard_location.graphql"

export interface PartnerContactCardProps {
  location: PartnerContactCard_location
}

export const PartnerContactCard: React.FC<PartnerContactCardProps> = ({
  location,
}) => {
  return (
    <GridColumns gridRowGap={2}>
      <Column span={[12, 6]}>
        <PartnerContactAddress location={location} />
      </Column>
      <Column span={[12, 6]}>
        <PartnerContactMap location={location} />
      </Column>
    </GridColumns>
  )
}

export const PartnerContactCardFragmentContainer = createFragmentContainer(
  PartnerContactCard,
  {
    location: graphql`
      fragment PartnerContactCard_location on Location {
        city
        phone
        state
        country
        address
        address2
        postalCode
        coordinates {
          lat
          lng
        }
      }
    `,
  }
)
