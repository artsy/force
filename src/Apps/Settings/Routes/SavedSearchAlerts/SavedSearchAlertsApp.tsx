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
import { SavedSearchAlertsApp_me$data } from "__generated__/SavedSearchAlertsApp_me.graphql"
import { Media } from "Utils/Responsive"
import { EditAlertEntity } from "./types"
import { extractNodes } from "Utils/extractNodes"
import { SavedSearchAlertDeleteModal } from "./Components/SavedSearchAlertDeleteModal"
import {
  SavedSearchAlertListItemFragmentContainer,
  SavedSearchAlertListItemVariant,
} from "./Components/SavedSearchAlertListItem"
import { SavedSearchAlertHeader } from "./Components/SavedSearchAlertHeader"
import { MetaTags } from "Components/MetaTags"
import { SavedSearchAlertsEmptyResults } from "./Components/SavedSearchAlertsEmptyResults"
import { SavedSearchAlertEditFormDesktop } from "./Components/SavedSearchAlertEditFormDesktop"
import { Sticky } from "Components/Sticky"
import { SavedSearchAlertEditFormMobile } from "./Components/SavedSearchAlertEditFormMobile"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"
import { useFeatureFlag } from "System/useFeatureFlag"
import { EditAlertSteps } from "Apps/Settings/Routes/SavedSearchAlerts/Components/EditAlertSteps"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { NewSavedSearchAlertEditFormQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/NewSavedSearchAlertEditForm"

interface SavedSearchAlertsAppProps {
  me: SavedSearchAlertsApp_me$data
  relay: RelayPaginationProp
}

interface RefetchVariables {
  sort?: string
}

export const SavedSearchAlertsApp: React.FC<SavedSearchAlertsAppProps> = ({
  me,
  relay,
}) => {
  const [
    editAlertEntity,
    setEditAlertEntity,
  ] = useState<EditAlertEntity | null>(null)
  const { sendToast } = useToasts()
  const { trackEvent } = useTracking()
  const newAlertModalEnabled = useFeatureFlag("onyx_artwork_alert_modal_v2")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [sort, setSort] = useState("CREATED_AT_DESC")
  const [loading, setLoading] = useState(false)
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null

  const closeEditForm = () => {
    setEditAlertEntity(null)
  }

  const refetch = (variables?: RefetchVariables) => {
    const relayRefetchVariables = {
      sort: variables?.sort ?? sort,
    }

    relay.refetchConnection(10, null, relayRefetchVariables)
  }

  const closeEditFormAndRefetch = () => {
    closeEditForm()
    refetch()
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

  const handleSortSelect = (value: string) => {
    setSort(value)
    refetch({
      sort: value,
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
              onEditAlertClick={value => {
                setEditAlertEntity(value)
              }}
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
    <>
      <MetaTags title="Alerts | Artsy" pathname="/settings/alerts" />
      {newAlertModalEnabled ? (
        <AlertProvider initialCriteria={{}} isEditMode>
          <Box mx={[-2, 0]}>
            {alerts.length === 0 ? (
              <SavedSearchAlertsEmptyResults />
            ) : (
              <>
                <SavedSearchAlertHeader
                  selected={sort}
                  onSortSelect={handleSortSelect}
                />
                <Separator color="black15" />
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
                          <NewSavedSearchAlertEditFormQueryRenderer
                            editAlertEntity={editAlertEntity}
                            onCloseClick={closeEditForm}
                            onCompleted={handleCompleted}
                            onDeleteClick={handleDeleteClick}
                          />
                        </Sticky>
                      </Column>
                    )}
                  </GridColumns>

                  <Box id="content-end" />
                </Media>

                {/*  <Media lessThan="md">
        {list}
        {isEditMode && editAlertEntity && (
          <SavedSearchAlertEditFormMobile
            editAlertEntity={editAlertEntity}
            onCloseClick={closeEditForm}
            onCompleted={handleCompleted}
            onDeleteClick={handleDeleteClick}
          />
        )}
      </Media> */}
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
        </AlertProvider>
      ) : (
        <>
          <Box mx={[-2, 0]}>
            {alerts.length === 0 ? (
              <SavedSearchAlertsEmptyResults />
            ) : (
              <>
                <SavedSearchAlertHeader
                  selected={sort}
                  onSortSelect={handleSortSelect}
                />
                <Separator color="black15" />
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
                          <SavedSearchAlertEditFormDesktop
                            editAlertEntity={editAlertEntity}
                            onCloseClick={closeEditForm}
                            onCompleted={handleCompleted}
                            onDeleteClick={handleDeleteClick}
                          />
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
        </>
      )}
    </>
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
          sort: { type: "SavedSearchesSortEnum", defaultValue: CREATED_AT_DESC }
        ) {
        savedSearchesConnection(first: $count, after: $after, sort: $sort)
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
      query SavedSearchAlertsAppRefetchQuery(
        $after: String
        $count: Int!
        $sort: SavedSearchesSortEnum
      ) {
        me {
          ...SavedSearchAlertsApp_me
            @arguments(after: $after, count: $count, sort: $sort)
        }
      }
    `,
  }
)
