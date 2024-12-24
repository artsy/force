import { Column, GridColumns } from "@artsy/palette"
import { Jump } from "Utils/Hooks/useJump"
import type { FairExhibitorsGroup_exhibitorsGroup$data } from "__generated__/FairExhibitorsGroup_exhibitorsGroup.graphql"
import type { FairExhibitorsGroup_fair$data } from "__generated__/FairExhibitorsGroup_fair.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitorCardFragmentContainer as FairExhibitorCard } from "./FairExhibitorCard"

interface FairExhibitorsGroupProps {
  exhibitorsGroup: FairExhibitorsGroup_exhibitorsGroup$data
  fair: FairExhibitorsGroup_fair$data
}

export const FairExhibitorsGroup: React.FC<
  React.PropsWithChildren<FairExhibitorsGroupProps>
> = ({ exhibitorsGroup: { exhibitors }, fair }) => {
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
  },
)
