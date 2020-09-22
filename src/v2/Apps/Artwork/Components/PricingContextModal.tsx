import {
  Box,
  Button,
  Link,
  Modal,
  QuestionCircleIcon,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import Events from "v2/Utils/Events"

interface State {
  isModalOpen?: boolean
}

@track(
  {
    context_module: Schema.ContextModule.PriceContext,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class PricingContextModal extends React.Component<State> {
  state = {
    isModalOpen: false,
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.QuestionMarkIcon,
  })
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <Box height="15px">
        <Modal
          onClose={this.closeModal}
          show={this.state.isModalOpen}
          title="Price in context"
          FixedButton={
            <Button onClick={this.closeModal} block width="100%">
              Got it
            </Button>
          }
        >
          <Spacer mt={2} />
          <Text variant="text" color="black80">
            This feature aims to provide insight into the range of prices for an
            artist's works and allow buyers to discover other available works by
            the artist at different price points.
          </Text>
          <Spacer mt={2} />
          <Text variant="text" color="black80">
            The graph displays current and past list prices for works that are
            similar in size and category to the work you're viewing. The prices
            included in the graph are only from galleries and dealers on Artsy.
          </Text>
          <Spacer mt={2} />
          <Text variant="text" color="black80">
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
          <Spacer mt={2} />
        </Modal>
        <Tooltip width={73} size="sm" content="Learn more">
          <StyledQuestionCircleIcon
            ml="5px"
            width="15px"
            onClick={this.openModal.bind(this)}
          />
        </Tooltip>
      </Box>
    )
  }
}

const StyledQuestionCircleIcon = styled(QuestionCircleIcon)`
  cursor: pointer;
`
