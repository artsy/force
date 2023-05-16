import SearchIcon from "@artsy/icons/SearchIcon"
import { Text, Flex, Spacer } from "@artsy/palette"
import { Highlight } from "Components/Search/NewSearch/SuggestionItem/Highlight"
import { SuggestionItemLink } from "Components/Search/NewSearch/SuggestionItem/SuggestionItemLink"
import { FC } from "react"

interface SeeFullResultsProps {
  query: string
  onClick: () => void
}

export const SeeFullResults: FC<SeeFullResultsProps> = ({ query, onClick }) => {
  const to = `/search?term=${encodeURIComponent(query)}`

  return (
    <SuggestionItemLink onClick={onClick} to={to}>
      <Flex alignItems="center">
        <Flex
          width={50}
          height={50}
          border="1px solid"
          borderRadius="50%"
          borderColor="black10"
          justifyContent="center"
          alignItems="center"
        >
          <SearchIcon width={22} height={22} />
        </Flex>

        <Spacer x={1} />

        <Text
          variant="sm"
          mr={1}
          overflow="hidden"
          style={{ textOverflow: "ellipsis" }}
        >
          See full results for <Highlight>{query}</Highlight>
        </Text>
      </Flex>
    </SuggestionItemLink>
  )
}
