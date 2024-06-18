import React, { useEffect } from "react"
import { Box, Join, Spacer, Text } from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { FairExhibitors_fair$data } from "__generated__/FairExhibitors_fair.graphql"
import { FairExhibitorsGroupFragmentContainer } from "Apps/Fair/Components/FairExhibitors/FairExhibitorsGroup"
import { getExhibitorSectionId } from "Apps/Fair/Utils/getExhibitorSectionId"
import { useRouter } from "System/Hooks/useRouter"
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

  if (!fair.exhibitorsGroupedByName?.length) return null

  return (
    <>
      <Spacer y={4} />

      <Join separator={<Spacer y={4} />}>
        {fair.exhibitorsGroupedByName.map(exhibitorsGroup => {
          if (!exhibitorsGroup?.exhibitors?.length || !exhibitorsGroup.letter) {
            return null
          }

          const letter = exhibitorsGroup.letter

          return (
            <Jump id={getExhibitorSectionId(letter)}>
              <Box key={letter}>
                <Text variant="lg-display">{letter}</Text>

                <Spacer y={4} />

                <FairExhibitorsGroupFragmentContainer
                  exhibitorsGroup={exhibitorsGroup}
                  fair={fair}
                />
              </Box>
            </Jump>
          )
        })}
      </Join>
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
          ...FairExhibitorsGroup_exhibitorsGroup
          letter
          exhibitors {
            partnerID
          }
        }
      }
    `,
  }
)
