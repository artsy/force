import {
  ArtistStoryHeaderImage,
  useHasArtistStoryHeaderImage,
} from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryHeaderImage"
import { LoopingVimeoVideo } from "Components/LoopingVimeoVideo/LoopingVimeoVideo"
import type { ArtistStoryHeaderMedia_artist$key } from "__generated__/ArtistStoryHeaderMedia_artist.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistStoryHeaderMediaProps {
  artist: ArtistStoryHeaderMedia_artist$key
  onPlayVideo?: () => void
  onPauseVideo?: () => void
}

export const ArtistStoryHeaderMedia: React.FC<ArtistStoryHeaderMediaProps> = ({
  artist: artistRef,
  onPlayVideo,
  onPauseVideo,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const hasImage = useHasArtistStoryHeaderImage(artist)
  const [hasVideoFailed, setHasVideoFailed] = useState(false)
  const headerVideo = artist.featuredStory?.headerVideo

  // A broken video gives way to the image when there is one to show.
  if (headerVideo && !(hasVideoFailed && hasImage)) {
    const { video } = headerVideo

    return (
      <LoopingVimeoVideo
        playerUrl={video.playerUrl}
        aspectRatio={video.aspectRatio ?? 16 / 9}
        title={video.title}
        posterUrl={artist.featuredStory?.headerImage?.image?.resized?.src}
        onPlay={onPlayVideo}
        onPause={onPauseVideo}
        onError={() => setHasVideoFailed(true)}
      />
    )
  }

  return <ArtistStoryHeaderImage artist={artist} />
}

const FRAGMENT = graphql`
  fragment ArtistStoryHeaderMedia_artist on Artist {
    featuredStory {
      headerVideo {
        video {
          playerUrl
          aspectRatio
          title
        }
      }
      headerImage {
        image {
          resized(
            width: 1600
            version: ["main", "normalized", "larger", "large"]
          ) {
            src
          }
        }
      }
    }
    ...ArtistStoryHeaderImage_artist
  }
`
