import { GridColumns, Column, FullBleed, Separator, Box } from "@artsy/palette"
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
import { SavedSearchAlertEditDesktop } from "./Components/SavedSearchAlertEditDesktop"
import { SavedSearchAlertEditMobile } from "./Components/SavedSearchAlertEditMobile"
import { SavedSearchAlertHeader } from "./Components/SavedSearchAlertHeader"

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
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null

  const handleCloseClick = () => {
    setEditAlertEntity(null)
  }

  const handleCompleted = () => {
    handleCloseClick()
    relay.refetchConnection(50)
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const handleDeleted = () => {
    handleCompleted()
    handleCloseDeleteModal()
  }

  const list = (
    <>
      {alerts.map((edge, index) => {
        const isLastEdge = alerts.length === index + 1
        const isCurrentEdgeSelected = editAlertEntity?.id === edge.internalID
        const nextEdgeId = alerts[index + 1]?.internalID
        const isNextEdgeSelected =
          !!nextEdgeId && nextEdgeId === editAlertEntity?.id

        const isInvisibleSeparator =
          isCurrentEdgeSelected || isNextEdgeSelected || isLastEdge
        let variant: SavedSearchAlertListItemVariant | undefined

        if (editAlertEntity?.id === edge.internalID) {
          variant = "active"
        } else if (!!editAlertEntity && !isCurrentEdgeSelected) {
          variant = "inactive"
        }

        return (
          <>
            <SavedSearchAlertListItemFragmentContainer
              key={edge.internalID}
              item={edge}
              variant={variant}
              onEditAlertClick={setEditAlertEntity}
            />
            <Box mx={[2, 4]}>
              <Separator
                color={isInvisibleSeparator ? "transparent" : undefined}
              />
            </Box>
          </>
        )
      })}
    </>
  )

  return (
    <Box>
      <Media greaterThanOrEqual="md">
        <SavedSearchAlertHeader />
        <Separator backgroundColor="black15" />
      </Media>
      <Media lessThan="md">{!isEditMode && <SavedSearchAlertHeader />}</Media>

      <FullBleed>
        <Media greaterThanOrEqual="md">
          <GridColumns gridColumnGap={0}>
            <Column span={isEditMode ? 6 : 12}>{list}</Column>
            {isEditMode && editAlertEntity && (
              <Column span={6}>
                <SavedSearchAlertEditDesktop
                  editAlertEntity={editAlertEntity}
                  onCloseClick={handleCloseClick}
                  onCompleted={handleCompleted}
                  onDeleteClick={handleDeleteClick}
                />
              </Column>
            )}
          </GridColumns>
        </Media>

        <Media lessThan="md">
          {isEditMode && editAlertEntity ? (
            <SavedSearchAlertEditMobile
              editAlertEntity={editAlertEntity}
              onCloseClick={handleCloseClick}
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
            onCloseClick={handleCloseDeleteModal}
            onDeleted={handleDeleted}
          />
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
