import {
  ActionType,
  type ClickedVerifiedRepresentative,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Pill, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistStoryRepresentation_artist$key } from "__generated__/ArtistStoryRepresentation_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistStoryRepresentationProps {
  artist: ArtistStoryRepresentation_artist$key
}

export const useHasArtistStoryRepresentation = (
  artist: ArtistStoryRepresentation_artist$key,
) => {
  const data = useFragment(FRAGMENT, artist)

  return data.verifiedRepresentatives.length > 0
}

export const ArtistStoryRepresentation: React.FC<
  ArtistStoryRepresentationProps
> = ({ artist: artistRef }) => {
  const artist = useFragment(FRAGMENT, artistRef)
  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId } = useAnalyticsContext()
  const { verifiedRepresentatives } = artist

  if (verifiedRepresentatives.length === 0) {
    return null
  }

  return (
    <Box data-testid="artist-story-representation">
      <Text variant={["xs", "sm"]} color="mono60" textAlign={["left", "right"]}>
        Featured representation
      </Text>

      <Stack gap={1} mt={1} alignItems={["flex-start", "flex-end"]}>
        {verifiedRepresentatives.map(({ partner }) => {
          const icon = partner.profile?.icon
          const handleClick = () => {
            const payload: ClickedVerifiedRepresentative = {
              action: ActionType.clickedVerifiedRepresentative,
              context_module: ContextModule.artistHeader,
              context_page_owner_id: contextPageOwnerId ?? "Unknown",
              context_page_owner_type: contextPageOwnerType,
              destination_page_owner_id: partner.internalID,
              destination_page_owner_type: OwnerType.partner,
            }
            trackEvent(payload)
          }

          return (
            <Pill
              key={partner.internalID}
              as={RouterLink}
              variant="profile"
              compact={verifiedRepresentatives.length > 3}
              {...(icon?.src1x?.src && icon.src2x?.src
                ? { src: [icon.src1x.src, icon.src2x.src] }
                : {})}
              // @ts-ignore
              to={partner.href}
              onClick={handleClick}
            >
              {partner.name}
            </Pill>
          )
        })}
      </Stack>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStoryRepresentation_artist on Artist {
    verifiedRepresentatives {
      partner {
        internalID
        name
        href
        profile {
          icon {
            src1x: cropped(width: 30, height: 30) {
              src
            }
            src2x: cropped(width: 60, height: 60) {
              src
            }
          }
        }
      }
    }
  }
`
