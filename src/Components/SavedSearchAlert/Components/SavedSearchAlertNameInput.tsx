import { Input } from "@artsy/palette"
import { SavedSearchAlertFormValues } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useFormikContext } from "formik"
import { FC, useEffect, useMemo, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SavedSearchAlertNameInputQuery } from "__generated__/SavedSearchAlertNameInputQuery.graphql"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { debounce } from "lodash"
import { SavedSearchAlertNameInput_previewSavedSearch$data } from "__generated__/SavedSearchAlertNameInput_previewSavedSearch.graphql"

export const SavedSearchAlertNameInputQueryRenderer: FC = () => {
  const { criteria } = useSavedSearchAlertContext()
  const [criteriaState, setCriteriaState] = useState({})

  const debouncedSetCriteriaState = useMemo(
    () => debounce(setCriteriaState, 200),
    []
  )

  useEffect(() => {
    debouncedSetCriteriaState(criteria)
  }, [criteria, debouncedSetCriteriaState])

  return (
    <SystemQueryRenderer<SavedSearchAlertNameInputQuery>
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
            // @ts-expect-error "No overload matches this call" TODO: why??
            previewSavedSearch={props?.viewer?.previewSavedSearch}
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
