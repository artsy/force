import {
  Box,
  BoxProps,
  Clickable,
  Column,
  CSSGrid,
  Flex,
  Image,
  ProgressBar,
  Spinner,
  Text,
} from "@artsy/palette"
import { formatFileSize, Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { ComponentProps, useEffect, useState } from "react"
import styled from "styled-components"
import { Media } from "Utils/Responsive"
import CloseStrokeIcon from "@artsy/icons/CloseStrokeIcon"

export interface PhotoThumbnailProps {
  photo: Photo
  onDelete: (photo: Photo) => void
}

const TruncatedLine = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const ImageContainer = styled(Box).attrs({
  height: [48, 120],
  width: [48, 120],
  minWidth: [48, 120],
  mr: [15, 2],
  bg: "black10",
})`
  cursor: default;
`

export const PhotoThumbnail: React.FC<
  PhotoThumbnailProps &
    BoxProps & {
      onLoad?: ComponentProps<typeof Image>["onLoad"]
    }
> = ({ photo, onDelete, ...rest }) => {
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

  const handleDelete = () => onDelete(photo)

  const renderThumbnail = photoSrc => {
    const props: PhotoThumbnailStateProps = {
      photo,
      onDelete: handleDelete,
      photoSrc,
    }

    if (photo.loading) {
      return <PhotoThumbnailLoadingState {...props} />
    } else if (photo.errorMessage) {
      return <PhotoThumbnailErrorState {...props} />
    } else if (photo.url || photo.file) {
      return <PhotoThumbnailSuccessState onLoad={rest.onLoad} {...props} />
    } else if (photo.geminiToken) {
      return <PhotoThumbnailProcessingState {...props} />
    }
  }

  // Only show error messages for photos that have been uploaded by the user
  const showErrorMessage = photo.errorMessage && !photo.externalUrl

  return (
    <>
      {!photo.errorMessage && (
        <Flex
          p={photo.errorMessage ? [15] : [15, 2]}
          border="1px solid"
          borderRadius={4}
          borderColor={photo.errorMessage ? "red100" : "black15"}
          {...rest}
        >
          <CSSGrid
            gridTemplateColumns="minmax(50px, 75%) minmax(120px, 25%)"
            gridGap={2}
            width="100%"
          >
            {renderThumbnail(photoSrc)}
          </CSSGrid>
        </Flex>
      )}
      {!!showErrorMessage && (
        <Text
          data-testid="photo-thumbnail-error"
          mt={[0.5, 2]}
          variant="xs"
          color="red100"
        >
          {photo.errorMessage}
        </Text>
      )}
    </>
  )
}

interface RemoveButtonProps {
  withIconButton?: boolean
  handleDelete: () => void
}

const RemoveButton: React.FC<RemoveButtonProps> = ({
  withIconButton,
  handleDelete,
}) => (
  <Clickable data-testid="delete-photo-thumbnail" ml={2} onClick={handleDelete}>
    {withIconButton ? (
      <CloseStrokeIcon
        display="flex"
        aria-label="Cancel"
        title="Cancel"
        fill="black60"
      />
    ) : (
      <Text variant="xs">
        <u>Delete</u>
      </Text>
    )}
  </Clickable>
)

interface PhotoThumbnailStateProps extends Omit<PhotoThumbnailProps, "state"> {
  onDelete: () => void
  photoSrc?: string
}

const PhotoThumbnailLoadingState: React.FC<PhotoThumbnailStateProps> = ({
  onDelete,
  photoSrc,
  photo,
}) => (
  <Column span={[2]} display="flex" alignItems="center" flexDirection="row">
    <ImageContainer>
      <Image
        src={photoSrc}
        style={{ objectFit: "contain" }}
        height="100%"
        width="100%"
      />
    </ImageContainer>
    <ProgressBar
      width="100%"
      highlight="brand"
      percentComplete={photo.progress || 0}
    />
    <RemoveButton withIconButton handleDelete={onDelete} />
  </Column>
)

const PhotoThumbnailErrorState: React.FC<PhotoThumbnailStateProps> = ({
  onDelete,
  photo,
}) => (
  <>
    <Flex alignItems="center">
      <TruncatedLine variant="xs">{photo.name}</TruncatedLine>
    </Flex>
    <Flex alignItems="center" justifyContent="space-between">
      <Text variant="xs">{formatFileSize(photo)}</Text>
      <RemoveButton withIconButton handleDelete={onDelete} />
    </Flex>
  </>
)

const PhotoThumbnailSuccessState: React.FC<
  PhotoThumbnailStateProps & {
    onLoad: ComponentProps<typeof Image>["onLoad"]
  }
> = ({ onDelete, photoSrc, photo, onLoad = () => {} }) => (
  <>
    <Flex alignItems="center">
      <ImageContainer>
        <Image
          src={photoSrc}
          style={{ objectFit: "contain" }}
          height="100%"
          width="100%"
          onLoad={onLoad}
        />
      </ImageContainer>
      <TruncatedLine variant="xs">{photo.name}</TruncatedLine>
    </Flex>
    <Flex alignItems="center" justifyContent="space-between">
      <Text variant="xs">{formatFileSize(photo)}</Text>
      <RemoveButton handleDelete={onDelete} />
    </Flex>
  </>
)

const PhotoThumbnailProcessingState: React.FC<PhotoThumbnailStateProps> = ({
  onDelete,
  photo,
}) => (
  <>
    <Flex alignItems="center">
      <ImageContainer
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Media at="xs">
          <Spinner size="small" />
        </Media>

        <Media greaterThan="xs">
          <Text color="black60">Processing</Text>
        </Media>
      </ImageContainer>
      <TruncatedLine variant="xs">{photo.name}</TruncatedLine>
    </Flex>
    <Flex alignItems="center" justifyContent="space-between">
      <Text variant="xs">{formatFileSize(photo)}</Text>
      <RemoveButton handleDelete={onDelete} />
    </Flex>
  </>
)
