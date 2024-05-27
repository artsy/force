import { createContext, useContext } from "react"

interface ArtworkFormContextProps {
  onBack: () => void
  onNext: () => void
}

export const ArtworkFormContext = createContext<ArtworkFormContextProps>({
  onBack: () => {},
  onNext: () => {},
})

export const ArtworkFormContextProvider: React.FC<ArtworkFormContextProps> = ({
  children,
  ...rest
}) => {
  return (
    <ArtworkFormContext.Provider value={rest}>
      {children}
    </ArtworkFormContext.Provider>
  )
}

export const useArtworkFormContext = () => {
  const artworkFormContext = useContext(ArtworkFormContext) ?? {}
  return artworkFormContext
}
