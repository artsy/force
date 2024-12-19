import { AlertProvider } from "Components/Alert/AlertProvider"
import { useCurrentlySelectedFilters } from "Components/ArtworkFilter/ArtworkFilterContext"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import type { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import type { FC } from "react"

interface ArtworkFilterAlertContextProviderProps {
  initialCriteria?: SearchCriteriaAttributes
}

/**
 * A component to wrap `AlertProvider` in order to omit the `criteria` prop,
 * which is inferred from the filter context.
 */
export const ArtworkFilterAlertContextProvider: FC<
  React.PropsWithChildren<ArtworkFilterAlertContextProviderProps>
> = ({ children, initialCriteria, ...rest }) => {
  const filters = useCurrentlySelectedFilters()
  const allowedFilters = getAllowedSearchCriteria(filters)

  const criteria = {
    ...allowedFilters,
    ...initialCriteria,
  }

  return (
    <AlertProvider initialCriteria={criteria} {...rest}>
      {children}
    </AlertProvider>
  )
}
