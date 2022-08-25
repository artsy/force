import { ModalDialog, Button, Text } from "@artsy/palette"

export const MyCollectionArtworkSWAHowItWorksModal: React.FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const article =
    "https://support.artsy.net/hc/en-us/sections/360008311913-Sell-with-Artsy"

  return (
    <ModalDialog
      title="How It Works"
      onClose={onClose}
      width={["100%", 600]}
      footer={
        <Button onClick={onClose} width="100%">
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
        <a href={article} target="_blank" rel="noopener noreferrer">
          Collector Help Center
        </a>
      </Text>
      <Text>
        Or get in touch with one of our specialists at{" "}
        <a href="mailto:sell@artsymail.com">sell@artsymail.com</a>
      </Text>
    </ModalDialog>
  )
}
