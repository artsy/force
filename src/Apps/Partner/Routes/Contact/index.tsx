import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Contact_partner$data } from "__generated__/Contact_partner.graphql"
import { Box, Text } from "@artsy/palette"
import { PartnerContactsFragmentContainer } from "Apps/Partner/Components/PartnerContacts/PartnerContacts"

export interface ContactRouteProps {
  partner: Contact_partner$data
}

export const ContactRoute: React.FC<ContactRouteProps> = ({ partner }) => {
  return (
    <Box mt={[4, 6]}>
      <Text variant="lg-display">Locations</Text>
      <PartnerContactsFragmentContainer
        edges={partner.locations?.edges as any}
      />
    </Box>
  )
}

export const ContactRouteFragmentContainer = createFragmentContainer(
  ContactRoute,
  {
    partner: graphql`
      fragment Contact_partner on Partner {
        locations: locationsConnection(first: 50) {
          edges {
            ...PartnerContacts_edges
          }
        }
      }
    `,
  }
)
