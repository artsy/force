import { GridColumns, Column, FullBleed, Separator } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useState } from "react"
import { SavedSearchAlertsOverviewRoute_me } from "v2/__generated__/SavedSearchAlertsOverviewRoute_me.graphql"
import { Media } from "v2/Utils/Responsive"
import { EditAlertEntity } from "./types"
import { extractNodes } from "v2/Utils/extractNodes"
import { SavedSearchAlertDeleteModal } from "./components/SavedSearchAlertDeleteModal"
import {
  SavedSearchAlertListItemFragmentContainer,
  SavedSearchAlertListItemVariant,
} from "./components/SavedSearchAlertListItem"
import { SavedSearchAlertEditDesktop } from "./components/SavedSearchAlertEditDesktop"
import { SavedSearchAlertEditMobile } from "./components/SavedSearchAlertEditMobile"

interface SavedSearchAlertsOverviewRouteProps {
  me: SavedSearchAlertsOverviewRoute_me
  relay: RelayPaginationProp
}

export const SavedSearchAlertsOverviewRoute: React.FC<SavedSearchAlertsOverviewRouteProps> = ({
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
      {alerts.map(edge => {
        const isSelected = editAlertEntity?.id === edge.internalID
        let variant: SavedSearchAlertListItemVariant | undefined

        if (editAlertEntity?.id === edge.internalID) {
          variant = "active"
        } else if (!!editAlertEntity && !isSelected) {
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
    </>
  )

  return (
    <FullBleed>
      <Separator backgroundColor="black15" />

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
  )
}

export const SavedSearchAlertsOverviewRoutePaginationContainer = createPaginationContainer(
  SavedSearchAlertsOverviewRoute,
  {
    me: graphql`
      fragment SavedSearchAlertsOverviewRoute_me on Me {
        savedSearchesConnection(first: 50)
          @connection(
            key: "SavedSearchAlertsOverviewRoute_savedSearchesConnection"
          ) {
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
      query SavedSearchAlertsOverviewRouteRefetchQuery {
        me {
          ...SavedSearchAlertsOverviewRoute_me
        }
      }
    `,
  }
)
