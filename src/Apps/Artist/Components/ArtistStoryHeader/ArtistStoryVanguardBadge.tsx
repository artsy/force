import {
  ActionType,
  type ClickedVanguardBadge,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, type BoxProps, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistStoryVanguardBadge_artist$key } from "__generated__/ArtistStoryVanguardBadge_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistStoryVanguardBadgeProps {
  artist: ArtistStoryVanguardBadge_artist$key
}

const BADGE_PROPS: BoxProps = {
  display: "inline-flex",
  alignItems: "center",
  height: 30,
  px: 1,
  border: "1px solid rgba(255, 255, 255, 0.7)",
  borderRadius: 15,
  background: "rgba(255, 255, 255, 0.16)",
}

export const ArtistStoryVanguardBadge: React.FC<
  ArtistStoryVanguardBadgeProps
> = ({ artist: artistRef }) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  if (!artist.vanguardYear) {
    return null
  }

  const label = (
    <Text variant="xs" color="mono0">
      {artist.vanguardYear} Vanguard Artist
    </Text>
  )

  const { slug: articleSlug, href: articleHref } = artist.vanguardArticle ?? {}

  if (!articleSlug || !articleHref) {
    return <Box {...BADGE_PROPS}>{label}</Box>
  }

  const handleClick = () => {
    if (!contextPageOwnerId || !contextPageOwnerSlug) return

    const payload: ClickedVanguardBadge = {
      action: ActionType.clickedVanguardBadge,
      context_module: ContextModule.artistVanguardBadge,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.article,
      destination_page_owner_slug: articleSlug,
    }
    trackEvent(payload)
  }

  return (
    <Box
      as={RouterLink}
      to={articleHref}
      textDecoration="none"
      onClick={handleClick}
      {...BADGE_PROPS}
    >
      {label}
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryVanguardBadge_artist on Artist {
    vanguardYear
    vanguardArticle {
      slug
      href
    }
  }
`
