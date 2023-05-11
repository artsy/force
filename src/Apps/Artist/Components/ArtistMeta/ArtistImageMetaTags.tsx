import { ArtistMeta_artist$data } from "__generated__/ArtistMeta_artist.graphql"
import { Meta } from "react-head"

interface Props {
  artist: ArtistMeta_artist$data
}

export const ArtistImageMetaTags: React.FC<Props> = ({ artist }) => {
  const imageVersions = artist?.image?.versions || []
  const hasLargeImage = artist?.image && imageVersions.includes("large")

  if (!hasLargeImage) return <Meta property="twitter:card" content="summary" />

  return (
    <>
      <Meta property="twitter:card" content="summary_large_image" />
      <Meta property="og:image" content={artist.image.large} />
      <Meta name="thumbnail" content={artist.image.square} />
    </>
  )
}
