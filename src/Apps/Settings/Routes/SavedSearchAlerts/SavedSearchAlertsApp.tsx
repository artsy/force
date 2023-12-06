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
  Environment,
  fetchQuery,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useEffect, useState } from "react"
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
import { useRouter } from "System/Router/useRouter"
import { useSystemContext } from "System/SystemContext"
import { SavedSearchAlertsApp_Alert_Query } from "__generated__/SavedSearchAlertsApp_Alert_Query.graphql"
import { NewSavedSearchAlertEditFormQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/NewSavedSearchAlertEditForm"
import { useFeatureFlag } from "System/useFeatureFlag"

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
  const { relayEnvironment } = useSystemContext()
  const { sendToast } = useToasts()
  const { trackEvent } = useTracking()
  const newAlertModalEnabled = useFeatureFlag("onyx_artwork_alert_modal_v2")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [sort, setSort] = useState("CREATED_AT_DESC")
  const [loading, setLoading] = useState(false)
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null
  const { match, silentPush } = useRouter()

  const closeEditForm = () => {
    setEditAlertEntity(null)
    silentPush("/settings/alerts")
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
      saved_search_id: editAlertEntity?.id,
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

  const searchCriteriaID = match?.params?.searchCriteriaID

  useEffect(() => {
    if (!searchCriteriaID) return

    const subscription = fetchQuery<SavedSearchAlertsApp_Alert_Query>(
      relayEnvironment as Environment,
      graphql`
        query SavedSearchAlertsApp_Alert_Query($searchCriteriaID: ID!) {
          me {
            savedSearch(id: $searchCriteriaID) {
              internalID
              artistIDs
              userAlertSettings {
                name
              }
            }
          }
        }
      `,
      { searchCriteriaID: searchCriteriaID }
    )?.subscribe?.({
      next: data => {
        const alert = data?.me?.savedSearch
        if (!alert) return

        setEditAlertEntity({
          id: alert.internalID,
          artistIds: alert.artistIDs as string[],
          name: alert.userAlertSettings.name ?? "",
        })
      },
    })

    return () => {
      subscription?.unsubscribe?.()
    }
  }, [searchCriteriaID, relayEnvironment])

  const list = (
    <>
      <Join separator={<Separator color="black15" />}>
        {alerts.map(node => {
          const isCurrentEdgeSelected = editAlertEntity?.id === node.internalID
          let variant: SavedSearchAlertListItemVariant | undefined

          if (isCurrentEdgeSelected) {
            variant = "active"
          } else if (!!editAlertEntity) {
            variant = "inactive"
          }

          return (
            <SavedSearchAlertListItemFragmentContainer
              key={node.internalID}
              item={node}
              variant={variant}
              onEditAlertClick={entity => {
                setEditAlertEntity(entity)
                silentPush(`/settings/alerts/${entity.id}/edit`)
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

              <Media lessThan="md">
                {list}
                {isEditMode && editAlertEntity && (
                  <NewSavedSearchAlertEditFormQueryRenderer
                    editAlertEntity={editAlertEntity}
                    onCloseClick={closeEditForm}
                    onCompleted={handleCompleted}
                    onDeleteClick={handleDeleteClick}
                  />
                )}
              </Media>

              {showDeleteModal && editAlertEntity && (
                <SavedSearchAlertDeleteModal
                  id={editAlertEntity.id}
                  onCloseClick={closeDeleteModal}
                  onDeleted={handleDeleted}
                />
              )}
            </>
          )}
        </Box>
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
                    id={editAlertEntity.id}
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
