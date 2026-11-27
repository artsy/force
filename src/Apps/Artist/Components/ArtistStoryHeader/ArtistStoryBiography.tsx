import {
  ActionType,
  ContextModule,
  type ToggledArtistBio,
} from "@artsy/cohesion"
import { ReadMore } from "@artsy/palette"
import { Bio } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistStoryBiography_artist$key } from "__generated__/ArtistStoryBiography_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistStoryBiographyProps {
  artist: ArtistStoryBiography_artist$key
}

export const useHasArtistStoryBiography = (
  artist: ArtistStoryBiography_artist$key,
) => {
  const data = useFragment(FRAGMENT, artist)

  return !!data.biographyBlurb?.text
}

export const ArtistStoryBiography: React.FC<ArtistStoryBiographyProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const { text, credit } = artist.biographyBlurb ?? {}

  if (!text) {
    return null
  }

  const handleToggle = (expand: boolean) => {
    if (!contextPageOwnerId || !contextPageOwnerSlug) return

    const payload: ToggledArtistBio = {
      action: ActionType.toggledArtistBio,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      expand,
    }
    trackEvent(payload)
  }

  return (
    <Bio variant="sm">
      <ReadMore
        maxLines={4}
        content={credit ? `${text} ${credit}` : text}
        onReadMoreClicked={() => handleToggle(true)}
        onReadLessClicked={() => handleToggle(false)}
      />
    </Bio>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryBiography_artist on Artist {
    biographyBlurb(format: HTML) {
      text
      credit
    }
  }
`
