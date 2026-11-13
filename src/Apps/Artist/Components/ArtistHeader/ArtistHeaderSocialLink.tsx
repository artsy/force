import {
  ActionType,
  type ClickedSocialPost,
  ContextModule,
  type PageOwnerType,
} from "@artsy/cohesion"
import InstagramIcon from "@artsy/icons/InstagramIcon"
import { Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { getInstagramURL } from "Utils/getInstagramURL"
import { useTracking } from "react-tracking"

export interface ArtistHeaderSocialLinkProps {
  instagramHandle: string
  isInFeaturedStory?: boolean
}

export const ArtistHeaderSocialLink: React.FC<ArtistHeaderSocialLinkProps> = ({
  instagramHandle,
  isInFeaturedStory = false,
}) => {
  const color = isInFeaturedStory ? "mono0" : "mono100"
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const handle = instagramHandle.trim()
  const href = getInstagramURL(handle)

  const handleClick = () => {
    const payload: ClickedSocialPost = {
      action: ActionType.clickedSocialPost,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType as PageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_path: href ?? undefined,
      service: "instagram",
    }

    trackEvent(payload)
  }

  if (!href) {
    return null
  }

  return (
    <RouterLink
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`Visit ${handle} on Instagram`}
      width="fit-content"
    >
      <Stack gap={0.5} flexDirection="row" alignItems="center">
        <InstagramIcon size={24} fill={color} display="block" />
        <Text variant="xs" color={color}>
          {`@${handle}`}
        </Text>
      </Stack>
    </RouterLink>
  )
}
