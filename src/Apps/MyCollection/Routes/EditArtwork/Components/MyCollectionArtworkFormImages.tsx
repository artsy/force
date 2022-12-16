import { Text } from "@artsy/palette"
import { MyCollectionPhotoToPhoto } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkFormHelpers"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { PhotoDropzone } from "Components/PhotoUpload/Components/PhotoDropzone"
import { PhotoThumbnail } from "Components/PhotoUpload/Components/PhotoThumbnail"
import {
  getErrorMessage,
  normalizePhoto,
  Photo,
  uploadPhotoToS3,
} from "Components/PhotoUpload/Utils/fileUtils"
import { useFormikContext } from "formik"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { FileRejection } from "react-dropzone"
import { useSystemContext } from "System"
import { LocalImage, storeArtworkLocalImages } from "Utils/localImagesHelpers"

export interface MyCollectionArtworkFormImagesProps {
  saveImagesToLocalStorage: (artworkId: string) => Promise<string | undefined>
}
export const MyCollectionArtworkFormImages = forwardRef<
  MyCollectionArtworkFormImagesProps
>((_, formImagesRef) => {
  const [errors, setErrors] = useState<Array<FileRejection>>([])
  const [localImages, setlocalImages] = useState<
    Array<LocalImage & { photoID: string }>
  >([])
  const { relayEnvironment } = useSystemContext()
  const { values, setFieldValue } = useFormikContext<ArtworkModel>()

  const saveImagesToLocalStorage = async (artworkId: string) => {
    try {
      // Store the artwork's local images in local storage
      // and remove unnecessary fields
      return await storeArtworkLocalImages(
        artworkId,
        localImages.map(({ photoID, ...rest }) => rest)
      )
    } catch (error) {
      console.error("Error saving images to localforage storage", error)
    }
  }

  useImperativeHandle(
    formImagesRef,
    () => {
      return {
        saveImagesToLocalStorage,
      }
    },
    [localImages, saveImagesToLocalStorage]
  )

  const uploadPhoto = async (photo: Photo) => {
    photo.loading = true

    try {
      const photoURL = await uploadPhotoToS3(
        relayEnvironment!,
        photo,
        progress => {
          photo.progress = progress
          setFieldValue("newPhotos", values.newPhotos)
        }
      )

      if (!photoURL) {
        throw Error(`Photo could not be added: ${photo.name}`)
      }

      photo.url = photoURL

      setFieldValue("newPhotos", values.newPhotos, true)
    } catch (error) {
      photo.errorMessage = `Photo could not be added: ${photo.name}`
      setFieldValue("newPhotos", values.newPhotos)
      return
    } finally {
      photo.loading = false
    }
  }

  const getImagesToUpload = (photos: Photo[]) => {
    return photos.filter(c => !(c.geminiToken || c.url) && !c.loading)
  }

  useEffect(() => {
    const imagesToUpload = getImagesToUpload(values.newPhotos)

    if (imagesToUpload.length) {
      imagesToUpload.forEach(uploadPhoto)

      setFieldValue("newPhotos", [...values.newPhotos])
    }
  }, [values.newPhotos])

  const handleDrop = (acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.map(file => normalizePhoto(file))

    setErrors([])
    setFieldValue("newPhotos", [
      ...values.newPhotos.filter(p => !p.errorMessage),
      ...newPhotos,
    ])
  }

  const handleReject = (rejections: FileRejection[]) => {
    setErrors(rejections)
    setFieldValue(
      "newPhotos",
      values.newPhotos.filter(p => !p.errorMessage)
    )
  }

  const onImgLoad = (
    image: React.SyntheticEvent<HTMLImageElement, Event>,
    photoID: string
  ) => {
    const {
      naturalHeight: height,
      naturalWidth: width,
      currentSrc,
    } = image.target as any

    const imageAlreadyAdded = localImages.find(
      localImage => localImage.photoID === photoID
    )
    if (currentSrc.startsWith("data:image") && !imageAlreadyAdded) {
      // Save the image dimensions as well as local path to the localImages array
      setlocalImages(
        localImages.concat({
          data: currentSrc,
          width,
          height,
          photoID,
        })
      )
    }
  }

  const handlePhotoDelete = (photo: {
    id: string
    size?: number
    removed?: boolean
    abortUploading?: () => void
  }) => {
    const isNewPhoto = !!photo.size // Only photos that have been newly added have a size attribute.

    if (isNewPhoto) {
      photo.removed = true
      photo.abortUploading?.()

      // Remove photo from newPhotos
      setFieldValue(
        "newPhotos",
        values.newPhotos.filter(p => p.id !== photo.id)
      )
      // Remove images that have been removed from state
      setlocalImages(localImages.filter(p => p.photoID !== photo.id))
    } else {
      // Mark photo in photos as removed
      const photoToDelete = {
        ...values.photos.find(p => p.internalID === photo.id),
      }

      if (!photoToDelete) {
        return
      }

      photoToDelete.removed = true

      setFieldValue("photos", [
        ...values.photos.filter(p => p.internalID !== photo.id),
        photoToDelete,
      ])
    }
  }

  const allPhotos = [
    ...values.photos.filter(p => !p.removed).map(MyCollectionPhotoToPhoto),
    ...values.newPhotos,
  ]

  return (
    <>
      <Text variant="xs" mb={0.5}>
        Upload Photos
      </Text>
      <PhotoDropzone
        allPhotos={values.newPhotos}
        onDrop={handleDrop}
        maxTotalSize={30}
        px={[2, 4]}
        pt={[4, 6]}
        pb={[4]}
        mb={[4]}
        border="1px solid"
        borderColor="black10"
        onReject={handleReject}
      />

      {errors.map((error, i) => {
        const normalizedPhoto = normalizePhoto(
          error.file,
          getErrorMessage(error)
        )
        return (
          <PhotoThumbnail
            mt={2}
            key={normalizedPhoto.id}
            photo={normalizedPhoto}
            onDelete={() => {
              setErrors(errors.filter(e => e !== error))
            }}
          />
        )
      })}

      {allPhotos.map(photo => (
        <PhotoThumbnail
          mt={2}
          key={photo?.id}
          onLoad={image => void onImgLoad(image, photo.id)}
          photo={photo}
          data-testid="photo-thumbnail"
          onDelete={handlePhotoDelete}
        />
      ))}
    </>
  )
})
