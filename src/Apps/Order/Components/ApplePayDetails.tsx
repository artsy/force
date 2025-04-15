import { Flex, Text } from "@artsy/palette"
import ApplePayMarkIcon from "@artsy/icons/ApplePayMarkIcon"

interface Props {
  textColor?: string
}

export const ApplePayDetails = (props: Props) => {
  const { textColor = "black100" } = props

  return (
    <Flex alignItems="center">
      <ApplePayMarkIcon mr={1} width="26px" height="26px" />

      <Text
        variant="sm-display"
        color={textColor}
        style={{ position: "relative", top: "1px" }}
      >
        Apple Pay
      </Text>
    </Flex>
  )
}
