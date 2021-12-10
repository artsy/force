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
} from "@artsy/palette"
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
    }
  }, [])

  const handleDelete = () => {
    onDelete(photo)
  }

  const renderThumbnail = photoSrc => {
    const props: PhotoThumbnailStateProps = {
      photo,
      onDelete: handleDelete,
      photoSrc,
    }

    if (photo.url || photo.geminiToken) {
      return <PhotoThumbnailSuccessState {...props} />
    } else if (photo.errorMessage) {
      return <PhotoThumbnailErrorState {...props} />
    } else if (photo.loading) {
      return <PhotoThumbnailLoadingState {...props} />
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
        <Text mt={[0.5, 2]} variant="xs" color="red100">
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
  <Clickable
    ml={2}
    data-test-id="delete-photo-thumbnail"
    onClick={handleDelete}
  >
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
}) => {
  return (
    <Column span={[2]} display="flex" alignItems="center" flexDirection="row">
      <Box
        height={[48, 120]}
        width={[48, 120]}
        minWidth={[48, 120]}
        mr={[15, 2]}
        bg="black10"
      >
        <Image
          src={photo.url || photoSrc}
          style={{ objectFit: "cover" }}
          height="100%"
          width="100%"
        />
      </Box>
      <ProgressBar
        width="100%"
        highlight="brand"
        percentComplete={photo.progress || 0}
      />
      <RemoveButton withIconButton handleDelete={onDelete} />
    </Column>
  )
}

const PhotoThumbnailErrorState: React.FC<PhotoThumbnailStateProps> = ({
  onDelete,
  photo,
}) => {
  return (
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
}

const PhotoThumbnailSuccessState: React.FC<PhotoThumbnailStateProps> = ({
  onDelete,
  photoSrc,
  photo,
}) => (
  <>
    <Flex alignItems="center">
      <Box
        height={[48, 120]}
        width={[48, 120]}
        minWidth={[48, 120]}
        mr={[15, 2]}
        bg="black10"
      >
        <Image
          src={photoSrc}
          style={{ objectFit: "cover" }}
          height="100%"
          width="100%"
        />
      </Box>
      <TruncatedLine variant="xs">{photo.name}</TruncatedLine>
    </Flex>
    <Flex alignItems="center" justifyContent="space-between">
      <Text variant="xs">{formatFileSize(photo.size)}</Text>
      <RemoveButton handleDelete={onDelete} />
    </Flex>
  </>
)
