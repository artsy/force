import React, { useContext, useState } from "react"

export interface PartnerArtistsLoadingContextProps {
  isLoaded?: boolean
  setIsLoaded?: (val: boolean) => void
  onArtistsLoaded?: () => void
}

export type SharedPartnerArtistsLoadingContextProps = Pick<
  PartnerArtistsLoadingContextProps,
  "onArtistsLoaded"
>

export const PartnerArtistsLoadingContext = React.createContext<
  PartnerArtistsLoadingContextProps
>({})

export const PartnerArtistsLoadingContextProvider: React.FC<SharedPartnerArtistsLoadingContextProps> = ({
  children,
  onArtistsLoaded,
}) => {
  const [isLoaded, setIsLoadedValue] = useState(false)

  const setIsLoaded = (val: boolean) => {
    setIsLoadedValue(val)

    onArtistsLoaded && onArtistsLoaded()
  }

  const partnerArtistsLoadingContext: PartnerArtistsLoadingContextProps = {
    isLoaded,
    setIsLoaded,
    onArtistsLoaded,
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
