import * as React from "react"
import { useContext, useState } from "react"

export interface PartnerArtistsLoadingContextProps {
  isLoaded?: boolean
  setIsLoaded?: (val: boolean) => void
}

export const PartnerArtistsLoadingContext =
  React.createContext<PartnerArtistsLoadingContextProps>({})

export const PartnerArtistsLoadingContextProvider: React.FC<
  React.PropsWithChildren<PartnerArtistsLoadingContextProps>
> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const partnerArtistsLoadingContext: PartnerArtistsLoadingContextProps = {
    isLoaded,
    setIsLoaded,
  }

  return (
    <PartnerArtistsLoadingContext.Provider value={partnerArtistsLoadingContext}>
      {children}
    </PartnerArtistsLoadingContext.Provider>
  )
}

export const usePartnerArtistsLoadingContext = () => {
  const partnerArtistsLoadingContext = useContext(PartnerArtistsLoadingContext)
  return partnerArtistsLoadingContext
}
