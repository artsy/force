import { createContext, FC, useContext } from "react"

export interface CollectorProfileSaves2ContextValue {
  activeCollectionId: string
  setActiveCollectionId: (id: string) => void
  onDeleteCollection: (id: string) => void
}

export const CollectorProfileSaves2Context = createContext<
  CollectorProfileSaves2ContextValue
>({
  activeCollectionId: "",
  setActiveCollectionId: () => {},
  onDeleteCollection: () => {},
})

export const CollectorProfileSaves2ContextProvider: FC<{
  value: CollectorProfileSaves2ContextValue
}> = ({ value, children }) => {
  return (
    <CollectorProfileSaves2Context.Provider value={value}>
      {children}
    </CollectorProfileSaves2Context.Provider>
  )
}

export const useCollectorProfileSaves2Context = () => {
  return useContext(CollectorProfileSaves2Context)
}
