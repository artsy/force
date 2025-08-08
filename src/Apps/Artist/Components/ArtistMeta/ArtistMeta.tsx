import { ArtistStructuredData } from "Components/Seo/ArtistStructuredData"
import { MetaTags } from "Components/MetaTags"
import { PaginatedMetaTags } from "Components/PaginatedMetaTags"
import { getENV } from "Utils/getENV"
import type { ArtistMeta_artist$data } from "__generated__/ArtistMeta_artist.graphql"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  artist: ArtistMeta_artist$data
  title?: string | null
  description?: string | null
  isPaginated?: boolean
}

export const ArtistMeta: React.FC<React.PropsWithChildren<Props>> = ({
  artist,
  title,
  description,
  isPaginated = false,
}) => {
  const alternateNames = artist?.alternateNames || []

  const finalTitle = title || artist.meta?.title
  const finalDescription = description || artist.meta?.description
  const imageURL = artist.coverArtwork?.image?.large

  return (
    <>
      {isPaginated ? (
        <PaginatedMetaTags title={finalTitle} description={finalDescription} />
      ) : (
        <MetaTags
          title={finalTitle}
          description={finalDescription}
          imageURL={imageURL}
          pathname={artist.href}
        />
      )}

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
      isInSeoExperiment
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
