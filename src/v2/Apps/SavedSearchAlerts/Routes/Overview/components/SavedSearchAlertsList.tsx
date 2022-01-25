import { Box, Text, Flex, Spacer, Clickable } from "@artsy/palette"
import { createPaginationContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { SavedSearchAlertsList_me } from "v2/__generated__/SavedSearchAlertsList_me.graphql"
import { EditAlertEntity } from "../types"

interface SavedSearchAlertsListProps {
  me: SavedSearchAlertsList_me
  onEditAlertClick: (savedSearchAlert: EditAlertEntity) => void
}

export const SavedSearchAlertsList: React.FC<SavedSearchAlertsListProps> = ({
  me,
  onEditAlertClick,
}) => {
  const alerts = extractNodes(me.savedSearchesConnection)

  return (
    <>
      {alerts.map(edge => (
        <Box key={edge.internalID} p={4}>
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text variant="lg">{edge.userAlertSettings.name}</Text>
            <Flex flexDirection="row" alignItems="center">
              <Clickable
                textDecoration="underline"
                onClick={() => {
                  onEditAlertClick({
                    id: edge.internalID,
                    name: edge.userAlertSettings.name!,
                  })
                }}
              >
                <Text variant="sm">Edit</Text>
              </Clickable>
              <Spacer ml={2} />
              <Clickable textDecoration="underline">
                <Text variant="sm">View All</Text>
              </Clickable>
            </Flex>
          </Flex>
        </Box>
      ))}
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
