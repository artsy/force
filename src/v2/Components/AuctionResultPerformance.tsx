import { Text, IncreaseIcon, Flex, DecreaseIcon, Spacer } from "@artsy/palette"

export const AuctionResultPerformance = ({
  value,
  align,
}: {
  value: string | null
  align: "left" | "right"
}) => {
  if (value === null) {
    return null
  }

  const sign = value[0] === "-" ? "down" : "up"
  const color = sign === "up" ? "green100" : "red100"
  const text = sign === "up" ? value : value.slice(1)
  const Arrow = sign === "up" ? IncreaseIcon : DecreaseIcon

  return (
    <Flex
      flexDirection="row"
      justifyContent={align === "right" ? "flex-end" : undefined}
      alignItems="baseline"
    >
      <Arrow fill={color} width={10} height={10} />
      <Spacer mr="3px" />
      <Text variant="xs" fontWeight="medium" color={color}>
        {text} est
      </Text>
    </Flex>
  )
}
