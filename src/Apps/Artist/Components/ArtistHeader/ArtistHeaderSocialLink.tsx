import { ActionType, type ClickedHeader, ContextModule } from "@artsy/cohesion"
import InstagramIcon from "@artsy/icons/InstagramIcon"
import { Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"

export interface ArtistHeaderSocialLinkProps {
  instagramHandle: string
}

export const ArtistHeaderSocialLink: React.FC<ArtistHeaderSocialLinkProps> = ({
  instagramHandle,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const handleClick = () => {
    const payload: ClickedHeader = {
      action: ActionType.clickedHeader,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType,
      subject: "social",
    }

    trackEvent(payload)
  }

  return (
    <RouterLink
      to={`https://www.instagram.com/${instagramHandle}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`Visit ${instagramHandle} on Instagram`}
      width="fit-content"
    >
      <Stack gap={0.5} flexDirection="row" alignItems="center">
        <InstagramIcon size={24} fill="mono100" display="block" />
        <Text variant="xs" color="mono100">
          {`@${instagramHandle}`}
        </Text>
      </Stack>
    </RouterLink>
  )
}
