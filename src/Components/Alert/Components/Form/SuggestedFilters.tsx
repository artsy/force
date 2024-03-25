import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import {
  Box,
  Clickable,
  Flex,
  Pill,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { handleFieldsWithMultipleValues } from "Components/Alert/Helpers/handleFieldsWithMultipleValues"
import { isValueSelected } from "Components/Alert/Helpers/isValueSelected"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"
import { SuggestedFiltersFetchQuery } from "__generated__/SuggestedFiltersFetchQuery.graphql"
import { times } from "lodash"
import { Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
interface SuggestedFiltersProps {
  transitionToFiltersAndTrack: () => void
}
export const SuggestedFilters: React.FC<SuggestedFiltersProps> = ({
  transitionToFiltersAndTrack,
}) => {
  const { state, dispatch } = useAlertContext()

  const { artistIDs } = state.criteria
  const { currentArtworkID } = state

  const data = useLazyLoadQuery<SuggestedFiltersFetchQuery>(
    suggestedFiltersFetchQuery,
    {
      attributes: { artistIDs },
      source: currentArtworkID
        ? { type: "ARTWORK", id: currentArtworkID }
        : undefined,
    }
  )

  if (!data.previewSavedSearch?.suggestedFilters.length) {
    return (
      <Clickable onClick={transitionToFiltersAndTrack} width="100%">
        <Flex justifyContent="space-between" alignItems={"center"}>
          <Box>
            <Text variant="sm-display">Add Filters:</Text>

            <Text variant="sm" color="black60">
              Including Price Range, Rarity, Medium, Color
            </Text>
          </Box>

          <ChevronRightIcon />
        </Flex>
      </Clickable>
    )
  }

  const suggestedFilters = data.previewSavedSearch?.suggestedFilters.filter(
    filter => {
      // Adding this check to make sure we don't add a filter type that's already
      // selected
      return !isValueSelected({
        selectedCriteria: state.criteria[filter.field] || [],
        value: filter.value,
      })
    }
  )

  return (
    <Flex justifyContent="space-between" flexDirection={"column"}>
      <Box>
        <Text variant="sm-display">Add Filters</Text>
      </Box>

      <Box>
        {suggestedFilters.map(suggestedFilter => {
          const key = `filter-label-${suggestedFilter.field}-${suggestedFilter.value}`

          return (
            <Pill
              key={key}
              variant="dotted"
              mr={1}
              mt={1}
              onClick={() => {
                switch (suggestedFilter.field) {
                  case "additionalGeneIDs":
                  case "attributionClass":
                  case "artistSeriesIDs":
                    handleFieldsWithMultipleValues({
                      selectedValue:
                        state.criteria[suggestedFilter.field] || [],
                      criteriaKey: suggestedFilter.field as SearchCriteriaAttributeKeys,
                      selected: true,
                      value: suggestedFilter.value,
                      dispatch,
                    })
                    break
                }
              }}
            >
              {suggestedFilter.displayValue}
            </Pill>
          )
        })}

        <Clickable
          onClick={transitionToFiltersAndTrack}
          mt={1}
          data-testid="moreFilters"
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text variant="xs" color="black100" mr={0.5}>
              More Filters
            </Text>
            <ChevronRightIcon height={14} width={14} />
          </Flex>
        </Clickable>
      </Box>
    </Flex>
  )
}

const suggestedFiltersFetchQuery = graphql`
  query SuggestedFiltersFetchQuery(
    $source: AlertSource
    $attributes: PreviewSavedSearchAttributes!
  ) {
    previewSavedSearch(attributes: $attributes) {
      suggestedFilters(source: $source) {
        displayValue
        field
        name
        value
      }
    }
  }
`

export const SugggestedFiltersQueryRenderer: React.FC<SuggestedFiltersProps> = props => {
  return (
    <Suspense fallback={<SuggestedFiltersPlaceholder />}>
      <SuggestedFilters {...props} />
    </Suspense>
  )
}

const SuggestedFiltersPlaceholder: React.FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="xs" mb={2}>
        Add Filters
      </SkeletonText>

      <Flex mb={4}>
        {times(5).map(index => (
          <SkeletonBox
            key={`filter-${index}`}
            width={70}
            height={30}
            mr={1}
            mb={1}
          />
        ))}
      </Flex>
    </Skeleton>
  )
}
