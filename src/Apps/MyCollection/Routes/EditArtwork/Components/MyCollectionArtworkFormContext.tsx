import { createContext, useContext, useState } from "react"
import { LocalImage } from "Utils/localImagesHelpers"

interface MyCollectionArtworkFormContextProps {
  onBack: () => void
  onNext?: (options?: { skipNext: boolean }) => void
  onSkip?: () => void
  addLocalImage: (image: any) => void
  removeLocalImage: (image: any) => void
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
  const [localImages, setLocalImages] = useState<
    Array<LocalImage & { photoID: string }>
  >([])

  const addLocalImage = (image: any) => {
    setLocalImages([...localImages, image])
  }
  const removeLocalImage = (photoID: string) => {
    setLocalImages(localImages.filter(i => i.photoID !== photoID))
  }

  return {
    localImages,
    addLocalImage,
    removeLocalImage,
  }
}
