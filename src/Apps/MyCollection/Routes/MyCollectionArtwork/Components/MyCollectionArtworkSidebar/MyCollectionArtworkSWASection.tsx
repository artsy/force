import { Button, Clickable, Separator, Text } from "@artsy/palette"

export const MyCollectionArtworkSWASectionMobileLayout: React.FC = () => {
  return (
    <>
      <Text mb={2} mt={4} variant="md">
        Interested in Selling This Work?
      </Text>
      <Text mb={2} color="black60">
        Let our experts find the best sales option for you.
      </Text>
      <Button
        variant="primaryBlack"
        width="100%"
        onClick={() => {
          return
        }}
        mb={2}
      >
        Submit for Sale
      </Button>

      <Text mb={2} color="black60">
        Learn more about{" "}
        <Clickable
          onClick={() => {
            return
          }}
          color="black60"
          textDecoration="underline"
        >
          selling with Artsy.
        </Clickable>
      </Text>
    </>
  )
}

export const MyCollectionArtworkSWASectionDesktopLayout: React.FC = () => {
  return (
    <>
      <Text mb={2} variant="md" color={"black100"}>
        Interested in Selling This Work?
      </Text>
      <Text mb={2} color="black60">
        Let our experts find the best sales option for you.
      </Text>
      <Button
        variant="secondaryNeutral"
        width="100%"
        onClick={() => {
          return
        }}
        mb={2}
      >
        Submit for Sale
      </Button>
      <Text mb={2} color="black60">
        Learn more about{" "}
        <Clickable
          onClick={() => {
            return
          }}
          color="black60"
          textDecoration="underline"
        >
          selling with Artsy.
        </Clickable>
      </Text>
      <Separator mt={4} mb={2} />
    </>
  )
}
