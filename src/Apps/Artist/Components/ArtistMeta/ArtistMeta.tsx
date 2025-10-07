import { MetaTags } from "Components/MetaTags"
import { ArtistStructuredData } from "Components/Seo/ArtistStructuredData"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { getPageNumber } from "Utils/url"
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
  const page = getPageNumber(match?.location)
  const pathname = page > 1 ? `${artist.href}?page=${page}` : artist.href

  return (
    <>
      <MetaTags
        title={artist.meta.title}
        description={artist.meta.description}
        imageURL={artist.coverArtwork?.image?.large}
        pathname={pathname}
      />

      <Meta
        property="og:url"
        href={`${getENV("APP_URL")}/artist/${artist.slug}`}
      />
      <Meta
        property="og:type"
        href={`${getENV("FACEBOOK_APP_NAMESPACE")}:artist`}
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
      meta(page: ABOUT) {
        description
        title
      }
      alternateNames
      coverArtwork {
        image {
          large: url(version: "large")
        }
      }
    }
  `,
})
