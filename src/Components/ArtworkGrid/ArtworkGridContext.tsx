import { useCollectorSignals } from "System/Hooks/useCollectorSignals"
import { extractNodes } from "Utils/extractNodes"
import { ArtworkGridContext_artworksConnection$key } from "__generated__/ArtworkGridContext_artworksConnection.graphql"
import { ArtworkGridContext_me$key } from "__generated__/ArtworkGridContext_me.graphql"
import { createContext, useContext } from "react"
import { graphql, useFragment } from "react-relay"

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

  collectorSignals: ReturnType<typeof useCollectorSignals>
}

const ArtworkGridContext = createContext<ArtworkGridContextProps>({
  isAuctionArtwork: false,
  hideLotLabel: false,
  saveOnlyToDefaultList: false,
  collectorSignals: {},
})

type ArtworkGridContextProviderProps = {
  artworksConnection?: ArtworkGridContext_artworksConnection$key | null
  me?: ArtworkGridContext_me$key | null
} & Omit<ArtworkGridContextProps, "collectorSignals">

export const ArtworkGridContextProvider: React.FC<ArtworkGridContextProviderProps> = ({
  artworksConnection,
  me,
  children,
  ...rest
}) => {
  const artworksData = useFragment(
    ARTWORKS_CONNECTION_FRAGMENT,
    artworksConnection
  )
  const meData = useFragment(ME_FRAGMENT, me)

  const collectorSignals = useCollectorSignals({
    artworks: extractNodes(artworksData),
    partnerOffers: extractNodes(meData?.partnerOffersConnection),
  })

  return (
    <ArtworkGridContext.Provider value={{ ...rest, collectorSignals }}>
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

const ARTWORKS_CONNECTION_FRAGMENT = graphql`
  fragment ArtworkGridContext_artworksConnection on ArtworkConnectionInterface {
    edges {
      node {
        internalID
        isAcquireable
      }
    }
  }
`
const ME_FRAGMENT = graphql`
  fragment ArtworkGridContext_me on Me {
    partnerOffersConnection(first: 100) {
      edges {
        node {
          artworkId
          endAt
        }
      }
    }
  }
`
