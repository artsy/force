import { Box, Text } from "@artsy/palette"
import { createPaginationContainer, graphql } from "react-relay"
import { SavedSearchAlertsList_me } from "v2/__generated__/SavedSearchAlertsList_me.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

interface SavedSearchAlertsListProps {
  me: SavedSearchAlertsList_me
}

export const SavedSearchAlertsList: React.FC<SavedSearchAlertsListProps> = ({
  me,
}) => {
  const alerts = extractNodes(me.savedSearchesConnection)

  return (
    <Box>
      {alerts.map(edge => (
        <Box key={edge.internalID} my={1}>
          <Text>{edge.userAlertSettings.name}</Text>
        </Box>
      ))}
    </Box>
  )
}

export const SavedSearchAlertsListPaginationContainer = createPaginationContainer(
  SavedSearchAlertsList,
  {
    me: graphql`
      fragment SavedSearchAlertsList_me on Me {
        savedSearchesConnection(first: 50)
          @connection(key: "SavedSearchAlertsList_savedSearchesConnection") {
          edges {
            node {
              internalID
              userAlertSettings {
                name
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(_, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        after: cursor,
      }
    },
    query: graphql`
      query SavedSearchAlertsListRefetchQuery {
        me {
          ...SavedSearchAlertsList_me
        }
      }
    `,
  }
)
