import { RouterLink } from "System/Components/RouterLink"
import { HTML, Text } from "@artsy/palette"
import { ArtistBio_bio$data } from "__generated__/ArtistBio_bio.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

export interface ArtistBioProps {
  bio: ArtistBio_bio$data
  maxChars?: number
  onReadMoreClicked?: () => void
}

export const ArtistBio: React.FC<ArtistBioProps> = ({ bio }) => {
  const { credit, partnerID, text } = bio.biographyBlurb ?? {}
  const partnerHref = `${sd.APP_URL}/${partnerID}`

  return (
    <>
      {!!credit && (
        <Text mb={1} variant="sm">
          <RouterLink to={partnerHref}>{credit}</RouterLink>
        </Text>
      )}

      {text && <HTML variant="sm" html={text} />}
    </>
  )
}

export const ArtistBioFragmentContainer = createFragmentContainer(ArtistBio, {
  bio: graphql`
    fragment ArtistBio_bio on Artist {
      biographyBlurb: biographyBlurb(format: HTML, partnerBio: false) {
        credit
        partnerID
        text
      }
    }
  `,
})
