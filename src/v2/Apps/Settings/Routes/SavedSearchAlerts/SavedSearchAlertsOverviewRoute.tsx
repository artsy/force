import { GridColumns, Column, FullBleed, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SavedSearchAlertsOverviewRoute_me } from "v2/__generated__/SavedSearchAlertsOverviewRoute_me.graphql"
import { SavedSearchAlertsListPaginationContainer } from "./SavedSearchAlertsList"

interface SavedSearchAlertsOverviewRouteProps {
  me: SavedSearchAlertsOverviewRoute_me
}

export const SavedSearchAlertsOverviewRoute: React.FC<SavedSearchAlertsOverviewRouteProps> = ({
  me,
}) => {
  return (
    <FullBleed>
      <Separator backgroundColor="black15" />
      <GridColumns>
        <Column span={12}>
          <SavedSearchAlertsListPaginationContainer me={me} />
        </Column>
      </GridColumns>
    </FullBleed>
  )
}
export const SavedSearchAlertsOverviewRouteFragmentContainer = createFragmentContainer(
  SavedSearchAlertsOverviewRoute,
  {
    me: graphql`
      fragment SavedSearchAlertsOverviewRoute_me on Me {
        ...SavedSearchAlertsList_me
      }
    `,
  }
)
