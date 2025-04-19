import ApplePayMarkIcon from "@artsy/icons/ApplePayMarkIcon"
import { Flex, Text } from "@artsy/palette"

interface Props {
  textColor?: string
}

export const ApplePayDetails = (props: Props) => {
  const { textColor = "mono100" } = props

  return (
    <Flex alignItems="center">
      <ApplePayMarkIcon mr={1} width="26px" height="26px" />

      <Text variant="sm-display" color={textColor}>
        Apple Pay
      </Text>
    </Flex>
  )
}
