import {
  ActionType,
  type ClickedVanguardBadge,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, type BoxProps, Text } from "@artsy/palette"
import { getVanguardArticleSlug } from "Apps/Artist/Utils/getVanguardArticleSlug"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"

interface ArtistStoryVanguardBadgeProps {
  artistSlug: string
  year: string
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
> = ({ artistSlug, year }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()
  const articleSlug = getVanguardArticleSlug(artistSlug)

  const label = (
    <Text variant="xs" color="mono0">
      {year} Vanguard Artist
    </Text>
  )

  if (!articleSlug) {
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
      to={`/article/${articleSlug}`}
      textDecoration="none"
      onClick={handleClick}
      {...BADGE_PROPS}
    >
      {label}
    </Box>
  )
}
