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

interface ArtworksRowPlaceholderProps {
  count: number
}

const ArtworkGridPlaceholder = () => {
  return (
    <Box width="100%">
      <SkeletonBox height={300} />
      <MetadataPlaceholder />
    </Box>
  )
}

const ArtworksRowPlaceholder: FC<ArtworksRowPlaceholderProps> = ({ count }) => {
  return (
    <Flex flexDirection="row">
      <Join separator={<Spacer x={2} />}>
        {times(count).map((_, index) => (
          <ArtworkGridPlaceholder key={`artwork-grid-placeholder-${index}`} />
        ))}
      </Join>
    </Flex>
  )
}

const ArtworksRowResponsivePlaceholder = () => {
  return (
    <>
      {/* Mobile view */}
      <Media lessThan="lg">
        <ArtworksRowPlaceholder count={2} />
      </Media>

      {/* Desktop view */}
      <Media greaterThanOrEqual="lg">
        <ArtworksRowPlaceholder count={3} />
      </Media>
    </>
  )
}

const ArtworksCountPlaceholder = () => {
  return (
    <SkeletonText variant="sm" fontWeight="bold">
      36 Artworks:
    </SkeletonText>
  )
}

const SortPlaceholder = () => {
  return <SkeletonBox width={200} height={50} />
}

const HeaderPlaceholder = () => {
  return (
    <>
      {/* Mobile view */}
      <Media at="xs">
        <SortPlaceholder />

        <Spacer y={2} />

        <ArtworksCountPlaceholder />
      </Media>

      {/* Desktop view */}
      <Media greaterThan="xs">
        <Flex flexDirection="row" justifyContent="space-between">
          <ArtworksCountPlaceholder />
          <SortPlaceholder />
        </Flex>
      </Media>
    </>
  )
}

export const ArtworkListArtworksGridPlaceholder = () => {
  return (
    <>
      <SkeletonText variant="lg-display">Artwork list name</SkeletonText>
      <Spacer y={4} />
      <HeaderPlaceholder />
      <Spacer y={2} />
      <ArtworksRowResponsivePlaceholder />
      <Spacer y={4} />
      <ArtworksRowResponsivePlaceholder />
    </>
  )
}
