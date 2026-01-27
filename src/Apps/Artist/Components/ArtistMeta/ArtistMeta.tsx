import { MetaTags } from "Components/MetaTags"
import { ArtistStructuredData } from "Components/Seo/ArtistStructuredData"
import { getArtistMeta } from "Apps/Artist/Utils/getArtistMeta"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { getPageNumber, getArtistSubRoute } from "Utils/url"
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

  const primaryRoute = getArtistSubRoute(pathname)

  const { title, description } = getArtistMeta({
    name: artist.name,
    biographyBlurb: artist.biographyBlurbPlain,
    subRoute: primaryRoute,
  })

  return (
    <>
      <MetaTags
        title={title}
        description={description}
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
      name
      nationality
      birthday
      deathday
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
