import {
  GridColumns,
  Column,
  FullBleed,
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
import { SavedSearchAlertEditFormContainer } from "./Components/SavedSearchAlertEditFormContainter"
import { Sticky, StickyProvider } from "v2/Components/Sticky"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

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
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null

  const closeEditForm = () => {
    setEditAlertEntity(null)
  }

  const closeEditFormAndRefetch = () => {
    closeEditForm()
    relay.refetchConnection(15)
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
        {alerts.map((edge, index) => {
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
      <MetaTags title="Your Alerts | Artsy" pathname="/user/alerts" />

      <Media greaterThanOrEqual="md">
        <SavedSearchAlertHeader />
      </Media>
      <Media lessThan="md">{!isEditMode && <SavedSearchAlertHeader />}</Media>

      <FullBleed>
        <Media greaterThanOrEqual="md">
          <Separator color="black15" />
        </Media>

        <Media lessThan="md">
          {!isEditMode && <Separator color="black15" />}
        </Media>

        {alerts.length === 0 ? (
          <SavedSearchAlertsEmptyResults />
        ) : (
          <>
            <Media greaterThanOrEqual="md">
              <GridColumns gridColumnGap={0}>
                <Column span={isEditMode ? 6 : 12}>{list}</Column>
                {isEditMode && editAlertEntity && (
                  <Column span={6} borderLeft="1px solid" borderColor="black15">
                    <Sticky bottomBoundary="#content-end">
                      <Box
                        overflowY="scroll"
                        maxHeight={`calc(100vh - ${desktop}px)`}
                      >
                        <SavedSearchAlertEditFormContainer
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
              {isEditMode && editAlertEntity ? (
                <SavedSearchAlertEditFormContainer
                  editAlertEntity={editAlertEntity}
                  onCloseClick={closeEditForm}
                  onCompleted={handleCompleted}
                  onDeleteClick={handleDeleteClick}
                />
              ) : (
                list
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
      </FullBleed>
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
          count: { type: "Int", defaultValue: 15 }
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
