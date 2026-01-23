import { Box, Join, Spacer, Text } from "@artsy/palette"
import { FairExhibitorsGroupFragmentContainer } from "Apps/Fair/Components/FairExhibitors/FairExhibitorsGroup"
import { getExhibitorSectionId } from "Apps/Fair/Utils/getExhibitorSectionId"
import { useRouter } from "System/Hooks/useRouter"
import { Jump, useJump } from "Utils/Hooks/useJump"
import type { FairExhibitors_fair$data } from "__generated__/FairExhibitors_fair.graphql"
import type React from "react"
import { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair$data
}

const FairExhibitors: React.FC<
  React.PropsWithChildren<FairExhibitorsProps>
> = ({ fair }) => {
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
      <Spacer y={4} />

      <Join separator={<Spacer y={4} />}>
        {fair.exhibitorsGroupedByName?.map(exhibitorsGroup => {
          if (!exhibitorsGroup?.exhibitors?.length || !exhibitorsGroup.letter) {
            return null
          }

          const letter = exhibitorsGroup.letter

          return (
            <Jump key={letter} id={getExhibitorSectionId(letter)}>
              <Box>
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
  },
)
