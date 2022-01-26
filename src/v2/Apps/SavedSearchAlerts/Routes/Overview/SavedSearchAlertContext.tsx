import { createContext, useContext, useMemo, useState } from "react"
import {
  Aggregations,
  ArtworkFilters,
  initialArtworkFilterState,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import {
  SearchCriteriaAttributes,
  SavedSearchAttributes,
} from "v2/Components/ArtworkFilter/SavedSearch/types"
import { FilterPill } from "v2/Components/ArtworkFilter/SavedSearch/Utils/FilterPillsContext"
import { SavedSearchAleftFormValues } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"
import { extractPills } from "v2/Components/SavedSearchAlert/Utils/extractPills"

interface InitOptions {
  userSettings: SavedSearchAleftFormValues
  aggregations: Aggregations
  searchCriteriaAttributes: SearchCriteriaAttributes
  attributes: SavedSearchAttributes
}

type UserSettingsState = SavedSearchAleftFormValues | null
type SearchCriteriaAttributesState = SearchCriteriaAttributes | null
type AttributesState = SavedSearchAttributes | null

export type SavedSearchAlertContextState = {
  userSettings: UserSettingsState | null
  aggregations: Aggregations | []
  searchCriteriaAttributes: SearchCriteriaAttributesState
  pills: FilterPill[]
  attributes: AttributesState
  reset: () => void
  init: (options: InitOptions) => void
  removePill: (pill: FilterPill) => void
}

export const SavedSearchAlertContext = createContext<
  SavedSearchAlertContextState
>({} as SavedSearchAlertContextState)

export const SavedSearchAlertContextProvider: React.FC = ({ children }) => {
  const [userSettings, setUserSettings] = useState<UserSettingsState>(null)
  const [aggregations, setAggregations] = useState<Aggregations>([])
  const [attributes, setAttributes] = useState<AttributesState>(null)
  const [searchCriteriaAttributes, setSearchCriteriaAttributes] = useState<
    SearchCriteriaAttributesState
  >(null)

  const pills = useMemo<FilterPill[]>(() => {
    if (searchCriteriaAttributes && attributes) {
      return extractPills(
        searchCriteriaAttributes as ArtworkFilters,
        aggregations,
        attributes!
      )
    }

    return []
  }, [aggregations, searchCriteriaAttributes, attributes])

  const reset = () => {
    setUserSettings(null)
    setAggregations([])
    setSearchCriteriaAttributes(null)
    setAttributes(null)
  }

  const init = (options: InitOptions) => {
    setUserSettings(options.userSettings)
    setAggregations(options.aggregations)
    setSearchCriteriaAttributes(options.searchCriteriaAttributes)
    setAttributes(options.attributes)
  }

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    let filterValue = searchCriteriaAttributes![pill.filterName]

    if (Array.isArray(filterValue)) {
      filterValue = filterValue.filter(value => value !== pill.name)
    } else {
      filterValue = initialArtworkFilterState[pill.filterName]
    }

    setSearchCriteriaAttributes({
      ...searchCriteriaAttributes,
      [pill.filterName]: filterValue,
    })
  }

  const providerValues: Required<SavedSearchAlertContextState> = {
    userSettings,
    aggregations,
    pills,
    searchCriteriaAttributes,
    attributes,
    init,
    reset,
    removePill,
  }

  return (
    <SavedSearchAlertContext.Provider value={providerValues}>
      {children}
    </SavedSearchAlertContext.Provider>
  )
}

export const useSavedSearchAlertContext = () => {
  return useContext(SavedSearchAlertContext)
}
