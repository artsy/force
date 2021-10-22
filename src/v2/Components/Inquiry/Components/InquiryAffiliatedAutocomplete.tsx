import { AutocompleteInput } from "@artsy/palette"
import * as React from "react";
import { useState } from "react"
import { GraphQLTaggedNode, OperationType } from "relay-runtime"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

type Option = { text: string; value: string }

interface InquiryAffiliatedAutocompleteProps<T extends OperationType> {
  query: GraphQLTaggedNode
  getOptions(response: T["response"]): Option[]
  onSelect(option: Option): void
}

export const InquiryAffiliatedAutocomplete = <T extends OperationType>({
  query,
  getOptions,
  onSelect,
}: InquiryAffiliatedAutocompleteProps<T>) => {
  const { relayEnvironment } = useSystemContext()

  const [term, setTerm] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.currentTarget.value)
  }

  const handleSelect = (option: Option) => {
    setTerm("") // Reset term
    onSelect(option)
  }

  return (
    <SystemQueryRenderer<T>
      environment={relayEnvironment}
      query={query}
      variables={{ term }}
      placeholder={
        <AutocompleteInput
          options={[]}
          placeholder="Search"
          mb={2}
          onChange={handleChange}
          value={term}
          loading
        />
      }
      render={({ props, error }) => {
        if (!props || error) {
          return (
            <AutocompleteInput
              options={[]}
              name="search"
              placeholder="Search"
              mb={2}
              onChange={handleChange}
              value={term}
              loading
            />
          )
        }

        const options = getOptions(props)

        return (
          <AutocompleteInput
            options={options}
            placeholder="Search"
            mb={2}
            onChange={handleChange}
            onSelect={handleSelect}
            value={term}
          />
        )
      }}
    />
  )
}
