import { Flex, Text } from "@artsy/palette"

interface Props {
  textColor?: string
}

export const ApplePayDetails = (props: Props) => {
  const { textColor = "black100" } = props

  return (
    <Flex alignItems="center">
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
