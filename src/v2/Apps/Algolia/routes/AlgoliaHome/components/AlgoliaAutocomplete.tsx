import { AutocompleteInput, Box, BoxProps, Text } from "@artsy/palette"
import { useRouter } from "found"
import { GlobalAlgoliaHit } from "v2/Apps/Algolia/types"

export const PLACEHOLDER = "Search by artist, gallery, style, theme, tag, etc."

type Option = Required<GlobalAlgoliaHit>

export const AlgoliaAutocomplete = props => {
  const { refine, hits, currentRefinement } = props
  const { router } = useRouter()
  const allResultsOption: Option = {
    name: `See full results for “${currentRefinement}”`,
    href: `/algolia/results?query=${currentRefinement}`,
    type: "AllResults",
  } as Option
  const options = [...(currentRefinement ? [allResultsOption] : []), ...hits]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    refine(event.target.value)
  }

  const handleClear = () => refine("")
  const handleSelect = (option: Option) => {
    router.push(option.href!)
  }

  const renderOption = (option: Option) => {
    const isAllResultsOption = option.type === "AllResults"

    const boxProps: BoxProps = {}

    if (isAllResultsOption) {
      boxProps.borderBottom = "1px solid"
      boxProps.borderColor = "black10"
    }

    return (
      <Box
        px={2}
        py={1}
        {...boxProps}
        minHeight={60}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Text variant="sm" overflowEllipsis>
          {option.name}
        </Text>
        {!isAllResultsOption && (
          <Text color="black60" variant="xs" overflowEllipsis>
            {option.type}
          </Text>
        )}
      </Box>
    )
  }

  return (
    <AutocompleteInput
      options={options}
      placeholder={PLACEHOLDER}
      onChange={handleChange}
      onSelect={handleSelect}
      onClear={handleClear}
      renderOption={renderOption}
    />
  )
}
