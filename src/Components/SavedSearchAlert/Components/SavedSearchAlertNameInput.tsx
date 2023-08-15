import { Input } from "@artsy/palette"
import { SavedSearchAlertFormValues } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useFormikContext } from "formik"
import { FC, useEffect, useMemo, useState } from "react"
import { graphql } from "react-relay"
import { SavedSearchAlertNameInputQuery } from "__generated__/SavedSearchAlertNameInputQuery.graphql"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { debounce } from "lodash"

interface SavedSavedAlertNameInputProps {
  placeholder?: string
}

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
      lazyLoad
      query={graphql`
        query SavedSearchAlertNameInputQuery(
          $attributes: PreviewSavedSearchAttributes!
        ) {
          previewSavedSearch(attributes: $attributes) {
            displayName
          }
        }
      `}
      variables={{ attributes: criteriaState }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        }

        return (
          <SavedSearchAlertNameInput
            placeholder={props?.previewSavedSearch?.displayName}
          />
        )
      }}
    />
  )
}

export const SavedSearchAlertNameInput: FC<SavedSavedAlertNameInputProps> = ({
  placeholder,
}) => {
  const [statePlaceholder, setStatePlaceholder] = useState("")
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
