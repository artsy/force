import React from "react"
import { Column, GridColumns } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitorsGroup_exhibitorsGroup$data } from "__generated__/FairExhibitorsGroup_exhibitorsGroup.graphql"
import { FairExhibitorsGroup_fair$data } from "__generated__/FairExhibitorsGroup_fair.graphql"
import { FairExhibitorCardFragmentContainer as FairExhibitorCard } from "./FairExhibitorCard"
import { Jump } from "Utils/Hooks/useJump"

interface FairExhibitorsGroupProps {
  exhibitorsGroup: FairExhibitorsGroup_exhibitorsGroup$data
  fair: FairExhibitorsGroup_fair$data
}

export const FairExhibitorsGroup: React.FC<FairExhibitorsGroupProps> = ({
  exhibitorsGroup: { exhibitors },
  fair,
}) => {
  return (
    <GridColumns position="relative" gridRowGap={4} gridColumnGap={[0, 6]}>
      {exhibitors?.map(exhibitor => {
        if (!exhibitor?.partner) return null

        return (
          <Column key={exhibitor.partner.internalID} span={[12, 6, 3]}>
            <Jump id={exhibitor.partner.internalID}>
              <FairExhibitorCard exhibitor={exhibitor} fair={fair} />
            </Jump>
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
          ...FairExhibitorCard_exhibitor
          partner {
            internalID
          }
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
