import { Button, Clickable, Separator, Text } from "@artsy/palette"

interface Props {
  onSubmit: () => void
  learnMore: () => void
}

export const MyCollectionArtworkSWASectionMobileLayout: React.FC<Props> = ({
  onSubmit,
  learnMore,
}) => {
  return (
    <>
      <Text mb={2} mt={4} variant="sm-display">
        Interested in Selling This Work?
      </Text>
      <Text mb={2} color="black60">
        Let our experts find the best sales option for you.
      </Text>
      <Button
        onClick={onSubmit}
        variant="primaryBlack"
        width="100%"
        mb={2}
        data-testid="submit-for-sale"
      >
        Submit for Sale
      </Button>

      <Text mb={2} color="black60">
        Learn more about{" "}
        <Clickable
          onClick={learnMore}
          color="black60"
          textDecoration="underline"
          data-testid="learn-more"
        >
          selling with Artsy.
        </Clickable>
      </Text>
    </>
  )
}

export const MyCollectionArtworkSWASectionDesktopLayout: React.FC<Props> = ({
  onSubmit,
  learnMore,
}) => {
  return (
    <>
      <Separator my={2} />
      <Text mb={2} variant="sm-display">
        Interested in Selling This Work?
      </Text>
      <Text mb={2} color="black60">
        Let our experts find the best sales option for you.
      </Text>
      <Button
        onClick={onSubmit}
        variant="secondaryNeutral"
        width="100%"
        mb={2}
        data-testid="submit-for-sale-desktop"
      >
        Submit for Sale
      </Button>
      <Text mb={2} color="black60">
        Learn more about{" "}
        <Clickable
          onClick={learnMore}
          color="black60"
          textDecoration="underline"
          data-testid="learn-more-desktop"
        >
          selling with Artsy.
        </Clickable>
      </Text>
      <Separator mt={2} />
    </>
  )
}
