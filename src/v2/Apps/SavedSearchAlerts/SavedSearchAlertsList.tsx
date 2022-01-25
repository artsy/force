import {
  Box,
  Text,
  GridColumns,
  Column,
  Flex,
  Spacer,
  FullBleed,
  Separator,
  Clickable,
} from "@artsy/palette"
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
    <FullBleed>
      <Separator backgroundColor="black15" />
      <GridColumns>
        <Column span={12}>
          {alerts.length !== 0 ? (
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
            <Text variant="sm">no results</Text>
          )}
        </Column>
      </GridColumns>
    </FullBleed>
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
