import { Spacer } from "@artsy/palette"
import { Match } from "found"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSubApp_artist$data } from "__generated__/ArtistSubApp_artist.graphql"
import { Analytics } from "System/Analytics/AnalyticsContext"
import { ArtistBackLinkFragmentContainer } from "./Components/ArtistBackLink"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import { useSystemContext } from "System/SystemContext"

interface ArtistSubAppProps {
  artist: ArtistSubApp_artist$data
  match: Match
}

const ArtistSubApp: React.FC<ArtistSubAppProps> = ({
  artist,
  children,
  match,
}) => {
  const { isEigen } = useSystemContext()

  useScrollToOpenArtistAuthModal()

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
      }
    `,
  }
)
