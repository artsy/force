import * as React from "react"
import { Column, GridColumns } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerContactAddressFragmentContainer as PartnerContactAddress } from "./PartnerContactAddress"
import { PartnerContactMapFragmentContainer as PartnerContactMap } from "./PartnerContactMap"
import { PartnerContactCard_location$data } from "__generated__/PartnerContactCard_location.graphql"

export interface PartnerContactCardProps {
  location: PartnerContactCard_location$data
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
        ...PartnerContactAddress_location
        ...PartnerContactMap_location
      }
    `,
  }
)
