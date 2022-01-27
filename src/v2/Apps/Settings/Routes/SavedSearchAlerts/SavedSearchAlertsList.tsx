import {
  Box,
  Button,
  Clickable,
  Flex,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { createPaginationContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { SavedSearchAlertsList_me } from "v2/__generated__/SavedSearchAlertsList_me.graphql"

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
        <Box
          mx="auto"
          px={[2, 0, 0, 0]}
          justifyContent="center"
          maxWidth="540px"
          pt={6}
          pb={100}
        >
          <Flex flexDirection="column" alignItems="center">
            <Text textAlign="center" variant="xl">
              You haven't created any Alerts yet.
            </Text>
            <Text py={2} variant="sm" color="black60" textAlign="center">
              Filter for the artworks you love on an Artist Page and tap ‘Create
              Alert’ to be notified when new works are added to Artsy.
            </Text>
            <Button
              // @ts-ignore
              as={RouterLink}
              to="/artists"
              width="100%"
              size="medium"
            >
              Explore Artists
            </Button>
          </Flex>
        </Box>
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
