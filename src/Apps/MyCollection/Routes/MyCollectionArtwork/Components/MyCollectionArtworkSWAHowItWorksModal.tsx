import { ModalDialog, Button, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

export const MyCollectionArtworkSWAHowItWorksModal: React.FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const article =
    "https://support.artsy.net/s/topic/0TO3b000000UevOGAS/sell-with-artsy"

  return (
    <ModalDialog
      title="How It Works"
      onClose={onClose}
      width={["100%", 600]}
      footer={
        <Button onClick={onClose} width="100%" data-testId="modal-close-button">
          Close
        </Button>
      }
    >
      <Text textTransform="uppercase" variant="xs">
        Upload photos
      </Text>
      <Text mb={2}>
        Submit images of an artwork in your collection, along with relevant
        details, like the artist, time period, and medium.
      </Text>

      <Text textTransform="uppercase" variant="xs">
        Get a sales option
      </Text>
      <Text mb={2}>
        If your artwork is accepted, our specialists will give you a price
        estimate and the best sales option: at auction, via private sale, or as
        a direct listing on Artsy.
      </Text>

      <Text textTransform="uppercase" variant="xs">
        Sell your artwork
      </Text>
      <Text mb={2}>
        We’ll find the best buyer for your work and arrange shipping and secure
        payment when it sells.
      </Text>

      <Text textTransform="uppercase" variant="xs">
        find out more
      </Text>
      <Text mb={2}>
        For more information, see our{" "}
        <RouterLink
          inline
          to={article}
          target="_blank"
          data-testid="collector-help-center-link"
        >
          Collector Help Center
        </RouterLink>
      </Text>
      <Text>
        Or get in touch with one of our specialists at{" "}
        <RouterLink inline to={"mailto:sell@artsy.net"}>
          sell@artsy.net
        </RouterLink>
        {"."}
      </Text>
    </ModalDialog>
  )
}
