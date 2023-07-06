import { createContext, useContext, useState } from "react"

type ArtworkListVisibility = {
  touched: boolean
  setTouched: (value: boolean) => void
}

const ArtworkListVisibilityContext = createContext<ArtworkListVisibility>({
  touched: false,
  setTouched: (_value: boolean) => {},
})

export const ArtworkListVisibilityProvider: React.FC = ({ children }) => {
  const [touched, setTouched] = useState(false)

  return (
    <ArtworkListVisibilityContext.Provider value={{ touched, setTouched }}>
      {children}
    </ArtworkListVisibilityContext.Provider>
  )
}

export const useArtworkListVisibilityContext = () => {
  const { touched, setTouched } = useContext(ArtworkListVisibilityContext)

  return {
    /** True if any Artwork List card has been selected from the Artwork Lists rail */
    artworkListItemHasBeenTouched: touched,

    /** To be called once any Artwork List card has been selected */
    setArtworkListItemHasBeenTouched: () => setTouched(true),
  }
}
