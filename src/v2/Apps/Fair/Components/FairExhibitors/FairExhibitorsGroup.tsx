import React from "react"
import { Box, Column, GridColumns } from "@artsy/palette"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { FairExhibitorsGroup_partnersConnection } from "v2/__generated__/FairExhibitorsGroup_partnersConnection.graphql"
import { FairExhibitorsGroupQuery } from "v2/__generated__/FairExhibitorsGroupQuery.graphql"
import { FairExhibitorCardFragmentContainer as FairExhibitorCard } from "./FairExhibitorCard"
import { FairExhibitorsGroupPlaceholder } from "./FairExhibitorGroupPlaceholder"
import { useSystemContext } from "v2/System"

interface FairExhibitorsGroupProps {
  partnersConnection: FairExhibitorsGroup_partnersConnection
}

const FairExhibitorsGroup: React.FC<FairExhibitorsGroupProps> = ({
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
            <Column span={[12, 4, 3]}>
              <FairExhibitorCard partner={exhibitor.node} />
            </Column>
          )
        })}
      </GridColumns>
    </Box>
  )
}

const FairExhibitorsGroupFragmentContainer = createFragmentContainer(
  FairExhibitorsGroup,
  {
    partnersConnection: graphql`
      fragment FairExhibitorsGroup_partnersConnection on PartnerConnection {
        edges {
          node {
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
    <QueryRenderer<FairExhibitorsGroupQuery>
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

        // @ts-expect-error STRICT_NULL_CHECK
        return <FairExhibitorsGroupFragmentContainer {...rest} {...props} />
      }}
    />
  )
}
