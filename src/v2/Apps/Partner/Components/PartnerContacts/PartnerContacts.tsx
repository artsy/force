import React from "react"
import { PartnerContacts_edges } from "v2/__generated__/PartnerContacts_edges.graphql"
import { Column, GridColumns } from "@artsy/palette"
import { PartnerContactCardFragmentContainer as PartnerContactCard } from "./PartnerContactCard"
import { createFragmentContainer, graphql } from "react-relay"

export interface ContactRouteProps {
  edges: PartnerContacts_edges
}

export const PartnerContacts: React.FC<ContactRouteProps> = ({ edges }) => {
  if (!edges) return null

  return (
    <GridColumns mt={4} gridRowGap={4}>
      {edges
        .filter(edge => !!edge && !!edge.node)
        .map(edge => {
          return (
            <Column key={edge.node.id} span={12}>
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
  }
)
