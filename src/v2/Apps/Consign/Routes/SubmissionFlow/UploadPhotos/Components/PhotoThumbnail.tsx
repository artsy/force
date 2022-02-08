import { useEffect, useState } from "react"
import {
  CSSGrid,
  BoxProps,
  Flex,
  Image,
  Text,
  Column,
  Box,
  Clickable,
  ProgressBar,
  CloseCircleIcon,
  Spinner,
} from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import styled from "styled-components"
import { formatFileSize, Photo } from "../../Utils/fileUtils"

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

export const PhotoThumbnail: React.FC<PhotoThumbnailProps & BoxProps> = ({
  photo,
  onDelete,
  ...rest
}) => {
  const [photoSrc, setPhotoSrc] = useState<string>()

  useEffect(() => {
    if (photo.file) {
      const reader = new FileReader()
      reader.readAsDataURL(photo.file)

      reader.onloadend = () => {
        setPhotoSrc(reader.result as string)
      }
    } else {
      setPhotoSrc(photo.url)
    }
  }, [photo])

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
      return <PhotoThumbnailSuccessState {...props} />
    } else if (photo.geminiToken) {
      return <PhotoThumbnailProcessingState {...props} />
    }
  }

  return (
    <>
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
      {photo.errorMessage && (
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
      <CloseCircleIcon
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
        style={{ objectFit: "cover" }}
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
      <Text variant="xs">{formatFileSize(photo.size)}</Text>
      <RemoveButton withIconButton handleDelete={onDelete} />
    </Flex>
  </>
)

const PhotoThumbnailSuccessState: React.FC<PhotoThumbnailStateProps> = ({
  onDelete,
  photoSrc,
  photo,
}) => (
  <>
    <Flex alignItems="center">
      <ImageContainer>
        <Image
          src={photoSrc}
          style={{ objectFit: "cover" }}
          height="100%"
          width="100%"
        />
      </ImageContainer>
      <TruncatedLine variant="xs">{photo.name}</TruncatedLine>
    </Flex>
    <Flex alignItems="center" justifyContent="space-between">
      <Text variant="xs">{formatFileSize(photo.size)}</Text>
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
      <Text variant="xs">{formatFileSize(photo.size)}</Text>
      <RemoveButton handleDelete={onDelete} />
    </Flex>
  </>
)
