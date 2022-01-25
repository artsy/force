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
import { createFragmentContainer, graphql } from "react-relay"
import { useState } from "react"
import { SavedSearchAlertsOverviewRoute_me } from "v2/__generated__/SavedSearchAlertsOverviewRoute_me.graphql"
import { SavedSearchAlertsListPaginationContainer } from "./components/SavedSearchAlertsList"
import { Media } from "v2/Utils/Responsive"
import { EditAlertEntity } from "./types"
import { SavedSearchAlertEditQueryRenderer } from "./components/SavedSearchEditAlert"

interface SavedSearchAlertsOverviewRouteProps {
  me: SavedSearchAlertsOverviewRoute_me
}

export const SavedSearchAlertsOverviewRoute: React.FC<SavedSearchAlertsOverviewRouteProps> = ({
  me,
}) => {
  const [
    editAlertEntity,
    setEditAlertEntity,
  ] = useState<EditAlertEntity | null>(null)
  const isEditMode = editAlertEntity !== null

  const handleCloseClick = () => {
    setEditAlertEntity(null)
  }

  return (
    <FullBleed>
      <Separator backgroundColor="black15" />

      <Media greaterThanOrEqual="md">
        <GridColumns>
          <Column span={isEditMode ? 6 : 12}>
            <SavedSearchAlertsListPaginationContainer
              me={me}
              onEditAlertClick={setEditAlertEntity}
            />
          </Column>
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
                    onCompleted={handleCloseClick}
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
        <SavedSearchAlertsListPaginationContainer
          me={me}
          onEditAlertClick={setEditAlertEntity}
        />
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
              onCompleted={handleCloseClick}
            />
          </ModalDialog>
        )}
      </Media>
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
