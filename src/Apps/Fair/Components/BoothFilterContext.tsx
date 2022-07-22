import { createContext, useReducer, useContext } from "react"
import * as React from "react"
import { omit } from "lodash"
import useDeepCompareEffect from "use-deep-compare-effect"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/urlBuilder"
import { SortOptions } from "Components/SortFilter"

export interface BoothFilters {
  sort?: string
  page?: number
}

export interface BoothFiltersState extends BoothFilters {
  reset?: boolean
}

export interface BoothFilterContextProps {
  filters?: BoothFiltersState
  sortOptions?: SortOptions
  setFilter: (name: keyof BoothFilters, value: any) => void
  onFilterClick?: (
    key: keyof BoothFilters,
    value: string,
    filterState: BoothFilters
  ) => void
}

export type SharedBoothFilterContextProps = Pick<
  BoothFilterContextProps,
  "filters" | "sortOptions" | "onFilterClick"
> & {
  onChange?: (filterState) => void
}

interface BoothFiltersAction {
  type: "SET"
  payload: { name: keyof BoothFilters; value?: any }
}

export const initialBoothFilterState: BoothFilters = {
  sort: "FEATURED_DESC",
  page: 1,
}

export const BoothFilterContext = createContext<BoothFilterContextProps>({
  filters: initialBoothFilterState,
  sortOptions: [],
  setFilter: () => {},
})

export const BoothFilterContextProvider: React.FC<SharedBoothFilterContextProps> = ({
  children,
  filters = {},
  sortOptions,
  onFilterClick,
  onChange,
}) => {
  const initialFilterState = {
    ...initialBoothFilterState,
    ...paramsToCamelCase(filters),
  }

  const [boothFilterState, dispatch] = useReducer(
    boothFilterReducer,
    initialFilterState
  )

  const boothFilterContext = {
    filters: boothFilterState,
    sortOptions,

    onFilterClick,

    setFilter: (name, value) => {
      if (onFilterClick) {
        onFilterClick(name, value, {
          ...boothFilterState,
          [name]: value,
        })
      }

      const action: BoothFiltersAction = {
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
      onChange(omit(boothFilterState, ["reset"]))
    }
  }, [boothFilterState])

  return (
    <BoothFilterContext.Provider value={boothFilterContext}>
      {children}
    </BoothFilterContext.Provider>
  )
}

const boothFilterReducer = (
  state: BoothFiltersState,
  action: BoothFiltersAction
): BoothFiltersState => {
  switch (action.type) {
    case "SET": {
      const { name, value } = action.payload

      let filterState: BoothFilters = { page: 1 }

      if (name === "page") {
        filterState[name] = Number(value)
      }

      const primitiveFilterTypes: Array<keyof BoothFilters> = ["sort"]
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

export const useBoothsFilterContext = () => {
  const boothFilterContext = useContext(BoothFilterContext)
  return boothFilterContext
}
