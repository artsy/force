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
import { Sticky } from "Components/Sticky"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"
import { useRouter } from "System/Router/useRouter"
import { useSystemContext } from "System/SystemContext"
import { SavedSearchAlertsApp_Alert_Query } from "__generated__/SavedSearchAlertsApp_Alert_Query.graphql"
import { SavedSearchAlertEditFormQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/SavedSearchAlertEditForm"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { getENV } from "Utils/getENV"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"

const DESKTOP_HEIGHT = `calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px)`

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
  const { relayEnvironment } = useSystemContext()
  const { sendToast } = useToasts()
  const { trackEvent } = useTracking()
  const { match, silentPush } = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [sort, setSort] = useState("ENABLED_AT_DESC")
  const [loading, setLoading] = useState(false)
  const alerts = extractNodes(me.alertsConnection)
  const isMobile = getENV("IS_MOBILE")

  const [
    editAlertEntity,
    setEditAlertEntity,
  ] = useState<EditAlertEntity | null>(null)

  const isEditMode = editAlertEntity !== null

  useEffect(() => {
    if (!alerts || !alerts[0]) return
    if (match?.params?.alertID) return
    if (isMobile === null) return
    if (!isMobile) {
      setEditAlertEntity({
        id: alerts[0].internalID,
        name: alerts[0].settings.name ?? "",
        artistIds: alerts[0]?.artistIDs as string[],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

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

  const refresh = () => {
    setTimeout(() => {
      refetch()
    }, 100)
  }

  const closeEditFormAndRefetch = () => {
    closeEditForm()
    refresh()
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const handleCompletedDesctop = () => {
    refresh()

    sendToast({
      message: "Your Alert has been updated.",
    })
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

  const alertID = match?.params?.alertID ?? editAlertEntity?.id

  useEffect(() => {
    if (!alertID) return

    const subscription = fetchQuery<SavedSearchAlertsApp_Alert_Query>(
      relayEnvironment as Environment,
      graphql`
        query SavedSearchAlertsApp_Alert_Query($alertID: String!) {
          me {
            alert(id: $alertID) {
              internalID
              artistIDs
              settings {
                name
              }
            }
          }
        }
      `,
      { alertID }
    )?.subscribe?.({
      next: data => {
        const alert = data?.me?.alert
        if (!alert) return

        setEditAlertEntity({
          id: alert.internalID,
          artistIds: alert.artistIDs as string[],
          name: alert.settings.name ?? "",
        })

        silentPush(`/settings/alerts/${alert.internalID}/edit`)
      },
    })

    return () => {
      subscription?.unsubscribe?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertID, relayEnvironment])

  const list = (
    <>
      <Join separator={<Separator borderColor="black5" />}>
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

      <Box mx={[-2, 0]}>
        {alerts.length === 0 ? (
          <SavedSearchAlertsEmptyResults />
        ) : (
          <>
            <SavedSearchAlertHeader
              selected={sort}
              onSortSelect={handleSortSelect}
            />
            <Box mx={-4}>
              <Separator color="black15" />
              <Media greaterThanOrEqual="md">
                <GridColumns gridColumnGap={0}>
                  <Column span={6}>{list}</Column>
                  <Column
                    span={6}
                    borderLeft="1px solid"
                    borderLeftColor="black15"
                    borderRight="1px solid"
                    borderRightColor="black15"
                    height={DESKTOP_HEIGHT}
                  >
                    {editAlertEntity && (
                      <Sticky bottomBoundary="#content-end">
                        <SavedSearchAlertEditFormQueryRenderer
                          editAlertEntity={editAlertEntity}
                          onCompleted={handleCompletedDesctop}
                          onDeleteClick={handleDeleteClick}
                        />
                      </Sticky>
                    )}
                  </Column>
                </GridColumns>

                <Box id="content-end" />
              </Media>
            </Box>
            <Media lessThan="md">
              {list}
              {isEditMode && editAlertEntity && (
                <SavedSearchAlertEditFormQueryRenderer
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
          sort: {
            type: "AlertsConnectionSortEnum"
            defaultValue: ENABLED_AT_DESC
          }
        ) {
        alertsConnection(first: $count, after: $after, sort: $sort)
          @connection(key: "SavedSearchAlertsApp_alertsConnection") {
          edges {
            node {
              internalID
              artistIDs
              settings {
                name
              }
              ...SavedSearchAlertListItem_item
              title: displayName(only: [artistIDs])
              subtitle: displayName(except: [artistIDs])
              artworksConnection(first: 1) {
                counts {
                  total
                }
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
      query SavedSearchAlertsAppRefetchQuery(
        $after: String
        $count: Int!
        $sort: AlertsConnectionSortEnum
      ) {
        me {
          ...SavedSearchAlertsApp_me
            @arguments(after: $after, count: $count, sort: $sort)
        }
      }
    `,
  }
)
