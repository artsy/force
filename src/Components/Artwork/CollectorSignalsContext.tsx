import { createContext, useContext } from "react"

interface CollectorSignalsContextProps {
  showCollectorSignalBadge?: boolean
}

const CollectorSignalsContext = createContext<CollectorSignalsContextProps>({
  showCollectorSignalBadge: false,
})

export const CollectorSignalsContextProvider: React.FC<CollectorSignalsContextProps> = ({
  children,
  ...rest
}) => {
  return (
    <CollectorSignalsContext.Provider value={rest}>
      {children}
    </CollectorSignalsContext.Provider>
  )
}

export const useCollectorSignalsContext = () => {
  const context = useContext(CollectorSignalsContext) ?? {}
  return context
}
