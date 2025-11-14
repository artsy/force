import { Text } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export const AuctionResultPerformance = ({
  value,
}: {
  value: string | null
}) => {
  if (value === null) {
    return null
  }

  const sign = value[0] === "-" ? "-" : "+"
  const color = sign === "+" ? "green100" : "red100"
  const text = sign === "+" ? value : value.slice(1)

  return (
    <Text
      variant={["xs", "sm-display"]}
      fontWeight={["bold", "medium"]}
      color={color}
    >
      <Media lessThan="sm">
        &nbsp;({sign}
        {text} est)
      </Media>
      <Media greaterThan="xs">
        {sign}
        {text} est
      </Media>
    </Text>
  )
}
