import { createContext, FC, useContext, useEffect, useState } from "react"
import { extractNodes } from "Utils/extractNodes"

interface ArtQuizContext {
  artworks: any[]
  currentArtwork: any | null
  markItemComplete: (artworkSlug: keyof ArtQuizContext["quizTemplate"]) => void
  nextArtwork: any | null
  previousArtwork: any | null
  stepForward: () => void
  stepBackward: () => void
  quizTemplate: Record<string, boolean>
}

const artQuizContext = createContext<ArtQuizContext>({
  artworks: [],
  currentArtwork: null,
  nextArtwork: null,
  previousArtwork: null,
  markItemComplete: (_: keyof ArtQuizContext["quizTemplate"]) => {
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
  const [quizTemplate, setQuizTemplate] = useState<Record<string, boolean>>(
    (undefined as unknown) as Record<string, boolean>
  )
  const [artworks, _setArtworks] = useState<any[]>(extractNodes({ edges }))
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentArtwork = () => {
    if (artworks.length > currentIndex) {
      return artworks[currentIndex]
    }
    return null
  }
  const nextArtwork = () => {
    if (artworks.length > currentIndex + 1) {
      return artworks[currentIndex + 1]
    }
    return null
  }
  const previousArtwork = () => {
    if (currentIndex > 0) {
      return artworks[currentIndex - 1]
    }
    return null
  }

  const stepForward = () => {
    if (artworks.length > currentIndex + 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const stepBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    // TODO: check db for quizTemplate
    // if exists, skip creation logic and set
    if (!quizTemplate) {
      const template = {}
      for (let artwork of artworks) {
        Object.assign(template, { [artwork.slug]: false })
      }
      setQuizTemplate(template)
    }
  }, [artworks, quizTemplate])

  const markItemComplete = (
    artworkSlug: keyof ArtQuizContext["quizTemplate"]
  ) => {
    setQuizTemplate(prev => ({ ...prev, [artworkSlug]: true }))
  }

  return (
    <artQuizContext.Provider
      value={{
        artworks,
        currentArtwork: currentArtwork(),
        markItemComplete,
        nextArtwork: nextArtwork(),
        previousArtwork: previousArtwork(),
        stepBackward,
        stepForward,
        quizTemplate,
      }}
    >
      {children}
    </artQuizContext.Provider>
  )
}

export const useArtQuizContext = () => {
  return useContext<ArtQuizContext>(artQuizContext)
}

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
