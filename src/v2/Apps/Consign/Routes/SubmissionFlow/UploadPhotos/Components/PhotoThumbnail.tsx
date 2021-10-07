import React, { useEffect, useState } from "react"
import {
  GridColumns,
  BoxProps,
  Flex,
  Image,
  Text,
  Column,
  Box,
  Clickable,
} from "@artsy/palette"
import styled from "styled-components"
import { formatFileSize } from "../../Utils/FileUtils"

export interface PhotoThumbnailProps extends BoxProps {
  photo: File
  onDelete: (photo: File) => void
}

const TruncatedLine = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const PhotoThumbnail: React.FC<PhotoThumbnailProps> = ({
  photo,
  onDelete,
  ...rest
}) => {
  const [photoSrc, setPhotoSrc] = useState<string>()

  useEffect(() => {
    const reader = new FileReader()
    reader.readAsDataURL(photo)

    reader.onloadend = () => {
      setPhotoSrc(reader.result as string)
    }
  }, [])

  const handleDelete = () => {
    onDelete(photo)
  }

  return (
    <Flex p={[15, 2]} border="1px solid" borderColor="black15" {...rest}>
      <GridColumns gridGap={2} width="100%">
        <Column span={[9]} display="flex" alignItems="center">
          <Box
            height={[48, 120]}
            width={[48, 120]}
            minWidth={[48, 120]}
            mr={[15, 2]}
          >
            <Image
              src={photoSrc}
              style={{ objectFit: "cover" }}
              height="100%"
              width="100%"
            />
          </Box>
          <TruncatedLine variant="xs">{photo.name}</TruncatedLine>
        </Column>
        <Column
          span={[3]}
          minWidth={120}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text variant="xs">{formatFileSize(photo.size)}</Text>
          <Clickable
            data-test-id="delete-photo-thumbnail"
            onClick={handleDelete}
          >
            <Text variant="xs">
              <u>Delete</u>
            </Text>
          </Clickable>
        </Column>
      </GridColumns>
    </Flex>
  )
}
