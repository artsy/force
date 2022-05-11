import { Message, Text } from "@artsy/palette"

export const ZeroState: React.FC = () => {
  return (
    <Message>
      <Text>No works available by the artist at this time</Text>
      <Text textColor="black60">
        Create an Alert to receive notifications when new works are added
      </Text>
    </Message>
  )
}
