import { Text, Flex, Box, Spacer, Join, Separator } from "@artsy/palette"
import { SavedSearchAlertEditFormQuery } from "__generated__/SavedSearchAlertEditFormQuery.graphql"
import { graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EditAlertEntity } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { AlertProvider } from "Components/Alert/AlertProvider"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { Modal } from "Components/Alert/Components/Modal/Modal"
import { Media } from "Utils/Responsive"

interface AlertArtworksProps {
  alert: any
  onCloseClick?: () => void
}

export const AlertArtworks: React.FC<AlertArtworksProps> = ({
  alert,
  onCloseClick,
}) => {
  const count = alert.artworksConnection.counts.total

  return (
    <>
      <Media greaterThanOrEqual="md">
        <Box p={4} flex={1}>
          <Join separator={<Spacer y={2} />}>
            <Text variant="lg">View Artworks</Text>
            <Text>Pills</Text>
            <Separator />
            <Text variant="sm-display" color="black60" mb={4}>
              {count}
              {count > 1 ? " works" : " work"} currently on Artsy match your
              criteria.
              <Text variant="sm-display" color="black60">
                See our top picks for you:
              </Text>
            </Text>
          </Join>
          <ArtworkGrid
            artworks={alert.artworksConnection}
            columnCount={2}
            onBrickClick={() => {
              /* TODO: to track or not to track? */
            }}
          />
        </Box>
      </Media>

      <Media lessThan="md">
        <Modal onClose={onCloseClick}>
          <Flex mx={2} flexDirection="column">
            <Join separator={<Spacer y={2} />}>
              <Text variant="lg">View Artworks</Text>
              <Text>Pills</Text>
              <Text variant="sm-display" color="black60" mb={4}>
                {count}
                {count > 1 ? " works" : " work"} currently on Artsy match your
                criteria.
                <Text variant="sm-display" color="black60">
                  See our top picks for you:
                </Text>
              </Text>
            </Join>
            <Spacer y={2} />
            <ArtworkGrid
              artworks={alert.artworksConnection}
              columnCount={2}
              onBrickClick={() => {
                /* TODO: to track or not to track? */
              }}
            />
          </Flex>
        </Modal>
      </Media>
    </>
  )
}

interface SavedSearchAlertsArtworksQueryRendererProps {
  editAlertEntity: EditAlertEntity
  onCloseClick?: () => void
}

export const SavedSearchAlertsArtworksQueryRenderer: React.FC<SavedSearchAlertsArtworksQueryRendererProps> = ({
  editAlertEntity,
  onCloseClick,
}) => {
  return (
    <SystemQueryRenderer<SavedSearchAlertEditFormQuery>
      query={graphql`
        query SavedSearchAlertsArtworksQuery($id: String!) {
          me {
            alert(id: $id) {
              artworksConnection(first: 10) {
                counts {
                  total
                }
                ...ArtworkGrid_artworks
              }
            }
          }
        }
      `}
      variables={{
        id: editAlertEntity.id,
      }}
      placeholder={<></>}
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props?.me || !props?.me.alert) {
          return <></> // plaseholder
        }

        return (
          <AlertProvider
            initialCriteria={getAllowedSearchCriteria(
              (props.me.alert as unknown) as SearchCriteriaAttributes
            )}
            alertID={props.me.alert.internalID}
          >
            <AlertArtworks alert={props.me.alert} onCloseClick={onCloseClick} />
          </AlertProvider>
        )
      }}
    />
  )
}
