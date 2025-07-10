import { HTML } from "@artsy/palette"
import type { ArtistBio_bio$data } from "__generated__/ArtistBio_bio.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtistBioProps {
  bio: ArtistBio_bio$data
  maxChars?: number
  onReadMoreClicked?: () => void
}

export const ArtistBio: React.FC<React.PropsWithChildren<ArtistBioProps>> = ({
  bio,
}) => {
  const { credit, text } = bio.biographyBlurb ?? {}

  return (
    <>
      {!!credit && (
        <>
          <HTML variant="sm" html={credit} />
          <br />
        </>
      )}
      {text && <HTML variant="sm" html={text} />}
    </>
  )
}

export const ArtistBioFragmentContainer = createFragmentContainer(ArtistBio, {
  bio: graphql`
    fragment ArtistBio_bio on Artist {
      biographyBlurb: biographyBlurb(format: HTML) {
        credit
        text
      }
    }
  `,
})
