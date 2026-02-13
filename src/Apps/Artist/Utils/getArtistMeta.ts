interface ArtistMetaOptions {
  name: string | null | undefined
  biographyBlurb?: {
    text?: string | null
  } | null
  subRoute?: string
}

export const getArtistMeta = ({
  name,
  biographyBlurb,
  subRoute,
}: ArtistMetaOptions): {
  title: string | undefined
  description: string | undefined
} => {
  if (!name) {
    return { title: undefined, description: undefined }
  }

  switch (subRoute) {
    case "articles":
      return {
        title: `${name} - Articles | Artsy`,
        description: `Read articles and editorial content about ${name} on Artsy. Browse reviews, interviews, and critical analysis of their work.`,
      }
    case "cv":
      return {
        title: `${name} - CV | Artsy`,
        description: `View ${name}’s complete exhibition history on Artsy. Browse their CV including solo shows, group shows, and fair booths at galleries and fairs worldwide.`,
      }
    case "series":
      return {
        title: `${name} - Series | Artsy`,
        description: `Explore ${name}’s series on Artsy and discover artworks available to collect. Browse the themes and artistic expressions that define ${name}’s career.`,
      }
    case "shows":
      return {
        title: `${name} - Shows | Artsy`,
        description: `View current and upcoming exhibitions featuring ${name} on Artsy. Browse shows at galleries and fairs worldwide.`,
      }
    default: {
      const baseDescription = `Explore ${name}’s biography, achievements, artworks, auction results, and shows on Artsy.`
      const blurb = biographyBlurb?.text?.substring(0, 70) || ""
      return {
        title: `${name} - Art & Prints for Sale | Artsy`,
        description: blurb ? `${baseDescription} ${blurb}` : baseDescription,
      }
    }
  }
}
