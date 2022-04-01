import {
  GridColumns,
  Column,
  Separator,
  Box,
  Join,
  useToasts,
  Button,
} from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useState } from "react"
import { SavedSearchAlertsApp_me } from "v2/__generated__/SavedSearchAlertsApp_me.graphql"
import { Media } from "v2/Utils/Responsive"
import { EditAlertEntity } from "./types"
import { extractNodes } from "v2/Utils/extractNodes"
import { SavedSearchAlertDeleteModal } from "./Components/SavedSearchAlertDeleteModal"
import {
  SavedSearchAlertListItemFragmentContainer,
  SavedSearchAlertListItemVariant,
} from "./Components/SavedSearchAlertListItem"
import { SavedSearchAlertHeader } from "./Components/SavedSearchAlertHeader"
import { MetaTags } from "v2/Components/MetaTags"
import { SavedSearchAlertsEmptyResults } from "./Components/SavedSearchAlertsEmptyResults"
import { SavedSearchAlertEditFormDesktop } from "./Components/SavedSearchAlertEditFormDesktop"
import { Sticky, StickyProvider } from "v2/Components/Sticky"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { SavedSearchAlertEditFormMobile } from "./Components/SavedSearchAlertEditFormMobile"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"

interface SavedSearchAlertsAppProps {
  me: SavedSearchAlertsApp_me
  relay: RelayPaginationProp
}

export const SavedSearchAlertsApp: React.FC<SavedSearchAlertsAppProps> = ({
  me,
  relay,
}) => {
  const { desktop } = useNavBarHeight()
  const [
    editAlertEntity,
    setEditAlertEntity,
  ] = useState<EditAlertEntity | null>(null)
  const { sendToast } = useToasts()
  const { trackEvent } = useTracking()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null

  const closeEditForm = () => {
    setEditAlertEntity(null)
  }

  const closeEditFormAndRefetch = () => {
    closeEditForm()
    relay.refetchConnection(10)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const handleCompleted = () => {
    closeEditFormAndRefetch()

    sendToast({
      message: "Your Alert has been updated.",
    })
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleted = () => {
    trackEvent({
      action: ActionType.deletedSavedSearch,
      saved_search_id: editAlertEntity!.id,
    })

    closeEditFormAndRefetch()
    closeDeleteModal()

    sendToast({
      message: "Your Alert has been deleted.",
    })
  }

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    setLoading(true)

    relay.loadMore(10, err => {
      if (err) {
        console.error(err)
      }

      setLoading(false)
    })
  }

  const list = (
    <>
      <Join separator={<Separator color="black15" />}>
        {alerts.map(edge => {
          const isCurrentEdgeSelected = editAlertEntity?.id === edge.internalID
          let variant: SavedSearchAlertListItemVariant | undefined

          if (isCurrentEdgeSelected) {
            variant = "active"
          } else if (!!editAlertEntity) {
            variant = "inactive"
          }

          return (
            <SavedSearchAlertListItemFragmentContainer
              key={edge.internalID}
              item={edge}
              variant={variant}
              onEditAlertClick={setEditAlertEntity}
            />
          )
        })}
      </Join>

      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={handleLoadMore} loading={loading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )

  return (
    <StickyProvider>
      <MetaTags title="Your Alerts | Artsy" pathname="/settings/alerts" />

      <SavedSearchAlertHeader />

      <Box mx={[-2, -4]}>
        <Separator color="black15" />

        {alerts.length === 0 ? (
          <SavedSearchAlertsEmptyResults />
        ) : (
          <>
            <Media greaterThanOrEqual="md">
              <GridColumns gridColumnGap={0}>
                <Column span={isEditMode ? 6 : 12}>{list}</Column>
                {isEditMode && editAlertEntity && (
                  <Column
                    span={6}
                    borderLeft="1px solid"
                    borderLeftColor="black15"
                  >
                    <Sticky bottomBoundary="#content-end">
                      <Box
                        overflowY="auto"
                        maxHeight={`calc(100vh - ${desktop}px)`}
                      >
                        <SavedSearchAlertEditFormDesktop
                          editAlertEntity={editAlertEntity}
                          onCloseClick={closeEditForm}
                          onCompleted={handleCompleted}
                          onDeleteClick={handleDeleteClick}
                        />
                      </Box>
                    </Sticky>
                  </Column>
                )}
              </GridColumns>

              <Box id="content-end" />
            </Media>

            <Media lessThan="md">
              {list}
              {isEditMode && editAlertEntity && (
                <SavedSearchAlertEditFormMobile
                  editAlertEntity={editAlertEntity}
                  onCloseClick={closeEditForm}
                  onCompleted={handleCompleted}
                  onDeleteClick={handleDeleteClick}
                />
              )}
            </Media>

            {showDeleteModal && editAlertEntity && (
              <SavedSearchAlertDeleteModal
                id={editAlertEntity!.id}
                onCloseClick={closeDeleteModal}
                onDeleted={handleDeleted}
              />
            )}
          </>
        )}
      </Box>
    </StickyProvider>
  )
}

export const SavedSearchAlertsAppPaginationContainer = createPaginationContainer(
  SavedSearchAlertsApp,
  {
    me: graphql`
      fragment SavedSearchAlertsApp_me on Me
        @argumentDefinitions(
          after: { type: "String" }
          count: { type: "Int", defaultValue: 10 }
        ) {
        savedSearchesConnection(first: $count, after: $after)
          @connection(key: "SavedSearchAlertsApp_savedSearchesConnection") {
          edges {
            node {
              internalID
              ...SavedSearchAlertListItem_item
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
      query SavedSearchAlertsAppRefetchQuery($after: String, $count: Int!) {
        me {
          ...SavedSearchAlertsApp_me @arguments(after: $after, count: $count)
        }
      }
    `,
  }
)
