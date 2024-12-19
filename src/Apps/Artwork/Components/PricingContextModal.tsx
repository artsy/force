import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import HelpIcon from "@artsy/icons/HelpIcon"
import {
  Button,
  Clickable,
  ModalDialog,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useState } from "react"
import { useTracking } from "react-tracking"

export const PricingContextModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tracking = useTracking()

  const openModal = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      context_module: DeprecatedSchema.ContextModule.PriceContext,
      flow: DeprecatedSchema.Flow.ArtworkPriceContext,
      subject: DeprecatedSchema.Subject.QuestionMarkIcon,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Tooltip width="auto" content="Learn more" placement="top">
        <Clickable
          onClick={openModal}
          ml={1}
          style={{ lineHeight: 0 }}
          aria-label="Learn more"
        >
          <HelpIcon aria-hidden title="" />
        </Clickable>
      </Tooltip>

      {isModalOpen && (
        <ModalDialog
          onClose={closeModal}
          title="Price in context"
          footer={
            <Button onClick={closeModal} width="100%">
              Got it
            </Button>
          }
        >
          <Spacer y={1} />

          <Text variant="sm">
            This feature aims to provide insight into the range of prices for an
            artist's works and allow buyers to discover other available works by
            the artist at different price points.
          </Text>

          <Spacer y={1} />

          <Text variant="sm">
            The graph displays current and past list prices for works that are
            similar in size and category to the work you're viewing. The prices
            included in the graph are only from galleries and dealers on Artsy.
          </Text>

          <Spacer y={1} />

          <Text variant="sm">
            Artwork prices are affected by{" "}
            <RouterLink inline to="/article/artsy-editorial-artworks-prices">
              a variety of objective and subjective factors
            </RouterLink>{" "}
            including the artist's relative position in the art market and the
            artwork's size, condition, rarity, and subject matter. These factors
            are unique to every artwork. As such, this feature is not intended
            to provide pricing guidance for the artwork being viewed. If you
            have feedback or questions{" "}
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
