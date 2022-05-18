import { Box, Message, Text } from "@artsy/palette"
import { Sticky } from "v2/Components/Sticky"

export const ZeroState: React.FC = () => {
  return (
    <Box width="100%" my={1}>
      <Sticky>
        {({ stuck }) => {
          return (
            <Box pt={stuck ? 1 : 0}>
              <Message>
                <Text>No works available by the artist at this time</Text>
                <Text textColor="black60">
                  Create an Alert to receive notifications when new works are
                  added
                </Text>
              </Message>
            </Box>
          )
        }}
      </Sticky>
    </Box>
  )
}
