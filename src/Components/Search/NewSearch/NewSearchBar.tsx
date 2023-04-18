import { AutocompleteInput, Box } from "@artsy/palette"
import { ClassI18n } from "System/i18n/ClassI18n"
import { Media } from "Utils/Responsive"

export const NewSearchBar = () => {
  const handleChange = ({ target: { value } }) => {
    console.log("Seach input value ", value)
  }

  const renderAutosuggestComponent = (t, { xs }) => {
    return (
      <AutocompleteInput
        placeholder={xs ? t`navbar.searchArtsy` : t`navbar.searchBy`}
        data-test-id="autocomplete-input"
        spellCheck={false}
        options={[]}
        onChange={handleChange}
      />
    )
  }

  return (
    <Box flex={1}>
      <ClassI18n>
        {({ t }) => (
          <>
            <Media at="xs">{renderAutosuggestComponent(t, { xs: true })}</Media>
            <Media greaterThan="xs">
              {renderAutosuggestComponent(t, { xs: false })}
            </Media>
          </>
        )}
      </ClassI18n>
    </Box>
  )
}
