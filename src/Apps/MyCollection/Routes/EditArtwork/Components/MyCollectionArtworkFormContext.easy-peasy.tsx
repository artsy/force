import { createContextStore, Action, action } from "easy-peasy"
import type { LocalImage } from "Utils/localImageHelpers"
import { createContext, useContext, useState } from "react"

// Note: This context is primarily used for passing callbacks through component trees
// The actual state management (localImages) remains in the useLocalImageState hook
// We're only migrating the static callback structure to easy-peasy

// Easy-peasy store model interface
interface MyCollectionArtworkFormStoreModel {
  // State (empty - this context only passes callbacks)
  // Actions (empty - callbacks are passed through provider props)
}

// Create the context store (minimal - mainly for consistency)
export const MyCollectionArtworkFormStore =
  createContextStore<MyCollectionArtworkFormStoreModel>(() => ({}))

interface MyCollectionArtworkFormContextProps {
  onBack: () => void
  onNext?: (options?: { skipNext: boolean }) => void
  onSkip?: () => void
  addLocalImage: (image: LocalImage, index?: number) => void
  removeLocalImage: (photoID: string) => void
}

// Legacy context for backward compatibility
export const MyCollectionArtworkFormContext =
  createContext<MyCollectionArtworkFormContextProps>({
    onBack: () => {},
    onNext: () => {},
    onSkip: () => {},
    addLocalImage: () => {},
    removeLocalImage: () => {},
  })

export const MyCollectionArtworkFormContextProvider: React.FC<
  React.PropsWithChildren<MyCollectionArtworkFormContextProps>
> = ({ children, ...rest }) => {
  return (
    <MyCollectionArtworkFormStore.Provider>
      <MyCollectionArtworkFormContext.Provider value={rest}>
        {children}
      </MyCollectionArtworkFormContext.Provider>
    </MyCollectionArtworkFormStore.Provider>
  )
}

// Backward compatible hook
export const useMyCollectionArtworkFormContext = () => {
  const myCollectionArtworkFormContext =
    useContext(MyCollectionArtworkFormContext) ?? {}
  return myCollectionArtworkFormContext
}

// Local image state management with easy-peasy
interface LocalImageStoreModel {
  // State
  localImages: LocalImage[]

  // Actions
  addLocalImage: Action<
    LocalImageStoreModel,
    { image: LocalImage; index?: number }
  >
  removeLocalImage: Action<LocalImageStoreModel, string>
  clearLocalImages: Action<LocalImageStoreModel>
}

// Create local image store
const createLocalImageStore = () =>
  createContextStore<LocalImageStoreModel>({
    // State
    localImages: [],

    // Actions
    addLocalImage: action((state, { image, index = -1 }) => {
      // Don't add duplicates
      if (
        state.localImages.find(
          localImage => localImage.photoID === image.photoID,
        )
      ) {
        return
      }

      // Insert at index
      const insertAt = index === -1 ? state.localImages.length : index
      state.localImages = [
        ...state.localImages.slice(0, insertAt),
        image,
        ...state.localImages.slice(insertAt),
      ]
    }),

    removeLocalImage: action((state, photoID) => {
      state.localImages = state.localImages.filter(
        image => image.photoID !== photoID,
      )
    }),

    clearLocalImages: action(state => {
      state.localImages = []
    }),
  })

// Export hook that creates and uses local store
export const useLocalImageState = () => {
  // For backward compatibility, we keep this as a hook that returns the same interface
  // In a real migration, we'd create a provider component that wraps components using this hook
  const [localImages, setLocalImages] = useState<Array<LocalImage>>([])

  const addLocalImage = (image: LocalImage, index = -1) => {
    // Don't add duplicates
    if (localImages.find(localImage => localImage.photoID === image.photoID)) {
      return
    }

    setLocalImages(insertAtIndex(localImages, index, image))
  }

  const removeLocalImage = (photoID: string) => {
    setLocalImages(localImages.filter(image => image.photoID !== photoID))
  }

  const clearLocalImages = () => {
    setLocalImages([])
  }

  return {
    localImages,
    addLocalImage,
    removeLocalImage,
    clearLocalImages,
  }
}

const insertAtIndex = (array: any[], index: number, item: any) => {
  return [
    ...array.slice(0, index || array.length),
    item,
    ...array.slice(index || array.length),
  ]
}
