import { Spacer } from "@artsy/palette"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import type { ArtistSubApp_artist$data } from "__generated__/ArtistSubApp_artist.graphql"
import type { Match } from "found"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistBackLinkFragmentContainer } from "./Components/ArtistBackLink"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"

interface ArtistSubAppProps {
  artist: ArtistSubApp_artist$data
  match: Match
}

const ArtistSubApp: React.FC<React.PropsWithChildren<ArtistSubAppProps>> = ({
  artist,
  children,
  match,
}) => {
  const { isEigen } = useSystemContext()

  useScrollToOpenArtistAuthModal({ name: artist.name })

  return (
    <>
      <ArtistMetaFragmentContainer artist={artist} />

      <Analytics contextPageOwnerId={artist.internalID}>
        {!isEigen && <ArtistBackLinkFragmentContainer artist={artist} />}

        <Spacer y={[2, 4]} />

        {children}
      </Analytics>
    </>
  )
}

export const ArtistSubAppFragmentContainer = createFragmentContainer(
  ArtistSubApp,
  {
    artist: graphql`
      fragment ArtistSubApp_artist on Artist {
        ...ArtistMeta_artist
        ...ArtistBackLink_artist
        internalID
        name
      }
    `,
  },
)
