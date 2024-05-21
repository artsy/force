import { createContext, useContext, useState } from "react"

interface SelectedEditionSetContextType {
  selectedEditionSet: EditionSet
  setSelectedEditionSet: (value: EditionSet) => void
}

const SelectedEditionSetContext = createContext<SelectedEditionSetContextType>({
  selectedEditionSet: null,
  setSelectedEditionSet: (_value: EditionSet) => {},
})

export const SelectedEditionSetProvider: React.FC = ({ children }) => {
  const [selectedEditionSet, setSelectedEditionSet] = useState<EditionSet>(null)

  return (
    <SelectedEditionSetContext.Provider
      value={{ selectedEditionSet, setSelectedEditionSet }}
    >
      {children}
    </SelectedEditionSetContext.Provider>
  )
}

export const useSelectedEditionSetContext = () => {
  return useContext(SelectedEditionSetContext)
}

// import { EditionSet } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarEditionSets"
// import { createContext, FC, useContext } from "react"

// const SelectedEditionSetContextContext = createContext({
//   selectedEditionSet: null,
// })

// interface SelectedEditionSetContextContextProviderProps {
//   selectedEditionSet: EditionSet | null | undefined
// }

// export const SelectedEditionSetContextContextProvider: FC<SelectedEditionSetContextContextProviderProps> = ({
//   selectedEditionSet,
//   children,
// }) => {

//   const [value, setValue] = useState<string>("initial value")

//   return (
//     <SelectedEditionSetContextContext.Provider value={{ selectedEditionSet, setSelectedEditionSet }}>
//       {children}
//     </SelectedEditionSetContextContext.Provider>
//   )
// }

// export const useSelectedEditionSetContextContext = () => {
//   return useContext(SelectedEditionSetContextContext)
// }
