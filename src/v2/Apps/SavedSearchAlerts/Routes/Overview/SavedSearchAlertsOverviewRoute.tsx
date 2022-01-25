import {
  Box,
  Text,
  GridColumns,
  Column,
  Flex,
  Spacer,
  FullBleed,
  Separator,
  CloseIcon,
  Clickable,
} from "@artsy/palette"
import { createPaginationContainer, graphql } from "react-relay"
import { SavedSearchAlertsOverviewRoute_me } from "v2/__generated__/SavedSearchAlertsOverviewRoute_me.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { useState } from "react"

interface SavedSearchAlertsOverviewRouteProps {
  me: SavedSearchAlertsOverviewRoute_me
}

interface EditAlertEntity {
  id: string
  name: string
}

export const SavedSearchAlertsOverviewRoute: React.FC<SavedSearchAlertsOverviewRouteProps> = ({
  me,
}) => {
  const [
    editAlertEntity,
    setEditAlertEntity,
  ] = useState<EditAlertEntity | null>(null)
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null

  return (
    <FullBleed>
      <Separator backgroundColor="black15" />
      <GridColumns>
        <Column span={isEditMode ? 6 : 12}>
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
                      setEditAlertEntity({
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
        </Column>
        {isEditMode && (
          <Column span={6}>
            <Flex flexDirection="row" height="100%">
              <Box width="1px" height="100%" backgroundColor="black15" />
              <Box p={4} flex={1}>
                <Flex flexDirection="row" justifyContent="space-between">
                  <Text variant="lg" flex={1} mr={1}>
                    {editAlertEntity!.name}
                  </Text>
                  <Clickable onClick={() => setEditAlertEntity(null)} mt={0.5}>
                    <CloseIcon />
                  </Clickable>
                </Flex>
              </Box>
            </Flex>
          </Column>
        )}
      </GridColumns>
    </FullBleed>
  )
}

export const SavedSearchAlertsOverviewRoutePaginationContainer = createPaginationContainer(
  SavedSearchAlertsOverviewRoute,
  {
    me: graphql`
      fragment SavedSearchAlertsOverviewRoute_me on Me {
        savedSearchesConnection(first: 50)
          @connection(
            key: "SavedSearchAlertsOverviewRoute_savedSearchesConnection"
          ) {
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
      query SavedSearchAlertsOverviewRouteRefetchQuery {
        me {
          ...SavedSearchAlertsOverviewRoute_me
        }
      }
    `,
  }
)
