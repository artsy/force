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
import {
  SavedSearchAlertContextProvider,
  useSavedSearchAlertContext,
} from "./SavedSearchAlertContext"
import { SavedSearchAleftFormValues } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"
import { getSearchCriteriaFromFilters } from "v2/Components/ArtworkFilter/SavedSearch/Utils"
import { useEditSavedSearchAlert } from "./useEditSavedSearchAlert"
import createLogger from "v2/Utils/logger"
import { ArtworkFilters } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { getNamePlaceholder } from "v2/Components/SavedSearchAlert/Utils/getNamePlaceholder"
import { SavedSearchEditFormDesktop } from "./components/SavedSearchEditFormDesktop"
import { SavedSearchEditFormMobile } from "./components/SavedSearchEditFormMobile"
import { SavedSearchAlertDeleteModal } from "./components/SavedSearchAlertDeleteModal"
import {
  SavedSearchAlertListItemFragmentContainer,
  SavedSearchAlertListItemVariant,
} from "./components/SavedSearchAlertListItem"

const logger = createLogger(
  "v2/Apps/SavedSearchAlerts/Routes/Overview/SavedSearchAlertsOverviewRoute.tsx"
)

interface SavedSearchAlertsOverviewRouteProps {
  me: SavedSearchAlertsOverviewRoute_me
  relay: RelayPaginationProp
}

const defaultUserSettings: SavedSearchAleftFormValues = {
  name: "",
  push: false,
  email: false,
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
  const {
    userSettings,
    entity,
    searchCriteriaAttributes,
    pills,
    reset,
  } = useSavedSearchAlertContext()
  const { submitMutation: submitEditAlert } = useEditSavedSearchAlert()
  const alerts = extractNodes(me.savedSearchesConnection)
  const isEditMode = editAlertEntity !== null
  const initialValues = userSettings ?? defaultUserSettings

  const handleCloseClick = () => {
    setEditAlertEntity(null)
    reset()
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

  const handleSubmit = async (values: SavedSearchAleftFormValues) => {
    try {
      const namePlaceholder = getNamePlaceholder(entity!.name, pills)
      const searchCriteria = getSearchCriteriaFromFilters(
        entity!.id,
        searchCriteriaAttributes as ArtworkFilters
      )
      await submitEditAlert({
        input: {
          searchCriteriaID: editAlertEntity!.id,
          attributes: searchCriteria,
          userAlertSettings: {
            ...values,
            name: values.name || namePlaceholder,
          },
        },
      })

      handleCompleted()
    } catch (error) {
      logger.error(error)
    }
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
              <SavedSearchEditFormDesktop
                initialValues={initialValues}
                editAlertEntity={editAlertEntity}
                onSubmit={handleSubmit}
                onCloseClick={handleCloseClick}
                onDeleteClick={handleDeleteClick}
              />
            </Column>
          )}
        </GridColumns>
      </Media>

      <Media lessThan="md">
        {list}
        {isEditMode && editAlertEntity && (
          <SavedSearchEditFormMobile
            initialValues={initialValues}
            editAlertEntity={editAlertEntity}
            onSubmit={handleSubmit}
            onCloseClick={handleCloseClick}
            onDeleteClick={handleDeleteClick}
          />
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

const SavedSearchAlertsOverviewRouteContainer: React.FC<SavedSearchAlertsOverviewRouteProps> = props => {
  return (
    <SavedSearchAlertContextProvider>
      <SavedSearchAlertsOverviewRoute {...props} />
    </SavedSearchAlertContextProvider>
  )
}

export const SavedSearchAlertsOverviewRoutePaginationContainer = createPaginationContainer(
  SavedSearchAlertsOverviewRouteContainer,
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
