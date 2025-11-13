import { createContext, useCallback, useContext, useState } from "react"

/**
 * Used to configure internal details of the Artwork Grid / Brick without
 * needing to pass props all the way through the artwork filter on down.
 */
interface ArtworkGridContextProps {
  /**
   * If its an auction artwork, no need to show bid badge, and show lot number
   */
  isAuctionArtwork?: boolean

  hideLotLabel?: boolean

  saveOnlyToDefaultList?: boolean

  hideSignals?: boolean

  signals?: { [id: string]: string[] }

  updateSignals?: (id: string, newSignals: string[]) => void
}

const ArtworkGridContext = createContext<ArtworkGridContextProps>({
  isAuctionArtwork: false,
  hideLotLabel: false,
  saveOnlyToDefaultList: false,
  hideSignals: false,
  signals: {},
  updateSignals: () => {},
})

export const ArtworkGridContextProvider: React.FC<
  React.PropsWithChildren<ArtworkGridContextProps>
> = ({ children, ...rest }) => {
  const [signals, setSignals] = useState<{ [id: string]: string[] }>({})

  const updateSignals = useCallback((id: string, newSignals: string[]) => {
    setSignals(prevSignals => ({
      ...prevSignals,
      [id]: newSignals,
    }))
  }, [])

  return (
    <ArtworkGridContext.Provider
      value={{
        ...rest,
        signals,
        updateSignals,
      }}
    >
      {children}
    </ArtworkGridContext.Provider>
  )
}

export const useArtworkGridContext = () => {
  const artworkGridContext = useContext(ArtworkGridContext) ?? {}
  return artworkGridContext
}

export const withArtworkGridContext = <T,>(
  Component: React.ComponentType<React.PropsWithChildren<T>>
) => {
  return (props: T) => {
    return (
      <ArtworkGridContext.Consumer>
        {contextValues => {
          return <Component {...contextValues} {...props} />
        }}
      </ArtworkGridContext.Consumer>
    )
  }
}
