import { ActionType, type ClickedCV, ContextModule } from "@artsy/cohesion"
import { Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"

interface ArtistStoryCVLinkProps {
  slug: string
}

export const ArtistStoryCVLink: React.FC<ArtistStoryCVLinkProps> = ({
  slug,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const handleClick = () => {
    if (!contextPageOwnerId) return

    const payload: ClickedCV = {
      action: ActionType.clickedCV,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
    }
    trackEvent(payload)
  }

  return (
    <Text variant="xs">
      <RouterLink to={`/artist/${slug}/cv`} onClick={handleClick}>
        View CV
      </RouterLink>
    </Text>
  )
}
