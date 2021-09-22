import React from "react"
import { Column, GridColumns, themeProps } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairExhibitorsGroup_exhibitorsGroup } from "v2/__generated__/FairExhibitorsGroup_exhibitorsGroup.graphql"
import { FairExhibitorCardFragmentContainer as FairExhibitorCard } from "./FairExhibitorCard"
import { useRouter } from "v2/System/Router/useRouter"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"

interface FairExhibitorsGroupProps {
  exhibitorsGroup: FairExhibitorsGroup_exhibitorsGroup
}

export const FairExhibitorsGroup: React.FC<FairExhibitorsGroupProps> = ({
  exhibitorsGroup: { exhibitors },
}) => {
  const { match } = useRouter()
  const { focused_exhibitor: focusedExhibitorID } = match.location.query
  const isMobile = useMatchMedia(themeProps.mediaQueries.xs)

  const focusedExhibitorStyles = {
    borderColor: "brand",
    borderStyle: "solid",
    borderWidth: "1px",
    padding: "2px",
  }

  return (
    <GridColumns position="relative" gridRowGap={4}>
      {exhibitors?.map(exhibitor => {
        if (!exhibitor?.partner) {
          return null
        }

        const focused = focusedExhibitorID === exhibitor.partner.internalID
        const exhibitorCardStyle =
          focused && !isMobile ? focusedExhibitorStyles : {}

        return (
          <Column
            {...exhibitorCardStyle}
            key={exhibitor.partner.internalID}
            span={[12, 6, 3]}
          >
            <FairExhibitorCard exhibitor={exhibitor} />
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
  }
)
