import {
  ActionType,
  type ClickedVerifiedRepresentative,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Pill, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistRepresentation_artist$key } from "__generated__/ArtistRepresentation_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistRepresentationProps {
  artist: ArtistRepresentation_artist$key
}

export const ArtistRepresentation: React.FC<ArtistRepresentationProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  const { trackEvent } = useTracking()
  const { contextPageOwnerType, contextPageOwnerId } = useAnalyticsContext()

  if (artist.verifiedRepresentatives.length === 0) return null

  return (
    <Stack gap={2}>
      <Text variant="xs">Represented by featured galleries</Text>

      <Stack gap={1} flexDirection="row" flexWrap="wrap">
        {artist.verifiedRepresentatives.map(({ partner }) => {
          const payload: ClickedVerifiedRepresentative = {
            action: ActionType.clickedVerifiedRepresentative,
            context_module: ContextModule.artistHeader,
            context_page_owner_id: contextPageOwnerId ?? "Unknown",
            context_page_owner_type: contextPageOwnerType,
            destination_page_owner_id: partner.internalID,
            destination_page_owner_type: OwnerType.partner,
          }

          const icon = partner.profile?.icon

          return (
            <Pill
              key={partner.internalID}
              as={RouterLink}
              variant="profile"
              {...(icon?._1x?.src && icon?._2x?.src
                ? { src: [icon?._1x?.src, icon?._2x?.src] }
                : {})}
              // @ts-ignore
              to={partner.href}
              onClick={() => {
                trackEvent(payload)
              }}
            >
              {partner.name}
            </Pill>
          )
        })}
      </Stack>
    </Stack>
  )
}

const fragment = graphql`
  fragment ArtistRepresentation_artist on Artist {
    verifiedRepresentatives {
      partner {
        internalID
        name
        href
        profile {
          icon {
            _1x: cropped(width: 45, height: 45) {
              src
            }
            _2x: cropped(width: 90, height: 90) {
              src
            }
          }
        }
      }
    }
  }
`
