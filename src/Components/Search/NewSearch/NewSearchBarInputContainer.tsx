import { AutocompleteInput } from "@artsy/palette"
import { NewSearchBarSuggestion } from "Components/Search/NewSearch/NewSearchBarSuggestion"
import { NewSearchInputPillsContainer } from "Components/Search/NewSearch/NewSearchInputPillsContainer"
import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"

export const NewSearchBarInputContainer = ({ isXs }: { isXs: boolean }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState("")

  // TODO: Remove this mock options
  const OPTIONS = [
    {
      text: "Painting",
      value: "painting",
      subtitle: "An example subtitle",
    },
    { text: "Print", value: "print", subtitle: "An example subtitle" },
    { text: "Sculpture", value: "sculpture", subtitle: "An example subtitle" },
    {
      text: "Photography",
      value: "photography",
      subtitle: "An example subtitle",
    },
    {
      text: "Mixed Media",
      value: "mixed-media",
      subtitle: "An example subtitle",
    },
  ]

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <AutocompleteInput
      placeholder={isXs ? t`navbar.searchArtsy` : t`navbar.searchBy`}
      spellCheck={false}
      options={value.length < 2 ? [] : OPTIONS}
      value={value}
      header={<NewSearchInputPillsContainer />}
      renderOption={option => <NewSearchBarSuggestion option={option} />}
      onChange={handleChange}
      onClear={() => setValue("")}
    />
  )
}
