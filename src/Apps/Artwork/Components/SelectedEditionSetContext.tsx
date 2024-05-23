import { EditionSet } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarEditionSets"
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
