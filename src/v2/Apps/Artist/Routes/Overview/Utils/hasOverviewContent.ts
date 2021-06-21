import { ArtistApp_sharedMetadata } from "v2/__generated__/ArtistApp_sharedMetadata.graphql"

export const hasOverviewContent = ({
  statuses,
  related,
  biographyBlurb,
}: Pick<
  ArtistApp_sharedMetadata,
  "statuses" | "related" | "biographyBlurb"
>): boolean => {
  const showArtistBio = biographyBlurb && Boolean(biographyBlurb.text)
  const showRelatedCategories = related?.genes?.edges?.length! > 0

  return Boolean(
    showArtistBio ||
      showRelatedCategories ||
      statuses?.articles ||
      statuses?.cv ||
      statuses?.shows
  )
}
