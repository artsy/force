import * as React from "react"
import { PhotosRoute_submission$key } from "__generated__/PhotosRoute_submission.graphql"
import {
  Clickable,
  Flex,
  Message,
  Spacer,
  Text,
  Image,
  Box,
  ProgressBar,
} from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"
import { Formik, useFormikContext } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { RouterLink } from "System/Components/RouterLink"
import { PhotoDropzone } from "Components/PhotoUpload/Components/PhotoDropzone"
import {
  Photo,
  normalizePhoto,
  uploadSubmissionPhoto,
} from "Components/PhotoUpload/Utils/fileUtils"
import CloseStrokeIcon from "@artsy/icons/CloseStrokeIcon"
import { useEffect, useState } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  useAddAssetToConsignmentSubmission,
  useRemoveAssetFromConsignmentSubmission,
} from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import { getENV } from "Utils/getENV"

const FRAGMENT = graphql`
  fragment PhotosRoute_submission on ConsignmentSubmission {
    externalId
    assets {
      id
      size
      filename
      geminiToken
      imageUrls
    }
  }
`

const Schema = Yup.object().shape({
  photos: Yup.array().min(1), // TODO: check if all are not loading and without errors
  // .transform(fields => fields.filter(c => !c.errorMessage))
  // .of(Yup.object().test("photos", value => value.assetId)),
})

interface Asset {
  id?: string
  size?: string
  filename?: string
  geminiToken?: string
  imageUrls: string[]
}

interface FormValues {
  // assets: Asset[]
  submissionId: string
  photos: Photo[]
}

interface PhotosRouteProps {
  submission: PhotosRoute_submission$key
}

export const PhotosRoute: React.FC<PhotosRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)

  const photos: Photo[] = (submission.assets as Asset[]).map(asset => ({
    id: asset?.id ?? "",
    assetId: asset?.id ?? "",
    size: (asset?.size && parseInt(asset?.size, 10)) || 0,
    name: asset?.filename ?? "",
    geminiToken: asset?.geminiToken ?? undefined,
    url:
      (asset?.imageUrls as any)?.thumbnail || (asset?.imageUrls as any)?.square,
    removed: false,
    loading: false,
  }))

  const initialValues: FormValues = {
    submissionId: submission.externalId,
    photos,
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={() => {}}
      validateOnMount
      validationSchema={Schema}
    >
      {({ values, setFieldValue, isValid, isSubmitting }) => {
        return (
          <SubmissionLayout>
            <Text mb={2} variant="xl">
              Upload photos of your artwork
            </Text>

            <Text mb={2} variant="sm">
              Make your work stand out and get your submission evaluated faster
              by uploading high-quality photos of the work's front and back.{" "}
              <RouterLink
                to="https://help.artsy.net/s/article/How-to-Take-Photos-That-Sell"
                target="_blank"
                inline
              >
                <Text color="black100" display="inline">
                  Tips for taking photos
                </Text>
              </RouterLink>
            </Text>

            <UploadPhotosForm />

            <UploadMoreNudge />

            <ImagePreviews />

            <DevDebug />
          </SubmissionLayout>
        )
      }}
    </Formik>
  )
}

const UploadPhotosForm: React.FC = () => {
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { submitMutation: addAsset } = useAddAssetToConsignmentSubmission()
  const { setFieldValue, values } = useFormikContext<FormValues>()

  useEffect(() => {
    const handlePhotoUploadingProgress = (photo: Photo) => progress => {
      photo.progress = progress
      setFieldValue("photos", values.photos)
    }

    const uploadImage = async photo => {
      photo.loading = true

      if (relayEnvironment) {
        const geminiToken = await uploadSubmissionPhoto(
          values.submissionId,
          relayEnvironment,
          photo,
          handlePhotoUploadingProgress(photo)
        )

        // photo.loading = false

        // TODO: what it does?
        if (!geminiToken) {
          photo.errorMessage = photo.externalUrl
            ? "Artwork image could not be automatically added. Please add a photo."
            : `Photo could not be added: ${photo.name}`
          setFieldValue("photos", values.photos)
          return
        }

        photo.geminiToken = geminiToken
        setFieldValue("photos", values.photos, true)

        // onPhotoUploaded(photo)
        try {
          const response = await addAsset({
            variables: {
              input: {
                assetType: "image",
                geminiToken: photo.geminiToken as string,
                externalSubmissionId: values.submissionId,
                sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
                filename: photo.name,
                size: photo.size?.toString(),
              },
            },
          })

          photo.assetId = response.addAssetToConsignmentSubmission?.asset?.id
        } catch (error) {
          // logger.error("Add asset error", error)
        } finally {
          photo.loading = false
          setFieldValue("photos", values.photos, true)
        }
      }
    }

    const imagesToUpload = values.photos.filter(
      c => !(c.geminiToken || c.url) && !c.loading && !c.errorMessage
    )

    if (imagesToUpload.length) {
      imagesToUpload.forEach(uploadImage)
      setFieldValue("photos", [...values.photos])
    }
    // TODO: extract to a single callback function
  }, [
    values.photos,
    setFieldValue,
    relayEnvironment,
    values.submissionId,
    addAsset,
    isLoggedIn,
  ])

  const onDrop = (acceptedFiles: File[]) => {
    const photos = acceptedFiles.map(file => normalizePhoto(file))
    console.log("[Debug] photos in onDrop", photos)
    // setErrors([])
    setFieldValue("photos", [
      ...values.photos.filter(p => !p.errorMessage),
      ...photos,
    ])
  }

  return (
    <PhotoDropzone
      allPhotos={values.photos}
      maxTotalSize={30}
      onDrop={onDrop}
      onReject={() => {}}
      border="1px dashed"
      borderColor="black30"
      padding={4}
    />
  )
}

