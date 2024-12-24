import { Column, GridColumns } from "@artsy/palette"
import type { PartnerContacts_edges$data } from "__generated__/PartnerContacts_edges.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerContactCardFragmentContainer as PartnerContactCard } from "./PartnerContactCard"

export interface ContactRouteProps {
  edges: PartnerContacts_edges$data
}

export const PartnerContacts: React.FC<
  React.PropsWithChildren<ContactRouteProps>
> = ({ edges }) => {
  if (!edges) return null

  return (
    <GridColumns mt={4} gridRowGap={4}>
      {edges
        .filter(edge => !!edge && !!edge.node)
        .map(edge => {
          return (
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            <Column key={edge.node.id} span={12}>
              {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
              <PartnerContactCard location={edge.node} />
            </Column>
          )
        })}
    </GridColumns>
  )
}

export const PartnerContactsFragmentContainer = createFragmentContainer(
  PartnerContacts,
  {
    edges: graphql`
      fragment PartnerContacts_edges on LocationEdge @relay(plural: true) {
        node {
          id
          ...PartnerContactCard_location
        }
      }
    `,
  },
)
