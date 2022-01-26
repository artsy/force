import {
  Box,
  Text,
  GridColumns,
  Column,
  Flex,
  FullBleed,
  Separator,
  CloseIcon,
  Clickable,
  ModalDialog,
  Button,
  Join,
  Spacer,
} from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useState } from "react"
import { SavedSearchAlertsOverviewRoute_me } from "v2/__generated__/SavedSearchAlertsOverviewRoute_me.graphql"
import { Media } from "v2/Utils/Responsive"
import { EditAlertEntity } from "./types"
import { SavedSearchAlertEditQueryRenderer } from "./components/SavedSearchEditAlert"
import { extractNodes } from "v2/Utils/extractNodes"

interface SavedSearchAlertsOverviewRouteProps {
  me: SavedSearchAlertsOverviewRoute_me
  relay: RelayPaginationProp
}

export const SavedSearchAlertsOverviewRoute: React.FC<SavedSearchAlertsOverviewRouteProps> = ({
  me,
  relay,
}) => {
  const [
    editAlertEntity,
    setEditAlertEntity,
  ] = useState<EditAlertEntity | null>(null)
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null

  const handleCloseClick = () => {
    setEditAlertEntity(null)
  }

  const handleCompleted = () => {
    handleCloseClick()
    relay.refetchConnection(50)
  }

  const list = (
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
                  setEditAlertEntity({
                    id: edge.internalID,
                    name: edge.userAlertSettings.name!,
                    artistId: edge.artistID!,
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

  return (
    <FullBleed>
      <Separator backgroundColor="black15" />

      <Media greaterThanOrEqual="md">
        <GridColumns>
          <Column span={isEditMode ? 6 : 12}>{list}</Column>
          {isEditMode && editAlertEntity && (
            <Column span={6}>
              <Flex height="100%">
                <Box width="1px" height="100%" backgroundColor="black15" />
                <Box p={4} flex={1}>
                  <Flex justifyContent="space-between">
                    <Text variant="lg" flex={1} mr={1}>
                      {editAlertEntity.name}
                    </Text>
                    <Clickable onClick={handleCloseClick} mt={0.5}>
                      <CloseIcon />
                    </Clickable>
                  </Flex>
                  <SavedSearchAlertEditQueryRenderer
                    id={editAlertEntity.id}
                    artistId={editAlertEntity.artistId}
                    onCompleted={handleCompleted}
                  />
                  <Flex>
                    <Button variant="secondaryOutline" flex={1}>
                      Delete Alert
                    </Button>
                    <Spacer ml={2} />
                    <Button flex={1}>Save Alert</Button>
                  </Flex>
                </Box>
              </Flex>
            </Column>
          )}
        </GridColumns>
      </Media>

      <Media lessThan="md">
        {list}
        {isEditMode && editAlertEntity && (
          <ModalDialog
            title={editAlertEntity.name}
            onClose={handleCloseClick}
            footer={
              <Join separator={<Spacer mt={1} />}>
                <Button width="100%">Save Alert</Button>
                <Button variant="secondaryOutline" width="100%">
                  Delete Alert
                </Button>
              </Join>
            }
          >
            <SavedSearchAlertEditQueryRenderer
              id={editAlertEntity.id}
              artistId={editAlertEntity.artistId}
              onCompleted={handleCompleted}
            />
          </ModalDialog>
        )}
      </Media>
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
              artistID
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
