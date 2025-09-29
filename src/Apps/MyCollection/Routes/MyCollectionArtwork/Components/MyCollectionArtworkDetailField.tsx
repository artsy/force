import { Box, ReadMore, Text } from "@artsy/palette"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

const EMPTY_VALUE = "----"
export const MyCollectionArtworkDetailField = ({
  label,
  value,
  maxLines = 0,
}: {
  label: string
  value?: string | null
  maxLines?: number
}) => {
  return (
    <>
      <Box>
        <Text color="mono60" variant={["sm", "xs", "sm"]}>
          {label}
        </Text>
      </Box>

      <Text
        variant={["sm", "xs", "sm"]}
        color={value ? "mono100" : "mono60"}
        hyphenate
      >
        {maxLines ? (
          <ReadMore maxLines={maxLines} content={value || EMPTY_VALUE} />
        ) : (
          value || EMPTY_VALUE
        )}
      </Text>
    </>
  )
}
