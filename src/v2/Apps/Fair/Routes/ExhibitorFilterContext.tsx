import { omit } from "lodash"
import React, { createContext, useReducer, useContext } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { SortOptions } from "v2/Components/SortFilter"

export interface ExhibitorFilters {
  sort?: string
}

export interface ExhibitorFiltersState extends ExhibitorFilters {
  reset?: boolean
}

export interface ExhibitorFilterContextProps {
  filters?: ExhibitorFiltersState
  sortOptions?: SortOptions
  setFilter: (name: keyof ExhibitorFilters, value: any) => void
  onFilterClick?: (
    key: keyof ExhibitorFilters,
    value: string,
    filterState: ExhibitorFilters
  ) => void
}

export type SharedExhibitorFilterContextProps = Pick<
  ExhibitorFilterContextProps,
  "filters" | "sortOptions" | "onFilterClick"
> & {
  onChange?: (filterState) => void
}

interface ExhibitorFiltersAction {
  type: "SET"
  payload: { name: keyof ExhibitorFilters; value?: any }
}

export const initialExhibitorFilterState: ExhibitorFilters = {
  sort: "-decayed_merch",
}

export const ExhibitorFilterContext = createContext<
  ExhibitorFilterContextProps
>({
  filters: initialExhibitorFilterState,
  sortOptions: [],
  setFilter: () => {},
})

export const ExhibitorFilterContextProvider: React.FC<SharedExhibitorFilterContextProps> = ({
  children,
  filters = {},
  sortOptions,
  onFilterClick,
  onChange,
}) => {
  const initialFilterState = {
    ...initialExhibitorFilterState,
    ...paramsToCamelCase(filters),
  }

  const [exhibitorFilterState, dispatch] = useReducer(
    exhibitorFilterReducer,
    initialFilterState
  )

  const exhibitorFilterContext = {
    filters: exhibitorFilterState,
    sortOptions,

    onFilterClick,

    setFilter: (name, value) => {
      if (onFilterClick) {
        onFilterClick(name, value, {
          ...exhibitorFilterState,
          [name]: value,
        })
      }

      const action: ExhibitorFiltersAction = {
        type: "SET",
        payload: {
          name,
          value,
        },
      }

      dispatch(action)
    },
  }

  useDeepCompareEffect(() => {
    if (onChange) {
      onChange(omit(exhibitorFilterState, ["reset"]))
    }
  }, [exhibitorFilterState])

  return (
    <ExhibitorFilterContext.Provider value={exhibitorFilterContext}>
      {children}
    </ExhibitorFilterContext.Provider>
  )
}

const exhibitorFilterReducer = (
  state: ExhibitorFiltersState,
  action: ExhibitorFiltersAction
): ExhibitorFiltersState => {
  switch (action.type) {
    case "SET": {
      const { name, value } = action.payload

      let filterState: ExhibitorFilters = {}

      const primitiveFilterTypes: Array<keyof ExhibitorFilters> = ["sort"]
      primitiveFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value
        }
      })

      delete state.reset

      return {
        ...state,
        ...filterState,
      }
    }

    default:
      return state
  }
}

export const useExhibitorsFilterContext = () => {
  const exhibitorFilterContext = useContext(ExhibitorFilterContext)
  return exhibitorFilterContext
}
