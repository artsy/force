import { ArtistApp_sharedMetadata$data } from "__generated__/ArtistApp_sharedMetadata.graphql"

export const hasOverviewContent = ({
  statuses,
  related,
  biographyBlurb,
  insights,
}: Pick<
  ArtistApp_sharedMetadata$data,
  "biographyBlurb" | "insights" | "related" | "statuses"
>): boolean => {
  const showArtistBio = biographyBlurb && Boolean(biographyBlurb.text)
  const showRelatedCategories = related?.genes?.edges?.length! > 0
  const showCareerHighlights = insights?.length

  return Boolean(
    showArtistBio ||
      showRelatedCategories ||
      showCareerHighlights ||
      statuses?.articles ||
      statuses?.cv ||
      statuses?.shows
  )
}
