import { Box, Text } from "@artsy/palette"

interface EmptyMessageProps {
  entityType: string
  query: string
}

const namesWithAnArticle = ["Artist", "Auction", "Artist Series"]

export const EmptyMessage: React.FC<EmptyMessageProps> = ({
  entityType,
  query,
}) => {
  const article = namesWithAnArticle.includes(entityType) ? "an" : "a"

  return (
    <Box my={4} textAlign="center">
      <Text variant="subtitle" mb={1}>
        {`Sorry, we couldn’t find ${article} ${entityType} for \u201C${query}\u201D`}
      </Text>
      <Text variant="text">
        Please try searching again with a different spelling.
      </Text>
    </Box>
  )
}
