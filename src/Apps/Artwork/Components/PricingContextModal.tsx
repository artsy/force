import {
  Button,
  Clickable,
  ModalDialog,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Component } from "react"
import Events from "Utils/Events"
import track from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import HelpIcon from "@artsy/icons/HelpIcon"

interface State {
  isModalOpen?: boolean
}

@track(
  {
    context_module: DeprecatedSchema.ContextModule.PriceContext,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class PricingContextModal extends Component<State> {
  state = {
    isModalOpen: false,
  }

  @track({
    action_type: DeprecatedSchema.ActionType.Click,
    flow: DeprecatedSchema.Flow.ArtworkPriceContext,
    subject: DeprecatedSchema.Subject.QuestionMarkIcon,
  })
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <>
        <Tooltip width="auto" content="Learn more" placement="top">
          <Clickable
            onClick={this.openModal.bind(this)}
            ml={1}
            style={{ lineHeight: 0 }}
            aria-label="Learn more"
          >
            <HelpIcon aria-hidden title="" />
          </Clickable>
        </Tooltip>

        {this.state.isModalOpen && (
          <ModalDialog
            onClose={this.closeModal}
            title="Price in context"
            footer={
              <Button onClick={this.closeModal} width="100%">
                Got it
              </Button>
            }
          >
            <Spacer y={1} />

            <Text variant="sm">
              This feature aims to provide insight into the range of prices for
              an artist's works and allow buyers to discover other available
              works by the artist at different price points.
            </Text>

            <Spacer y={1} />

            <Text variant="sm">
              The graph displays current and past list prices for works that are
              similar in size and category to the work you're viewing. The
              prices included in the graph are only from galleries and dealers
              on Artsy.
            </Text>

            <Spacer y={1} />

            <Text variant="sm">
              Artwork prices are affected by{" "}
              <RouterLink inline to="/article/artsy-editorial-artworks-prices">
                a variety of objective and subjective factors
              </RouterLink>{" "}
              including the artist's relative position in the art market and the
              artwork's size, condition, rarity, and subject matter. These
              factors are unique to every artwork. As such, this feature is not
              intended to provide pricing guidance for the artwork being viewed.
              If you have feedback or questions{" "}
              <RouterLink inline to="mailto:support@artsy.net">
                let us know
              </RouterLink>
              .
            </Text>
          </ModalDialog>
        )}
      </>
    )
  }
}
