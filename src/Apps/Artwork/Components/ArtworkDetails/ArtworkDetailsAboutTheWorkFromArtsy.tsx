import { HTML, ReadMore, Spacer, StackableBorderBox } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { ArtworkDetailsAboutTheWorkFromArtsy_artwork$data } from "__generated__/ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"

export const READ_MORE_MAX_CHARS = {
  xs: 100,
  default: 320,
}

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

  const renderDescriptionReadMore = (breakpoint?: string) => {
    const { description } = artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    return (
      <ReadMore
        maxChars={maxChars}
        content={description as string}
        onReadMoreClicked={trackReadMoreClick}
      />
    )
  }

  const renderAdditionalInformationReadMore = (breakpoint?: string) => {
    const { additionalInformation } = artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    return (
      <ReadMore
        maxChars={maxChars}
        content={additionalInformation as string}
        onReadMoreClicked={trackReadMoreClick}
      />
    )
  }

  const { description, additionalInformation } = artwork

  if (!description && !additionalInformation) {
    return null
  }

  return (
    <StackableBorderBox>
      <HTML variant="sm">
        {description && (
          <>
            <Media at="xs">{renderDescriptionReadMore("xs")}</Media>
            <Media greaterThan="xs">{renderDescriptionReadMore()}</Media>
            <Spacer y={2} />
          </>
        )}

        {additionalInformation && (
          <>
            <Media at="xs">{renderAdditionalInformationReadMore("xs")}</Media>
            <Media greaterThan="xs">
              {renderAdditionalInformationReadMore()}
            </Media>
          </>
        )}
      </HTML>
    </StackableBorderBox>
  )
}

export const ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer =
  createFragmentContainer(ArtworkDetailsAboutTheWorkFromArtsy, {
    artwork: graphql`
      fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
        description(format: HTML)
        additionalInformation(format: HTML)
      }
    `,
  })