const UploadMoreNudge: React.FC = () => {
  const {
    values: { photos },
  } = useFormikContext<FormValues>()

  if (photos.length !== 1) return null

  return (
    <Message variant="success" title="Increase your chance of selling" mt={2}>
      Make sure to include images of the back, corners, frame and any other
      details if you can.
    </Message>
  )
}

const ImagePreviews: React.FC = () => {
  const {
    values: { photos },
  } = useFormikContext<FormValues>()

  // TODO: check with []
  if (!photos) return null

  return (
    <>
      <Spacer y={2} />

      <Flex gap={1} flexWrap="wrap">
        {photos.map(photo => (
          <ImagePreview key={photo.id} photo={photo} />
        ))}
      </Flex>
    </>
  )
}

interface ImagePreviewProps {
  photo: Photo
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ photo }) => {
  const { isLoggedIn } = useSystemContext()
  const {
    submitMutation: removeAsset,
  } = useRemoveAssetFromConsignmentSubmission()
  const { setFieldValue, values } = useFormikContext<FormValues>()
  const [photoSrc, setPhotoSrc] = useState<string>()

  useEffect(() => {
    if (photo.externalUrl) {
      setPhotoSrc(photo.externalUrl)
    } else if (photo.file) {
      const reader = new FileReader()

      reader.readAsDataURL(photo.file as File)

      reader.onloadend = () => {
        setPhotoSrc(reader.result as string)
      }
    } else {
      setPhotoSrc(photo.url)
    }
  }, [photo])

  useEffect(() => {
    if (!photoSrc && photo.url) {
      setPhotoSrc(photo.url)
    }
  }, [photo.url, photoSrc])

  const handlePhotoDelete = (photo: Photo) => {
    photo.removed = true
    photo.abortUploading?.()

    if (photo.assetId) {
      removeAsset({
        variables: {
          input: {
            assetID: photo.assetId,
            sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
          },
        },
      }).catch(error => {
        // logger.error("Remove asset error", error)
      })
    }

    const photosToSave = values.photos.filter(p => p.id !== photo.id)
    setFieldValue("photos", photosToSave)
  }

  return (
    <Flex minWidth="140px" minHeight="140px" position="relative">
      <Box opacity={photo.loading ? 0.3 : 1} position="relative">
        {photoSrc && <Image src={photoSrc} width="140px" height="140px" />}

        {!photoSrc && (
          <Box backgroundColor="black10" width="140px" height="140px" />
        )}

        {photo.loading && photo.progress && (
          <Flex
            position="absolute"
            bottom={0}
            left={0}
            zIndex={1000}
            justifyContent="center"
            alignItems="center"
            width="100%"
            marginBottom={-0.5}
          >
            <ProgressBar
              width="100%"
              highlight="brand"
              percentComplete={photo.progress || 0}
            />
          </Flex>
        )}
      </Box>

      <Clickable
        data-testid="delete-photo-thumbnail"
        onClick={() => {
          handlePhotoDelete(photo)
        }}
      >
        <Flex
          position="absolute"
          alignItems="center"
          justifyContent="center"
          zIndex={1000}
          top={0.5}
          right={0.5}
          width="16px"
          height="16px"
        >
          <CloseStrokeIcon
            width="16px"
            height="16px"
            aria-label="Cancel"
            title="Cancel"
            backgroundColor="black100"
            fill="white100"
          />
        </Flex>
      </Clickable>
    </Flex>
  )
}
