import React from "react"
import { Text } from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"
import { FairExhibitorsGroupFragmentContainer as FairExhibitorsGroup } from "../Components/FairExhibitors"
import { FairExhibitorsGroupPlaceholder } from "../Components/FairExhibitors/FairExhibitorGroupPlaceholder"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair }) => {
  const { isEnteredView, Waypoint } = useLazyLoadComponent()

  return (
    <>
      <Waypoint />

      {fair.exhibitorsGroupedByName?.map(exhibitorsGroup => {
        if (!exhibitorsGroup?.exhibitors?.length || !exhibitorsGroup.letter) {
          return null
        }

        return (
          <React.Fragment key={exhibitorsGroup.letter}>
            <Text variant="lg" my={4}>
              {exhibitorsGroup.letter}
            </Text>
            {isEnteredView ? (
              <FairExhibitorsGroup exhibitorsGroup={exhibitorsGroup} />
            ) : (
              <FairExhibitorsGroupPlaceholder />
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

export const FairExhibitorsFragmentContainer = createFragmentContainer(
  FairExhibitors,
  {
    fair: graphql`
      fragment FairExhibitors_fair on Fair {
        exhibitorsGroupedByName {
          letter
          exhibitors {
            partnerID
          }
          ...FairExhibitorsGroup_exhibitorsGroup
        }
      }
    `,
  }
)
