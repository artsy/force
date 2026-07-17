import { Spacer, Text } from "@artsy/palette"
import { ImageSearchArtworksGridRefetchContainer } from "Apps/ImageSearch/Components/ImageSearchArtworksGrid"
import { MetaTags } from "Components/MetaTags"
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
  return (
    <>
      <MetaTags title="Visual Search | Artsy" pathname="/image-search" />

      <Spacer y={4} />

      <Text variant={["lg-display", "xl"]}>Visual Search</Text>

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
        ...ImageSearchArtworksGrid_viewer
          @arguments(first: $first, s3Key: $s3Key, s3Bucket: $s3Bucket)
      }
    `,
  },
)
