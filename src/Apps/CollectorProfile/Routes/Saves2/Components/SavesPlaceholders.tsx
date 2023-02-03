import {
  Box,
  Flex,
  Join,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { MetadataPlaceholder } from "Components/Artwork/Metadata"
import { times } from "lodash"
import { FC } from "react"
import { Media } from "Utils/Responsive"

interface SavesArtworksRowPlaceholderProps {
  count: number
}

const SavesArtworkPlaceholder = () => {
  return (
    <Box width="100%">
      <SkeletonBox height={300} />
      <MetadataPlaceholder />
    </Box>
  )
}

const SavesArtworksRowPlaceholder: FC<SavesArtworksRowPlaceholderProps> = ({
  count,
}) => {
  return (
    <Flex flexDirection="row">
      <Join separator={<Spacer x={2} />}>
        {times(count).map((_, index) => (
          <SavesArtworkPlaceholder key={`artwork-grid-placeholder-${index}`} />
        ))}
      </Join>
    </Flex>
  )
}

const SavesArtworksRowResponsivePlaceholder = () => {
  return (
    <>
      {/* Mobile view */}
      <Media at="xs">
        <SavesArtworksRowPlaceholder count={2} />
      </Media>

      {/* Desktop view */}
      <Media greaterThan="xs">
        <SavesArtworksRowPlaceholder count={3} />
      </Media>
    </>
  )
}

const SavesArtworksCountPlaceholder = () => {
  return (
    <SkeletonText variant="sm" fontWeight="bold">
      36 Artworks:
    </SkeletonText>
  )
}

const SavesSortPlaceholder = () => {
  return <SkeletonBox width={200} height={50} />
}

const SavesArtworksGridHeaderPlaceholder = () => {
  return (
    <>
      {/* Mobile view */}
      <Media at="xs">
        <SavesSortPlaceholder />

        <Spacer y={2} />

        <SavesArtworksCountPlaceholder />
      </Media>

      {/* Desktop view */}
      <Media greaterThan="xs">
        <Flex flexDirection="row" justifyContent="space-between">
          <SavesArtworksCountPlaceholder />
          <SavesSortPlaceholder />
        </Flex>
      </Media>
    </>
  )
}

export const SavesArtworksGridPlaceholder = () => {
  return (
    <>
      <SkeletonText variant="lg-display">Collection name</SkeletonText>
      <Spacer y={4} />
      <SavesArtworksGridHeaderPlaceholder />
      <Spacer y={2} />
      <SavesArtworksRowResponsivePlaceholder />
      <Spacer y={4} />
      <SavesArtworksRowResponsivePlaceholder />
    </>
  )
}
