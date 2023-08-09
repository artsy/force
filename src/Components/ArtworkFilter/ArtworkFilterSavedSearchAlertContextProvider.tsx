import { usePrepareFiltersForPills } from "Components/ArtworkFilter/Utils/usePrepareFiltersForPills"
import {
  SavedSearchAlertContextProvider,
  SavedSearchAlertContextProviderProps,
} from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { getSearchCriteriaFromFilters } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { FC } from "react"

interface ArtworkFilterSavedSearchAlertContextProviderProps
  extends Omit<SavedSearchAlertContextProviderProps, "criteria"> {}

/**
 * A simple component that just wraps the `SavedSearchAlertContextProvider` in order
 *  to omit the `criteria` prop, which is inferred from the filter context
 */
export const ArtworkFilterSavedSearchAlertContextProvider: FC<ArtworkFilterSavedSearchAlertContextProviderProps> = ({
  children,
  entity,
  ...rest
}) => {
  const filters = usePrepareFiltersForPills()
  const criteria = getSearchCriteriaFromFilters(entity, filters)

  return (
    <SavedSearchAlertContextProvider
      entity={entity}
      criteria={criteria}
      {...rest}
    >
      {children}
    </SavedSearchAlertContextProvider>
  )
}
