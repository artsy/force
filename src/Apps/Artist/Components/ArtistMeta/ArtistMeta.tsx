import { MetaTags } from "Components/MetaTags"
import { ArtistStructuredData } from "Components/Seo/ArtistStructuredData"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { getPageNumber, getPrimaryRouteSegment } from "Utils/url"
import type { ArtistMeta_artist$data } from "__generated__/ArtistMeta_artist.graphql"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  artist: ArtistMeta_artist$data
}

export const ArtistMeta: React.FC<React.PropsWithChildren<Props>> = ({
  artist,
}) => {
  const { match } = useRouter()

  const alternateNames = artist?.alternateNames || []
  const pathname = match.location.pathname
  const page = getPageNumber(match?.location)
  const canonicalPath = page > 1 ? `${pathname}?page=${page}` : pathname

  const primaryRoute = getPrimaryRouteSegment(pathname, artist.href || "")

  const getTitle = () => {
    switch (primaryRoute) {
      case "articles":
        return `${artist.name} - Articles | Artsy`
      case "cv":
        return `${artist.name} - CV | Artsy`
      case "series":
        return `${artist.name} - Series | Artsy`
      case "shows":
        return `${artist.name} - Shows | Artsy`
      default:
        return `${artist.name} - Biography, Shows, Articles & More | Artsy`
    }
  }

  const getDescription = () => {
    switch (primaryRoute) {
      case "articles":
        return `Read articles and editorial content about ${artist.name} on Artsy. Browse reviews, interviews, and critical analysis of their work.`
      case "cv":
        return `View ${artist.name}'s complete exhibition history on Artsy. Browse their CV including solo shows, group shows, and fair booths at galleries and fairs worldwide.`
      case "series":
        return `Explore ${artist.name}'s series on Artsy and discover artworks available to collect. Browse the themes and artistic expressions that define ${artist.name}'s career.`
      case "shows":
        return `View current and upcoming exhibitions featuring ${artist.name} on Artsy. Browse shows at galleries and fairs worldwide.`
      default: {
        const baseDescription = `Explore ${artist.name}'s biography, achievements, artworks, auction results, and shows on Artsy.`
        const blurb = artist.biographyBlurbPlain?.text?.substring(0, 70) || ""
        return blurb ? `${baseDescription} ${blurb}` : baseDescription
      }
    }
  }

  return (
    <>
      <MetaTags
        title={getTitle()}
        description={getDescription()}
        imageURL={artist.coverArtwork?.image?.large}
        pathname={canonicalPath}
      />

      <Meta
        property="og:type"
        content={`${getENV("FACEBOOK_APP_NAMESPACE")}:artist`}
      />

      {artist.nationality && (
        <Meta property="og:nationality" content={artist.nationality} />
      )}

      {artist.birthday && (
        <Meta property="og:birthyear" content={artist.birthday} />
      )}

      {artist.deathday && (
        <Meta property="og:deathyear" content={artist.deathday} />
      )}

      {alternateNames.length > 0 && (
        <Meta name="skos:prefLabel" content={alternateNames.join("; ")} />
      )}

      <ArtistStructuredData artist={artist} />
    </>
  )
}

export const ArtistMetaFragmentContainer = createFragmentContainer(ArtistMeta, {
  artist: graphql`
    fragment ArtistMeta_artist on Artist {
      ...ArtistStructuredData_artist
      slug
      name
      nationality
      birthday
      deathday
      href
      alternateNames
      biographyBlurbPlain: biographyBlurb(format: PLAIN) {
        text
      }
      coverArtwork {
        image {
          large: url(version: "large")
        }
      }
    }
  `,
})
