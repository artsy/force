import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay"
import { Contact_partner } from "v2/__generated__/Contact_partner.graphql"
import { Box, Text } from "@artsy/palette"
import { PartnerContactsFragmentContainer as PartnerContacts } from "../../Components/PartnerContacts"

export interface ContactRouteProps {
  partner: Contact_partner
}

export const ContactRoute: React.FC<ContactRouteProps> = ({ partner }) => {
  return (
    <Box mt={[4, 6]}>
      <Text variant="title">Locations</Text>
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      <PartnerContacts edges={partner.locations.edges} />
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
