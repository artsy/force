import { Flex, type FlexProps, Text } from "@artsy/palette"
import { Highlight } from "Components/Search/SuggestionItem/Highlight"
import type { FC } from "react"

interface NoResultsProps extends FlexProps {
  query: string
}

export const NoResults: FC<React.PropsWithChildren<NoResultsProps>> = ({
  query,
  ...rest
}) => {
  return (
    <Flex flexDirection="column" {...rest}>
      <Text alignContent="center" textAlign="center">
        Sorry, we couldn’t find anything for “<Highlight>{query}</Highlight>”
      </Text>
      <Text color="mono60" textAlign="center" mt={1}>
        Please try searching again with a different spelling.
      </Text>
    </Flex>
  )
}
