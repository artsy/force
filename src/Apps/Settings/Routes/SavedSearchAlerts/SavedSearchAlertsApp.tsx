import {
  GridColumns,
  Column,
  Separator,
  Box,
  Join,
  useToasts,
  Flex,
  Spinner,
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
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"
import { useRouter } from "System/Router/useRouter"
import { useSystemContext } from "System/SystemContext"
import { SavedSearchAlertsApp_Alert_Query } from "__generated__/SavedSearchAlertsApp_Alert_Query.graphql"
import { SavedSearchAlertEditFormQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/SavedSearchAlertEditForm"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { getENV } from "Utils/getENV"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"
import { SavedSearchAlertsArtworksQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/SavedSearchAlertsArtworks"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"

const SETTINGS_NAVIGATION_BAR_HEIGHT = 300
export const ALERTS_APP_DESKTOP_HEIGHT = `calc(100vh - ${
  DESKTOP_NAV_BAR_HEIGHT + SETTINGS_NAVIGATION_BAR_HEIGHT
}px)`

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
  const alerts = extractNodes(me.alertsConnection)
  const isMobile = getENV("IS_MOBILE")

  const [
    editAlertEntity,
    setEditAlertEntity,
  ] = useState<EditAlertEntity | null>(null)

  const [viewOption, setViewOption] = useState<"EDIT" | "ARTWORKS" | null>(null)

  useEffect(() => {
    if (!alerts || !alerts[0]) return
    if (match?.params?.alertID) return
    if (isMobile === null) return
    if (!isMobile) {
      setEditAlertEntity({
        id: alerts[0].internalID,
        name: alerts[0].title ?? "",
        artistIds: alerts[0]?.artistIDs as string[],
      })
      // the two following lines update the right colump and url when
      // "/settings/alerts" is called from the tab of side menu
      setViewOption("EDIT")
      silentPush(`/settings/alerts/${alerts[0].internalID}/edit`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, match.params])

  const closeModal = () => {
    setEditAlertEntity(null)
    setViewOption(null)
    silentPush("/settings/alerts")
  }

  const handleOpenEditForm = () => {
    setViewOption("EDIT")
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

  const closeModalAndRefetch = () => {
    closeModal()
    refresh()
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const handleCompleted = () => {
    if (isMobile) {
      closeModalAndRefetch()
    } else refresh()

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

    if (isMobile) {
      closeModalAndRefetch()
    } else refresh()

    closeDeleteModal()

    sendToast({
      message: "Your Alert has been deleted.",
    })

    if (isMobile) return

    // the right collumn of the screen should always display alert's edit form
    // this is why when we delete and alert we update the editAlertEntity
    // to contain the details of the first alert on the alerts' list
    if (editAlertEntity?.id === alerts[0].internalID && alerts.length > 1) {
      setEditAlertEntity({
        id: alerts[1].internalID,
        name: alerts[1].title ?? "",
        artistIds: alerts[1]?.artistIDs as string[],
      })
      silentPush(`/settings/alerts/${alerts[1].internalID}/edit`)
    } else if (editAlertEntity?.id !== alerts[0].internalID) {
      setEditAlertEntity({
        id: alerts[0].internalID,
        name: alerts[0].title ?? "",
        artistIds: alerts[0]?.artistIDs as string[],
      })
      silentPush(`/settings/alerts/${alerts[0].internalID}/edit`)
    } else {
      // if we deleted the last alert we display the screen's empty state
      setEditAlertEntity(null)
      silentPush("/settings/alerts/")
    }
  }

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    relay.loadMore(10, err => {
      if (err) {
        console.error(err)
      }
    })
  }

  const handleSortSelect = (value: string) => {
    setSort(value)
    refetch({
      sort: value,
    })
  }

  const alertID = match?.params?.alertID ?? editAlertEntity?.id
  const path = match.location.pathname

  useEffect(() => {
    if (!alertID) return

    fetchQuery<SavedSearchAlertsApp_Alert_Query>(
      relayEnvironment as Environment,
      graphql`
        query SavedSearchAlertsApp_Alert_Query($alertID: String!) {
          me {
            alert(id: $alertID) {
              internalID
              artistIDs
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
      `,
      { alertID }
    )
      ?.toPromise()
      .then(data => {
        const alert = data?.me?.alert
        if (!alert) return

        setEditAlertEntity({
          id: alert.internalID,
          artistIds: alert.artistIDs as string[],
          name: alert.title ?? "",
        })

        if (path.includes("/artworks") || viewOption === "ARTWORKS") {
          setViewOption("ARTWORKS")
          silentPush(`/settings/alerts/${alert.internalID}/artworks`)
        } else {
          setViewOption("EDIT")
          silentPush(`/settings/alerts/${alert.internalID}/edit`)
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertID, relayEnvironment])

  const list = (
    <Box
      overflow="scroll"
      // The notification list needs a maximum height to be independently scrollable.
      maxHeight={[null, ALERTS_APP_DESKTOP_HEIGHT]}
      pb={2}
    >
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
                setViewOption("EDIT")
                silentPush(`/settings/alerts/${entity.id}/edit`)
              }}
              onViewArtworksClick={entity => {
                setEditAlertEntity(entity)
                setViewOption("ARTWORKS")
                silentPush(`/settings/alerts/${entity.id}/artworks`)
              }}
            />
          )
        })}
      </Join>

      {relay.hasMore() && (
        <>
          <InfiniteScrollSentinel onNext={handleLoadMore} once={false} />

          <Flex width="100%" my={4} alignItems="center">
            <Spinner position="relative" />
          </Flex>
        </>
      )}
    </Box>
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
                  <Column span={6}>
                    <Flex
                      height={ALERTS_APP_DESKTOP_HEIGHT}
                      flexDirection="column"
                    >
                      <Flex
                        overflow="hidden"
                        maxHeight={ALERTS_APP_DESKTOP_HEIGHT}
                        flexDirection="column"
                      >
                        {list}
                      </Flex>
                    </Flex>
                  </Column>

                  <Column
                    span={6}
                    borderLeft="1px solid"
                    borderLeftColor="black15"
                    borderRightColor="black15"
                    minHeight={ALERTS_APP_DESKTOP_HEIGHT}
                  >
                    <Flex
                      flexDirection="column"
                      height={ALERTS_APP_DESKTOP_HEIGHT}
                      overflow="auto"
                      paddingBottom={2}
                    >
                      {viewOption === "EDIT" && editAlertEntity && (
                        <SavedSearchAlertEditFormQueryRenderer
                          editAlertEntity={editAlertEntity}
                          onCompleted={handleCompleted}
                          onDeleteClick={handleDeleteClick}
                        />
                      )}
                      {viewOption === "ARTWORKS" && editAlertEntity && (
                        <SavedSearchAlertsArtworksQueryRenderer
                          editAlertEntity={editAlertEntity}
                          onEditAlertClick={handleOpenEditForm}
                        />
                      )}
                    </Flex>
                  </Column>
                </GridColumns>

                <Box id="content-end" />
              </Media>
            </Box>
            <Media lessThan="md">
              {list}
              {viewOption === "EDIT" && editAlertEntity && (
                <SavedSearchAlertEditFormQueryRenderer
                  editAlertEntity={editAlertEntity}
                  onCloseClick={closeModal}
                  onCompleted={handleCompleted}
                  onDeleteClick={handleDeleteClick}
                />
              )}
              {viewOption === "ARTWORKS" && editAlertEntity && (
                <SavedSearchAlertsArtworksQueryRenderer
                  editAlertEntity={editAlertEntity}
                  onCloseClick={closeModal}
                  onEditAlertClick={handleOpenEditForm}
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
              ...SavedSearchAlertListItem_item
              title: displayName(only: [artistIDs])
              subtitle: displayName(except: [artistIDs])
              artworksConnection(first: 10) {
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
