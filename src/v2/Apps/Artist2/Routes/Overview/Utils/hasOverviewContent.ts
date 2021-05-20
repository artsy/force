export const hasOverviewContent = ({
  statuses,
  related,
  biographyBlurb,
}: {
  statuses: { shows: boolean; cv: boolean; articles: boolean }
  related: { genes?: { edges?: ReadonlyArray<any> } }
  biographyBlurb: { text?: string }
}) => {
  const showArtistBio = biographyBlurb && Boolean(biographyBlurb.text)
  const showRelatedCategories = related?.genes?.edges?.length! > 0

  return (
    showArtistBio ||
    showRelatedCategories ||
    statuses.articles ||
    statuses.cv ||
    statuses.shows
  )
}
