import {
  Button,
  Clickable,
  Link,
  Modal,
  QuestionCircleIcon,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Component } from "react"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import Events from "Utils/Events"
import track from "react-tracking"

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

// TODO: Replace this modal
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
        <Tooltip width={null} size="sm" content="Learn more" placement="top">
          <Clickable
            onClick={this.openModal.bind(this)}
            ml={1}
            style={{ lineHeight: 0 }}
          >
            <QuestionCircleIcon aria-hidden title="" />
          </Clickable>
        </Tooltip>

        <Modal
          onClose={this.closeModal}
          show={this.state.isModalOpen}
          title="Price in context"
          FixedButton={
            <Button onClick={this.closeModal} width="100%">
              Got it
            </Button>
          }
        >
          <Spacer y={2} />

          <Text variant="sm">
            This feature aims to provide insight into the range of prices for an
            artist's works and allow buyers to discover other available works by
            the artist at different price points.
          </Text>

          <Spacer y={2} />

          <Text variant="sm">
            The graph displays current and past list prices for works that are
            similar in size and category to the work you're viewing. The prices
            included in the graph are only from galleries and dealers on Artsy.
          </Text>

          <Spacer y={2} />

          <Text variant="sm">
            Artwork prices are affected by{" "}
            <Link
              href={sd.APP_URL + "/article/artsy-editorial-artworks-prices"}
            >
              a variety of objective and subjective factors
            </Link>{" "}
            including the artist's relative position in the art market and the
            artwork's size, condition, rarity, and subject matter. These factors
            are unique to every artwork. As such, this feature is not intended
            to provide pricing guidance for the artwork being viewed. If you
            have feedback or questions{" "}
            <Link href="mailto:support@artsy.net">let us know</Link>.
          </Text>
        </Modal>
      </>
    )
  }
}
