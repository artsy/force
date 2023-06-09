import { createContext, useContext, useState } from "react"

type ArtworkListVisibility = {
  // has any Artwork List card been selected?
  touched: boolean
  setTouched: (value: boolean) => void

  // have we already performed the auto-scroll at least once?
  scrolled: boolean
  setScrolled: (value: boolean) => void
}

const ArtworkListVisibilityContext = createContext<ArtworkListVisibility>({
  touched: false,
  setTouched: (_value: boolean) => {},
  scrolled: false,
  setScrolled: (_value: boolean) => {},
})

export const ArtworkListVisibilityProvider: React.FC = ({ children }) => {
  const [touched, setTouched] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  return (
    <ArtworkListVisibilityContext.Provider
      value={{ touched, setTouched, scrolled, setScrolled }}
    >
      {children}
    </ArtworkListVisibilityContext.Provider>
  )
}

export const useArtworkListVisibilityContext = () => {
  const { touched, setTouched, scrolled, setScrolled } = useContext(
    ArtworkListVisibilityContext
  )

  return {
    /** True if any Artwork List card has been selected from the Artwork Lists rail */
    artworkListItemHasBeenTouched: touched,

    /** To be called once any Artwork List card has been selected */
    setArtworkListItemHasBeenTouched: () => setTouched(true),

    /** True if we have already auto-scrolled the Artwork List page */
    artworkListHasBeenScrolled: scrolled,

    /** To be called once we have auto-scrolled the Artwork List page */
    setArtworkListHasBeenScrolled: () => setScrolled(true),
  }
}
