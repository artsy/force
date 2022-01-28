import { Box, Clickable, Flex, Separator, Spacer, Text } from "@artsy/palette"
import { createPaginationContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { SavedSearchAlertsList_me } from "v2/__generated__/SavedSearchAlertsList_me.graphql"
import { SavedSearchAlertsEmptyResults } from "./Components/SavedSearchAlertsEmptyResults"

interface SavedSearchAlertsListProps {
  me: SavedSearchAlertsList_me
}

const SavedSearchAlertsList: React.FC<SavedSearchAlertsListProps> = ({
  me,
}) => {
  const alerts = extractNodes(me.savedSearchesConnection)
  const hasAlerts = alerts.length !== 0
  return (
    <>
      {hasAlerts ? (
        alerts.map((edge, i) => (
          <Box key={edge.internalID} px={[2, 4]} pt={4}>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text variant="lg" maxWidth="55%">
                {edge.userAlertSettings.name}
              </Text>
              <Flex flexDirection="row" alignItems="center">
                <Clickable textDecoration="underline" onClick={() => {}}>
                  <Text variant="sm">Edit</Text>
                </Clickable>
                <Spacer ml={2} />
                <Clickable textDecoration="underline">
                  <Text variant="sm">View All</Text>
                </Clickable>
              </Flex>
            </Flex>
            {!(alerts.length === i + 1) && <Separator mt={4} mr={[2, 4]} />}
          </Box>
        ))
      ) : (
        <SavedSearchAlertsEmptyResults />
      )}
    </>
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
