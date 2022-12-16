import { HTML, ReadMore, Spacer, Text } from "@artsy/palette"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { ArtworkDetailsAboutTheWorkFromArtsy_artwork$data } from "__generated__/ArtworkDetailsAboutTheWorkFromArtsy_artwork.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import track from "react-tracking"

export const READ_MORE_MAX_CHARS = {
  xs: 100,
  default: 320,
}

export interface ArtworkDetailsAboutTheWorkFromArtsyProps {
  artwork: ArtworkDetailsAboutTheWorkFromArtsy_artwork$data
}

@track({
  context_module: DeprecatedSchema.ContextModule.AboutTheWork,
})
export class ArtworkDetailsAboutTheWorkFromArtsy extends Component<
  ArtworkDetailsAboutTheWorkFromArtsyProps
> {
  @track({
    action_type: DeprecatedSchema.ActionType.Click,
    flow: DeprecatedSchema.Flow.ArtworkAboutTheWork,
    subject: DeprecatedSchema.Subject.ReadMore,
    type: DeprecatedSchema.Type.Button,
  })
  trackReadMoreClick() {
    // noop
  }

  renderDescriptionReadMore(breakpoint?: string) {
    const { description } = this.props.artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    return (
      <HTML variant="sm">
        <ReadMore
          maxChars={maxChars}
          content={description!}
          onReadMoreClicked={this.trackReadMoreClick.bind(this)}
        />
      </HTML>
    )
  }

  renderAdditionalInformationReadMore(breakpoint?: string) {
    const { additionalInformation } = this.props.artwork
    const xs = breakpoint === "xs"
    const maxChars = xs ? READ_MORE_MAX_CHARS.xs : READ_MORE_MAX_CHARS.default

    if (!additionalInformation) return null

    return (
      <HTML variant="sm">
        <ReadMore
          maxChars={maxChars}
          content={additionalInformation}
          onReadMoreClicked={this.trackReadMoreClick.bind(this)}
        />
      </HTML>
    )
  }

  render() {
    const { description, additionalInformation } = this.props.artwork

    if (!description && !additionalInformation) {
      return null
    }

    return (
      <>
        {description && (
          <>
            <Media at="xs">{this.renderDescriptionReadMore("xs")}</Media>
            <Media greaterThan="xs">{this.renderDescriptionReadMore()}</Media>
            <Spacer y={2} />
          </>
        )}

        {additionalInformation && (
          <>
            <Text variant="sm">
              <Media at="xs">
                {this.renderAdditionalInformationReadMore("xs")}
              </Media>
              <Media greaterThan="xs">
                {this.renderAdditionalInformationReadMore()}
              </Media>
            </Text>
          </>
        )}
      </>
    )
  }
}

export const ArtworkDetailsAboutTheWorkFromArtsyFragmentContainer = createFragmentContainer(
  ArtworkDetailsAboutTheWorkFromArtsy,
  {
    artwork: graphql`
      fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
        description(format: HTML)
        additionalInformation(format: HTML)
      }
    `,
  }
)
