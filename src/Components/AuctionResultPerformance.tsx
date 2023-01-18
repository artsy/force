import { Text, Flex } from "@artsy/palette"

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

  const sign = value[0] === "-" ? "-" : "+"
  const color = sign === "+" ? "green100" : "red100"
  const text = sign === "+" ? value : value.slice(1)

  return (
    <Flex
      flexDirection="row"
      justifyContent={align === "right" ? "flex-end" : undefined}
      alignItems="baseline"
    >
      <Text variant="sm-display" fontWeight="medium" color={color}>
        {sign}
        {text} est
      </Text>
    </Flex>
  )
}
