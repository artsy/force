import { Spacer } from "@artsy/palette"
import { ArtistHeaderFragmentContainer } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"
import { isInExperimentGroup } from "Apps/Artist/Utils/artistAboveTheFoldExperiment"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { Jump } from "Utils/Hooks/useJump"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import type { ArtistApp_artist$key } from "__generated__/ArtistApp_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { ArtistAbove } from "./Components/Artist2/ArtistAbove"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"

interface ArtistAppProps {
  artist: ArtistApp_artist$key
}

export const ArtistApp: React.FC<React.PropsWithChildren<ArtistAppProps>> = ({
  artist: artistRef,
  children,
}) => {
  const artist = useFragment(artistAppLayoutFragment, artistRef)

  useScrollToOpenArtistAuthModal({ name: artist.name })

  const shouldShowExperiment = isInExperimentGroup(artist.slug)

  return (
    <>
      <ArtistMetaFragmentContainer artist={artist} />

      <Analytics contextPageOwnerId={artist.internalID}>
        {shouldShowExperiment ? (
          <>
            <Spacer y={2} />
            <ArtistAbove artist={artist} />
          </>
        ) : (
          <>
            <Spacer y={[0, 4]} />
            <ArtistHeaderFragmentContainer artist={artist} />
          </>
        )}

        <Spacer y={[0, 4]} />

        <Jump id="artistContentArea" />

        {children}
      </Analytics>
    </>
  )
}

const artistAppLayoutFragment = graphql`
  fragment ArtistApp_artist on Artist
  @argumentDefinitions(
    shouldShowExperiment: { type: "Boolean!", defaultValue: false }
  ) {
    ...ArtistMeta_artist
    ...ArtistAbove_artist @include(if: $shouldShowExperiment)
    ...ArtistHeader_artist @skip(if: $shouldShowExperiment)
    internalID
    slug
    name
  }
`
