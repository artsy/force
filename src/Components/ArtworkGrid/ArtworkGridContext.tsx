import { createContext, useContext } from "react"

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
}

const ArtworkGridContext = createContext<ArtworkGridContextProps>({
  isAuctionArtwork: false,
  hideLotLabel: false,
})

export const ArtworkGridContextProvider: React.FC<ArtworkGridContextProps> = ({
  children,
  ...rest
}) => {
  return (
    <ArtworkGridContext.Provider value={rest}>
      {children}
    </ArtworkGridContext.Provider>
  )
}

export const useArtworkGridContext = () => {
  const artworkGridContext = useContext(ArtworkGridContext) ?? {}
  return artworkGridContext
}

export const withArtworkGridContext = <T,>(
  Component: React.ComponentType<T>
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
