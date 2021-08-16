import React from "react"
import { Box, Column, GridColumns } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitorsGroup_partnersConnection } from "v2/__generated__/FairExhibitorsGroup_partnersConnection.graphql"
import { FairExhibitorsGroupQuery } from "v2/__generated__/FairExhibitorsGroupQuery.graphql"
import { FairExhibitorCardFragmentContainer as FairExhibitorCard } from "./FairExhibitorCard"
import { FairExhibitorsGroupPlaceholder } from "./FairExhibitorGroupPlaceholder"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

interface FairExhibitorsGroupProps {
  partnersConnection: FairExhibitorsGroup_partnersConnection
}

export const FairExhibitorsGroup: React.FC<FairExhibitorsGroupProps> = ({
  partnersConnection,
}) => {
  return (
    <Box>
      <GridColumns position="relative">
        {partnersConnection?.edges?.map(exhibitor => {
          if (!exhibitor?.node) {
            return null
          }

          return (
            <Column key={exhibitor.node.internalID} span={[12, 6, 3]}>
              <FairExhibitorCard partner={exhibitor.node} />
            </Column>
          )
        })}
      </GridColumns>
    </Box>
  )
}

export const FairExhibitorsGroupFragmentContainer = createFragmentContainer(
  FairExhibitorsGroup,
  {
    partnersConnection: graphql`
      fragment FairExhibitorsGroup_partnersConnection on PartnerConnection {
        edges {
          node {
            internalID
            ...FairExhibitorCard_partner
          }
        }
      }
    `,
  }
)

export const FairExhibitorsGroupQueryRenderer: React.FC<{
  ids: string[]
}> = ({ ids, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  if (!relayEnvironment) {
    return null
  }

  return (
    <SystemQueryRenderer<FairExhibitorsGroupQuery>
      environment={relayEnvironment}
      query={graphql`
        query FairExhibitorsGroupQuery($ids: [String!]) {
          partnersConnection(ids: $ids) {
            ...FairExhibitorsGroup_partnersConnection
          }
        }
      `}
      variables={{ ids }}
      render={({ error, props }) => {
        if (error || !props) {
          return <FairExhibitorsGroupPlaceholder />
        }

        return (
          <FairExhibitorsGroupFragmentContainer {...rest} {...(props as any)} />
        )
      }}
    />
  )
}
