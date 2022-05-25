import React from "react"
import { Column, GridColumns } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitorsGroup_exhibitorsGroup } from "v2/__generated__/FairExhibitorsGroup_exhibitorsGroup.graphql"
import { FairExhibitorsGroup_fair } from "v2/__generated__/FairExhibitorsGroup_fair.graphql"
import { FairExhibitorCardFragmentContainer as FairExhibitorCard } from "./FairExhibitorCard"

interface FairExhibitorsGroupProps {
  exhibitorsGroup: FairExhibitorsGroup_exhibitorsGroup
  fair: FairExhibitorsGroup_fair
}

export const FairExhibitorsGroup: React.FC<FairExhibitorsGroupProps> = ({
  exhibitorsGroup: { exhibitors },
  fair,
}) => {
  return (
    <GridColumns position="relative" gridRowGap={4} gridColumnGap={[0, 6]}>
      {exhibitors?.map(exhibitor => {
        if (!exhibitor?.partner) {
          return null
        }

        return (
          <Column key={exhibitor.partner.internalID} span={[12, 6, 3]}>
            <FairExhibitorCard exhibitor={exhibitor} fair={fair} />
          </Column>
        )
      })}
    </GridColumns>
  )
}

export const FairExhibitorsGroupFragmentContainer = createFragmentContainer(
  FairExhibitorsGroup,
  {
    exhibitorsGroup: graphql`
      fragment FairExhibitorsGroup_exhibitorsGroup on FairExhibitorsGroup {
        exhibitors {
          partner {
            internalID
          }
          ...FairExhibitorCard_exhibitor
        }
      }
    `,
    fair: graphql`
      fragment FairExhibitorsGroup_fair on Fair {
        ...FairExhibitorCard_fair
      }
    `,
  }
)
