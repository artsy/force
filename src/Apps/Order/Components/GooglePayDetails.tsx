import GooglePayIcon from "@artsy/icons/GooglePayIcon"
import { Flex, Text } from "@artsy/palette"

interface Props {
  textColor?: string
}

export const GooglePayDetails = (props: Props) => {
  const { textColor = "mono100" } = props

  return (
    <Flex alignItems="center">
      <GooglePayIcon mr={1} width="26px" height="26px" />

      <Text variant="sm-display" color={textColor}>
        Google Pay
      </Text>
    </Flex>
  )
}
