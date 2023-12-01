import { Box, Button, Flex, Link, Spacer, Text } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"

export const ConversationZeroState: React.FC = () => {
  return (
    <>
      <MetaTags title="Inbox | Artsy" />

      <Box width="100%" height="100dvh">
        <Flex
          flexDirection="column"
          width="100%"
          height="84vh"
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Flex textAlign="center" flexDirection="column" mt={-1}>
            <Text variant="lg-display">
              There are currently no <br />
              conversations.
            </Text>

            <Spacer y={1} />

            <Text variant="sm-display">
              When you inquire about available <br />
              artworks, they will appear here.
            </Text>

            <Spacer y={2} />

            <Link
              href="/collect"
              textDecoration="none"
              data-testid="AddWorksLink"
            >
              <Button size="large">Browse Works</Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
