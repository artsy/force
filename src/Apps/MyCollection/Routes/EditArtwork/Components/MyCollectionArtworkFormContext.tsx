import { createContext, useContext, useState } from "react"
import { LocalImage } from "Utils/localImageHelpers"

interface MyCollectionArtworkFormContextProps {
  onBack: () => void
  onNext?: (options?: { skipNext: boolean }) => void
  onSkip?: () => void
  addLocalImage: (image: LocalImage) => void
  removeLocalImage: (photoID: string) => void
}

export const MyCollectionArtworkFormContext = createContext<
  MyCollectionArtworkFormContextProps
>({
  onBack: () => {},
  onNext: () => {},
  onSkip: () => {},
  addLocalImage: () => {},
  removeLocalImage: () => {},
})

export const MyCollectionArtworkFormContextProvider: React.FC<MyCollectionArtworkFormContextProps> = ({
  children,
  ...rest
}) => {
  return (
    <MyCollectionArtworkFormContext.Provider value={rest}>
      {children}
    </MyCollectionArtworkFormContext.Provider>
  )
}

export const useMyCollectionArtworkFormContext = () => {
  const myCollectionArtworkFormContext =
    useContext(MyCollectionArtworkFormContext) ?? {}
  return myCollectionArtworkFormContext
}

export const useLocalImageState = () => {
  const [localImages, setLocalImages] = useState<Array<LocalImage>>([])

  const addLocalImage = (image: LocalImage) => {
    // Don't add duplicates
    if (localImages.find(localImage => localImage.photoID === image.photoID)) {
      return
    }

    setLocalImages([...localImages, image])
  }
  const removeLocalImage = (photoID: string) => {
    setLocalImages(localImages.filter(image => image.photoID !== photoID))
  }

  return {
    localImages,
    addLocalImage,
    removeLocalImage,
  }
}
