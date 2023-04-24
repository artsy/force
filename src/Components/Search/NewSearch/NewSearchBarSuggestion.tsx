import { Box, Text } from "@artsy/palette"

export const NewSearchBarSuggestion = ({ option }) => {
  return (
    <Box px={2} py={1}>
      <Text variant="sm-display">{option.text}</Text>
      <Text variant="xs" color="black60">
        {option.subtitle}
      </Text>
    </Box>
  )
}
