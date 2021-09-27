import React, { useEffect } from "react"
import { Box, DROP_SHADOW, FullBleed, Spacer, Text } from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"
import { FairExhibitorsGroupFragmentContainer as FairExhibitorsGroup } from "../Components/FairExhibitors"
import { ExhibitorsLetterNavFragmentContainer as ExhibitorsLetterNav } from "../Components/ExhibitorsLetterNav"
import { Sticky } from "v2/Components/Sticky"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { getExhibitorSectionId } from "../Utils/getExhibitorSectionId"
import { useRouter } from "v2/System/Router/useRouter"
import { useExhibitorsTabOffset } from "../Utils/useExhibitorsTabOffset"
import { scrollIntoView } from "v2/Utils/scrollHelpers"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair }) => {
  const { match } = useRouter()
  const { focused_exhibitor: focusedExhibitorID } = match.location.query
  const offset = useExhibitorsTabOffset()

  useEffect(() => {
    if (focusedExhibitorID) {
      scrollIntoView({
        selector: `#jump--${focusedExhibitorID}`,
        offset,
        behavior: "smooth",
      })
    }
  }, [focusedExhibitorID, offset])

  return (
    <>
      <Spacer mt={4} />

      <Sticky>
        {({ stuck }) => (
          <FullBleed style={stuck ? { boxShadow: DROP_SHADOW } : undefined}>
            <AppContainer>
              <HorizontalPadding>
                <ExhibitorsLetterNav fair={fair} />
              </HorizontalPadding>
            </AppContainer>
          </FullBleed>
        )}
      </Sticky>

      {fair.exhibitorsGroupedByName?.map(exhibitorsGroup => {
        const { letter } = exhibitorsGroup!
        if (!exhibitorsGroup?.exhibitors?.length || !letter) {
          return null
        }

        return (
          <Box key={letter} id={getExhibitorSectionId(letter)}>
            <Text variant="lg" my={4}>
              {letter}
            </Text>
            <FairExhibitorsGroup exhibitorsGroup={exhibitorsGroup} />
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
