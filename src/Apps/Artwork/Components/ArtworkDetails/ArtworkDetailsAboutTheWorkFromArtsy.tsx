import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { HTML, ReadMore, Stack, StackableBorderBox } from "@artsy/palette"
import type { ArtworkDetailsAboutTheWorkFromArtsy_artwork$data } from "__generated__/ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export interface ArtworkDetailsAboutTheWorkFromArtsyProps {
  artwork: ArtworkDetailsAboutTheWorkFromArtsy_artwork$data
}

const ArtworkDetailsAboutTheWorkFromArtsy: React.FC<
  ArtworkDetailsAboutTheWorkFromArtsyProps
> = ({ artwork }) => {
  const tracking = useTracking()

  const trackReadMoreClick = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      flow: DeprecatedSchema.Flow.ArtworkAboutTheWork,
      subject: DeprecatedSchema.Subject.ReadMore,
      type: DeprecatedSchema.Type.Button,
    })
  }

  const { descriptionHTML, additionalInformationHTML } = artwork

  if (!descriptionHTML && !additionalInformationHTML) {
    return null
  }

  return (
    <StackableBorderBox>
      <HTML variant="sm">
        <Stack gap={2}>
          {descriptionHTML && (
            <ReadMore
              maxLines={3}
              content={descriptionHTML}
              onReadMoreClicked={trackReadMoreClick}
            />
          )}

          {additionalInformationHTML && (
            <ReadMore
              maxLines={3}
              content={additionalInformationHTML}
              onReadMoreClicked={trackReadMoreClick}
            />
          )}
        </Stack>
      </HTML>
    </StackableBorderBox>
  )
}

export const ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer =
  createFragmentContainer(ArtworkDetailsAboutTheWorkFromArtsy, {
    artwork: graphql`
      fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
        descriptionHTML: description(format: HTML)
        additionalInformationHTML: additionalInformation(format: HTML)
      }
    `,
  })
