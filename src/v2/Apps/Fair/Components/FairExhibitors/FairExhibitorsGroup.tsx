import React from "react"
import { Column, GridColumns } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitorsGroup_exhibitorsGroup } from "v2/__generated__/FairExhibitorsGroup_exhibitorsGroup.graphql"
import { FairExhibitorCardFragmentContainer as FairExhibitorCard } from "./FairExhibitorCard"

interface FairExhibitorsGroupProps {
  exhibitorsGroup: FairExhibitorsGroup_exhibitorsGroup
}

export const FairExhibitorsGroup: React.FC<FairExhibitorsGroupProps> = ({
  exhibitorsGroup: { exhibitors },
}) => {
  return (
    <GridColumns position="relative" gridRowGap={4}>
      {exhibitors?.map(exhibitor => {
        if (!exhibitor?.partner) {
          return null
        }

        return (
          <Column key={exhibitor.partner.internalID} span={[12, 6, 3]}>
            <FairExhibitorCard partner={exhibitor.partner} />
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
            ...FairExhibitorCard_partner
          }
        }
      }
    `,
  }
)
