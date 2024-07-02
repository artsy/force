import {
  GridColumns,
  Column,
  Separator,
  Box,
  Join,
  useToasts,
  Button,
  Flex,
  FullBleed,
  Stack,
  THEME,
} from "@artsy/palette"
import {
  createPaginationContainer,
  Environment,
  fetchQuery,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useCallback, useEffect, useMemo, useState } from "react"
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
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SavedSearchAlertsApp_Alert_Query } from "__generated__/SavedSearchAlertsApp_Alert_Query.graphql"
import { SavedSearchAlertEditFormQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/SavedSearchAlertEditForm"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { SavedSearchAlertsArtworksQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/SavedSearchAlertsArtworks"
import { Jump } from "Utils/Hooks/useJump"

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

  const xs = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const sm = __internal__useMatchMedia(THEME.mediaQueries.sm)
  const isMobile = xs || sm

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
      // "/favorites/alerts" is called from the tab of side menu
      setViewOption("EDIT")
      silentPush(`/favorites/alerts/${alerts[0].internalID}/edit`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, match.params])

  const closeModal = () => {
    setEditAlertEntity(null)
    setViewOption(null)
    silentPush("/favorites/alerts")
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
      silentPush(`/favorites/alerts/${alerts[1].internalID}/edit`)
    } else if (editAlertEntity?.id !== alerts[0].internalID) {
      setEditAlertEntity({
        id: alerts[0].internalID,
        name: alerts[0].title ?? "",
        artistIds: alerts[0]?.artistIDs as string[],
      })
      silentPush(`/favorites/alerts/${alerts[0].internalID}/edit`)
    } else {
      // if we deleted the last alert we display the screen's empty state
      setEditAlertEntity(null)
      silentPush("/favorites/alerts/")
    }
  }

  const handleLoadMore = useCallback(() => {
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
  }, [relay])

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
          silentPush(`/favorites/alerts/${alert.internalID}/artworks`)
        } else {
          setViewOption("EDIT")
          silentPush(`/favorites/alerts/${alert.internalID}/edit`)
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertID, relayEnvironment])

  const list = useMemo(
    () => (
      <>
        <Join separator={<Separator borderColor="black5" />}>
          {alerts.map(node => {
            if (node === null) {
              return
            }
            const isCurrentEdgeSelected =
              editAlertEntity?.id === node.internalID
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
                  silentPush(`/favorites/alerts/${entity.id}/edit`)
                }}
                onViewArtworksClick={entity => {
                  setEditAlertEntity(entity)
                  setViewOption("ARTWORKS")
                  silentPush(`/favorites/alerts/${entity.id}/artworks`)
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
    ),
    [alerts, editAlertEntity, handleLoadMore, loading, relay, silentPush]
  )

  return (
    <>
      <MetaTags title="Alerts | Artsy" pathname="/favorites/alerts" />

      {alerts.length === 0 ? (
        <SavedSearchAlertsEmptyResults />
      ) : (
        <>
          <Stack gap={2}>
            <SavedSearchAlertHeader
              selected={sort}
              onSortSelect={handleSortSelect}
            />

            <FullBleed>
              <Jump id="Alerts" />

              <Separator color="black15" />

              <Media greaterThanOrEqual="md">
                <GridColumns gridColumnGap={0}>
                  <Column span={6} pb={4}>
                    {list}
                  </Column>

                  <Column
                    span={6}
                    borderLeft="1px solid"
                    borderLeftColor="black15"
                    borderRightColor="black15"
                  >
                    <Flex
                      flexDirection="column"
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
              </Media>

              <Media lessThan="md">
                <Box pb={4}>{list}</Box>

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
            </FullBleed>
          </Stack>

          {showDeleteModal && editAlertEntity && (
            <SavedSearchAlertDeleteModal
              id={editAlertEntity.id}
              onCloseClick={closeDeleteModal}
              onDeleted={handleDeleted}
            />
          )}
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
