import { omit } from "lodash"
import React, { createContext, useReducer, useContext } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"

export type SortOptions = Array<{
  value: string
  text: string
}>

export interface ExhibitorFilters {
  sort?: string
}

export interface ExhibitorFilterContextProps {
  filters?: any
  sortOptions?: SortOptions
  setFilter: any
}

export const initialExhibitorFilterState: ExhibitorFilters = {
  sort: "-decayed_merch",
}

export const ExhibitorFilterContext = createContext<
  ExhibitorFilterContextProps
>({
  filters: initialExhibitorFilterState,
  sortOptions: [],
  setFilter: null,
})

export const ExhibitorFilterContextProvider: React.FC<any> = ({
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

    setFilter: (name, value) => {
      if (onFilterClick) {
        onFilterClick(name, value, {
          ...exhibitorFilterState,
          [name]: value,
        })
      }

      const action: any = {
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

const exhibitorFilterReducer = (state: any, action: any): any => {
  switch (action.type) {
    case "SET": {
      const { name, value } = action.payload

      let filterState: any = {}

      const primitiveFilterTypes: Array<keyof any> = ["sort"]
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
