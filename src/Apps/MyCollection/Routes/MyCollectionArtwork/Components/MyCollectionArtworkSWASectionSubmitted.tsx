import { Flex, Text, Clickable } from "@artsy/palette"
import { CheckMarkIcon } from "../CheckMarkIcon"

export const MyCollectionArtworkSWASectionSubmitted = () => {
  return (
    <>
      <Flex alignItems="center" flexDirection={"row"} mb={2} mt={2}>
        <CheckMarkIcon />
        <Text variant="sm" ml={0.5}>
          Artwork has been submitted for sale
        </Text>
      </Flex>

      <Text mb={2} color="black60">
        Have a question? Visit our{" "}
        <Clickable
          onClick={() => {
            return
          }}
          color="black100"
          textDecoration="underline"
        >
          help center
        </Clickable>{" "}
        or get in touch with one of our specialists at{" "}
        <Clickable color="black100" textDecoration="underline">
          <a href="mailto:sell@artsymail.com">sell@artsymail.com</a>
        </Clickable>
      </Text>
    </>
  )
}
