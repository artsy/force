import { Text, Flex, FlexProps } from "@artsy/palette"
import { Highlight } from "Components/Search/SuggestionItem/Highlight"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface NoResultsProps extends FlexProps {
  query: string
}

export const NoResults: FC<NoResultsProps> = ({ query, ...rest }) => {
  const { t } = useTranslation()

  return (
    <Flex flexDirection="column" {...rest}>
      <Text alignContent="center" textAlign="center">
        {t("searchApp.noResults.sorryMessage")} “<Highlight>{query}</Highlight>”
      </Text>
      <Text color="black60" textAlign="center" mt={1}>
        {t("searchApp.noResults.trySearchingAgain")}
      </Text>
    </Flex>
  )
}
