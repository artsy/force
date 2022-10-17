import { UtilButton, UtilButtonLink } from "./UtilButton"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkDownloadButton_artwork$data } from "__generated__/ArtworkDownloadButton_artwork.graphql"

interface ArtworkDownloadButtonProps {
  artwork: ArtworkDownloadButton_artwork$data
}

const ArtworkDownloadButton: React.FC<ArtworkDownloadButtonProps> = ({
  artwork,
}) => {
  const { artists, title, date } = artwork
  const artistNames = (artists ?? []).map(artist => artist?.name).join(", ")
  const filename = compact([artistNames, title, date]).join(", ").trim()

  return (
    <UtilButton
      name="download"
      href={artwork.downloadableImageUrl!}
      label="Download"
      download={filename}
      Component={UtilButtonLink}
    />
  )
}

export const ArtworkDownloadButtonFragmentContainer = createFragmentContainer(
  ArtworkDownloadButton,
  {
    artwork: graphql`
      fragment ArtworkDownloadButton_artwork on Artwork {
        title
        date
        downloadableImageUrl
        artists {
          name
        }
      }
    `,
  }
)
