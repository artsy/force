import { Input } from "@artsy/palette"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { SavedSearchAlertFormValues } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/SystemContext"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { SavedSearchAlertNameInputQuery } from "__generated__/SavedSearchAlertNameInputQuery.graphql"
import { SavedSearchAlertNameInput_previewSavedSearch$data } from "__generated__/SavedSearchAlertNameInput_previewSavedSearch.graphql"
import { useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export const SavedSearchAlertNameInputQueryRenderer: FC = () => {
  const { relayEnvironment } = useSystemContext()

  const { criteria } = useSavedSearchAlertContext()

  const { debouncedValue: criteriaState } = useDebouncedValue({
    value: criteria,
    delay: 200,
  })

  return (
    <SystemQueryRenderer<SavedSearchAlertNameInputQuery>
      environment={relayEnvironment}
      query={graphql`
        query SavedSearchAlertNameInputQuery(
          $attributes: PreviewSavedSearchAttributes!
        ) {
          viewer {
            previewSavedSearch(attributes: $attributes) {
              ...SavedSearchAlertNameInput_previewSavedSearch
            }
          }
        }
      `}
      variables={{ attributes: criteriaState }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        }

        return (
          <SavedSearchAlertNameInputFragmentContainer
            previewSavedSearch={(props?.viewer?.previewSavedSearch ?? null)!}
          />
        )
      }}
    />
  )
}

interface SavedSavedAlertNameInputProps {
  previewSavedSearch: SavedSearchAlertNameInput_previewSavedSearch$data
}

const SavedSearchAlertNameInput: FC<SavedSavedAlertNameInputProps> = props => {
  const placeholder = props.previewSavedSearch?.displayName ?? ""
  const [statePlaceholder, setStatePlaceholder] = useState(placeholder)
  const { values, errors, handleChange, handleBlur } = useFormikContext<
    SavedSearchAlertFormValues
  >()

  useEffect(() => {
    if (placeholder) {
      setStatePlaceholder(placeholder)
    }
  }, [placeholder])

  return (
    <Input
      title="Alert Name"
      name="name"
      placeholder={statePlaceholder}
      value={values.name}
      onChange={handleChange("name")}
      onBlur={handleBlur("name")}
      error={errors.name}
      maxLength={75}
    />
  )
}

export const SavedSearchAlertNameInputFragmentContainer = createFragmentContainer(
  SavedSearchAlertNameInput,
  {
    previewSavedSearch: graphql`
      fragment SavedSearchAlertNameInput_previewSavedSearch on PreviewSavedSearch {
        displayName
      }
    `,
  }
)
