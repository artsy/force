import { FullBleed, Spacer } from "@artsy/palette"
import {
  ArtistHeaderEditorial,
  useHasArtistHeaderEditorial,
} from "Apps/Artist/Components/ArtistHeader/ArtistHeaderEditorial"
import { ArtistStoryIntro } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryIntro"
import { ArtistStoryMobileHeader } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryMobileHeader"
import { ArtistStorySplitHeader } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStorySplitHeader"
import { ArtistStoryVideoHeader } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryVideoHeader"
import { AppContainer } from "Apps/Components/AppContainer"
import { getENV } from "Utils/getENV"
import type { ArtistStoryHeader_artist$key } from "__generated__/ArtistStoryHeader_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryHeaderProps {
  artist: ArtistStoryHeader_artist$key
}

export const ArtistStoryHeader: React.FC<ArtistStoryHeaderProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const hasEditorial = useHasArtistHeaderEditorial(artist)
  const layout = getLayout(
    !!getENV("IS_MOBILE"),
    !!artist.featuredStory?.headerVideo,
  )

  return (
    <>
      {layout === "mobile" && <ArtistStoryMobileHeader artist={artist} />}

      {layout === "video" && <ArtistStoryVideoHeader artist={artist} />}

      {layout === "split" && <ArtistStorySplitHeader artist={artist} />}

      {layout !== "split" && (
        <>
          <Spacer y={4} />

          <ArtistStoryIntro artist={artist} />
        </>
      )}

      {hasEditorial && (
        <>
          <Spacer y={4} />

          <FullBleed bg="mono5" py={2}>
            <AppContainer px={[2, 4]}>
              <ArtistHeaderEditorial artist={artist} isInFeaturedStory />
            </AppContainer>
          </FullBleed>
        </>
      )}
    </>
  )
}

const getLayout = (isMobile: boolean, hasHeaderVideo: boolean) => {
  if (isMobile) return "mobile"
  if (hasHeaderVideo) return "video"

  return "split"
}

const FRAGMENT = graphql`
  fragment ArtistStoryHeader_artist on Artist {
    featuredStory {
      headerVideo {
        internalID
      }
    }
    ...ArtistStoryMobileHeader_artist
    ...ArtistStorySplitHeader_artist
    ...ArtistStoryVideoHeader_artist
    ...ArtistStoryIntro_artist
    ...ArtistHeaderEditorial_artist
  }
`
