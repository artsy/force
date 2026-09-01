import { Flex, Spacer, Text } from "@artsy/palette"
import { ImageSearchArtworksGridRefetchContainer } from "Apps/ImageSearch/Components/ImageSearchArtworksGrid"
import { MetaTags } from "Components/MetaTags"
import { ImageSearchThumbnail } from "Components/Search/ImageSearch/ImageSearchThumbnail"
import { getImageSearchPreview } from "Components/Search/ImageSearch/imageSearchPreview"
import { useRouter } from "System/Hooks/useRouter"
import type { ImageSearchApp_viewer$data } from "__generated__/ImageSearchApp_viewer.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export const IMAGE_SEARCH_SECTION_ID = "imageSearchResults"

interface ImageSearchAppProps {
  viewer: ImageSearchApp_viewer$data
}

export const ImageSearchApp: FC<
  React.PropsWithChildren<ImageSearchAppProps>
> = ({ viewer }) => {
  const { match } = useRouter()
  const s3Key = String(match.location.query.s3Key ?? "")
  const s3Bucket = String(match.location.query.s3Bucket ?? "")
  const previewURL = getImageSearchPreview({ s3Key, s3Bucket })
  const hasResults = (viewer.artworksByImageConnection?.totalCount ?? 0) > 0

  return (
    <>
      <MetaTags
        title="Search by image with Artsy Lens | Artsy"
        pathname="/image-search"
      />

      <Spacer y={4} />

      <Flex alignItems="center" gap={2}>
        <ImageSearchThumbnail
          src={previewURL}
          width={60}
          height={60}
          borderRadius={2}
        />

        {hasResults && (
          <Text variant={["md", "lg-display"]}>
            Here are some matches to your image
          </Text>
        )}
      </Flex>

      <Spacer y={4} />

      <div id={IMAGE_SEARCH_SECTION_ID} />

      <ImageSearchArtworksGridRefetchContainer viewer={viewer} />
    </>
  )
}

export const ImageSearchAppFragmentContainer = createFragmentContainer(
  ImageSearchApp,
  {
    viewer: graphql`
      fragment ImageSearchApp_viewer on Viewer
      @argumentDefinitions(
        first: { type: "Int" }
        s3Key: { type: "String!" }
        s3Bucket: { type: "String!" }
      ) {
        artworksByImageConnection(
          first: $first
          s3Key: $s3Key
          s3Bucket: $s3Bucket
        ) {
          totalCount
        }
        ...ImageSearchArtworksGrid_viewer
          @arguments(first: $first, s3Key: $s3Key, s3Bucket: $s3Bucket)
      }
    `,
  },
)
