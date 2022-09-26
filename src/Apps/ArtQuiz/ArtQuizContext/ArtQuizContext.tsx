import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { extractNodes } from "Utils/extractNodes"

// TODO: Kill all the anys!!
export interface ArtQuizContextValues {
  artworks: any[]
  artworksTotalCount: number
  currentArtwork: any | null
  currentIndex: number
  markItemComplete: (
    artworkSlug: keyof ArtQuizContextValues["quizTemplate"]
  ) => void
  nextArtwork: any | null
  previousArtwork: any | null
  stepForward: () => void
  stepBackward: () => void
  quizTemplate: Record<string, boolean>
}

export const ArtQuizContext = createContext<ArtQuizContextValues>({
  artworks: [],
  artworksTotalCount: 0,
  currentArtwork: null,
  currentIndex: 0,
  nextArtwork: null,
  previousArtwork: null,
  markItemComplete: (_: keyof ArtQuizContextValues["quizTemplate"]) => {
    throw new Error("ArtQuizContext not initialized")
  },
  stepForward: () => {
    throw new Error("ArtQuizContext not initialized")
  },
  stepBackward: () => {
    throw new Error("ArtQuizContext not initialized")
  },
  quizTemplate: {},
})

export const ArtQuizContextProvider: FC = ({ children }) => {
  // Quiz template should be the source of truth for the content and state of a
  // particular user's quiz. A stringified version will be stored in a table
  // with the userId as its key.
  const [quizTemplate, setQuizTemplate] = useState<Record<string, boolean>>(
    (undefined as unknown) as Record<string, boolean>
  )

  // This typing should clarify itself once we create our query and figure
  // out which values we need to appropriately render the UI
  const [artworks, _setArtworks] = useState<any[]>(extractNodes({ edges }))
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentArtwork = useCallback(() => {
    if (artworks.length > currentIndex) {
      return artworks[currentIndex]
    }
    return null
  }, [artworks, currentIndex])

  const nextArtwork = useCallback(() => {
    if (artworks.length > currentIndex + 1) {
      return artworks[currentIndex + 1]
    }
    return null
  }, [artworks, currentIndex])

  const previousArtwork = useCallback(() => {
    if (currentIndex > 0) {
      return artworks[currentIndex - 1]
    }
    return null
  }, [artworks, currentIndex])

  const stepForward = useCallback(() => {
    if (artworks.length > currentIndex + 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }, [artworks, currentIndex])

  const stepBackward = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex])

  useEffect(() => {
    // TODO: check db for quizTemplate
    // if exists, skip creation logic and set
    // else, create template for user and save to db
    if (!quizTemplate) {
      const template = {}
      for (let artwork of artworks) {
        Object.assign(template, { [artwork.slug]: false })
      }
      setQuizTemplate(template)
    }
  }, [artworks, quizTemplate])

  const markItemComplete = (
    artworkSlug: keyof ArtQuizContextValues["quizTemplate"]
  ) => {
    setQuizTemplate(prev => ({ ...prev, [artworkSlug]: true }))
  }

  return (
    <ArtQuizContext.Provider
      value={{
        artworks,
        artworksTotalCount: artworks.length,
        currentArtwork: currentArtwork(),
        currentIndex,
        markItemComplete,
        nextArtwork: nextArtwork(),
        previousArtwork: previousArtwork(),
        stepBackward,
        stepForward,
        quizTemplate,
      }}
    >
      {children}
    </ArtQuizContext.Provider>
  )
}

export const useArtQuizContext = () => {
  return useContext<ArtQuizContextValues>(ArtQuizContext)
}

// TODO: Remove this fixture data once we have our query in place
const edges = [
  {
    node: {
      title: "What's My Name",
      slug: "joy-taylor-whats-my-name",
      internalID: "62389306e8f966000c8d510b",
      image: {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/docVXClC2-kcghiAfTQACg/large.jpg",
        aspectRatio: 0.86,
        width: 940,
        height: 1110,
      },
      imageUrl:
        "https://d32dm0rphc51dk.cloudfront.net/docVXClC2-kcghiAfTQACg/square.jpg",
    },
  },
  {
    node: {
      title: "Switzerland, Small Works No. 109",
      slug: "sasha-hallock-switzerland-small-works-no-109",
      internalID: "6137b4fda72d75000bd439bd",
      image: {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/COQBMF_NYDBeR5Q-hNt1SQ/large.jpg",
        aspectRatio: 0.7,
        width: 1198,
        height: 1705,
      },
      imageUrl:
        "https://d32dm0rphc51dk.cloudfront.net/COQBMF_NYDBeR5Q-hNt1SQ/square.jpg",
    },
  },
]
