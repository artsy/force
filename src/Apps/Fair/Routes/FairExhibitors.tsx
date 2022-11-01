import React, { useEffect } from "react"
import { Box, Spacer, Text } from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { FairExhibitors_fair$data } from "__generated__/FairExhibitors_fair.graphql"
import { FairExhibitorsGroupFragmentContainer as FairExhibitorsGroup } from "Apps/Fair/Components/FairExhibitors"
import { getExhibitorSectionId } from "Apps/Fair/Utils/getExhibitorSectionId"
import { useRouter } from "System/Router/useRouter"
import { Jump, useJump } from "Utils/Hooks/useJump"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair$data
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair }) => {
  const { match } = useRouter()

  const { focused_exhibitor: focusedExhibitorID } = match.location.query

  const { jumpTo } = useJump()

  useEffect(() => {
    if (!focusedExhibitorID) return

    const timeout = setTimeout(() => {
      jumpTo(focusedExhibitorID)
    }, 0)

    return () => {
      clearTimeout(timeout)
    }
  }, [focusedExhibitorID, jumpTo])

  return (
    <>
      <Spacer mt={4} />

      {fair.exhibitorsGroupedByName?.map(exhibitorsGroup => {
        const { letter } = exhibitorsGroup!
        if (!exhibitorsGroup?.exhibitors?.length || !letter) {
          return null
        }

        return (
          <Jump id={getExhibitorSectionId(letter)}>
            <Box key={letter}>
              <Text variant="lg-display" my={4}>
                {letter}
              </Text>

              <FairExhibitorsGroup
                exhibitorsGroup={exhibitorsGroup}
                fair={fair}
              />
            </Box>
          </Jump>
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
        ...FairExhibitorsGroup_fair
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
