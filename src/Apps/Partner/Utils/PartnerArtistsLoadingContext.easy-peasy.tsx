import { createContextStore, Action, action } from "easy-peasy"
import { useContext, createContext } from "react"
import * as React from "react"

// Easy-peasy store model interface
interface PartnerArtistsLoadingStoreModel {
  // State
  isLoaded: boolean

  // Actions
  setIsLoaded: Action<PartnerArtistsLoadingStoreModel, boolean>
}

// Create the context store
export const PartnerArtistsLoadingStore =
  createContextStore<PartnerArtistsLoadingStoreModel>(runtimeModel => ({
    // State
    isLoaded: runtimeModel?.isLoaded || false,

    // Actions
    setIsLoaded: action((state, payload) => {
      state.isLoaded = payload
    }),
  }))

export interface PartnerArtistsLoadingContextProps {
  isLoaded?: boolean
  setIsLoaded?: (val: boolean) => void
}

// Legacy context for backward compatibility
export const PartnerArtistsLoadingContext =
  React.createContext<PartnerArtistsLoadingContextProps>({})

export const PartnerArtistsLoadingContextProvider: React.FC<
  React.PropsWithChildren<PartnerArtistsLoadingContextProps>
> = ({ children }) => {
  return (
    <PartnerArtistsLoadingStore.Provider>
      <PartnerArtistsLoadingProviderWrapper>
        {children}
      </PartnerArtistsLoadingProviderWrapper>
    </PartnerArtistsLoadingStore.Provider>
  )
}

// Internal wrapper to provide backward compatible context
const PartnerArtistsLoadingProviderWrapper: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const isLoaded = PartnerArtistsLoadingStore.useStoreState(
    state => state.isLoaded,
  )
  const { setIsLoaded } = PartnerArtistsLoadingStore.useStoreActions(
    actions => actions,
  )

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

// Backward compatible hook
export const usePartnerArtistsLoadingContext = () => {
  const partnerArtistsLoadingContext = useContext(PartnerArtistsLoadingContext)
  return partnerArtistsLoadingContext
}
