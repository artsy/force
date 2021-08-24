import React from "react"
import { Box, Spacer, Text } from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"
import { FairExhibitorsGroupFragmentContainer as FairExhibitorsGroup } from "../Components/FairExhibitors"
import { FairExhibitorsGroupPlaceholder } from "../Components/FairExhibitors/FairExhibitorGroupPlaceholder"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"
import { ExhibitorsLetterNavFragmentContainer as ExhibitorsLetterNav } from "../Components/ExhibitorsLetterNav"
import { Sticky } from "v2/Components/Sticky"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair }) => {
  const { isEnteredView, Waypoint } = useLazyLoadComponent()

  return (
    <>
      <Waypoint />

      <Spacer mt={4} />

      <Sticky mx={[0, 4]}>
        <ExhibitorsLetterNav fair={fair} />
      </Sticky>

      {fair.exhibitorsGroupedByName?.map(exhibitorsGroup => {
        const { letter } = exhibitorsGroup!
        if (!exhibitorsGroup?.exhibitors?.length || !letter) {
          return null
        }

        return (
          <Box key={letter} id={`jump--letter${letter}`}>
            <Text variant="lg" my={4}>
              {letter}
            </Text>
            {isEnteredView ? (
              <FairExhibitorsGroup exhibitorsGroup={exhibitorsGroup} />
            ) : (
              <FairExhibitorsGroupPlaceholder />
            )}
          </Box>
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
        ...ExhibitorsLetterNav_fair
      }
    `,
  }
)
