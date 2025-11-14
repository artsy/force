import HelpIcon from "@artsy/icons/HelpIcon"
import { Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

export const ConversationSupport = () => {
  return (
    <>
      <Text variant="lg" mb={2}>
        Support
      </Text>

      <RouterLink
        to="https://support.artsy.net/s/topic/0TO3b000000UevEGAS/contacting-a-gallery"
        target="_blank"
        textDecoration="none"
      >
        <Flex alignItems="center" mb={1}>
          <HelpIcon mr={1} />
          <Text variant="xs">Inquiries FAQ</Text>
        </Flex>
      </RouterLink>
    </>
  )
}
