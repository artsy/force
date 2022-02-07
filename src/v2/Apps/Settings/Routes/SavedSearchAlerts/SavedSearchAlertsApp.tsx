import {
  GridColumns,
  Column,
  FullBleed,
  Separator,
  Box,
  Join,
  useToasts,
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

interface SavedSearchAlertsAppProps {
  me: SavedSearchAlertsApp_me
  relay: RelayPaginationProp
}

export const SavedSearchAlertsApp: React.FC<SavedSearchAlertsAppProps> = ({
  me,
  relay,
}) => {
  const [
    editAlertEntity,
    setEditAlertEntity,
  ] = useState<EditAlertEntity | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { sendToast } = useToasts()
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null

  const closeEditForm = () => {
    setEditAlertEntity(null)
  }

  const closeEditFormAndRefetch = () => {
    closeEditForm()
    relay.refetchConnection(50)
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

  const list = (
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
  )

  return (
    <Box>
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
                  <Column span={6}>
                    <SavedSearchAlertEditFormContainer
                      editAlertEntity={editAlertEntity}
                      onCloseClick={closeEditForm}
                      onCompleted={handleCompleted}
                      onDeleteClick={handleDeleteClick}
                    />
                  </Column>
                )}
              </GridColumns>
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
    </Box>
  )
}

export const SavedSearchAlertsAppPaginationContainer = createPaginationContainer(
  SavedSearchAlertsApp,
  {
    me: graphql`
      fragment SavedSearchAlertsApp_me on Me {
        savedSearchesConnection(first: 50)
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
      query SavedSearchAlertsAppRefetchQuery {
        me {
          ...SavedSearchAlertsApp_me
        }
      }
    `,
  }
)
