import { FC, useEffect, useState } from "react"
import { Input } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useFormikContext } from "formik"

import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useSystemContext } from "System/SystemContext"

import { AlertNameInputQuery } from "__generated__/AlertNameInputQuery.graphql"
import { AlertNameInput_previewSavedSearch$data } from "__generated__/AlertNameInput_previewSavedSearch.graphql"

export const AlertNameInputQueryRenderer: FC = () => {
  const { relayEnvironment } = useSystemContext()

  const { state } = useAlertContext()

  const { debouncedValue: criteriaState } = useDebouncedValue({
    value: state.criteria,
    delay: 200,
  })

  return (
    <SystemQueryRenderer<AlertNameInputQuery>
      environment={relayEnvironment}
      query={graphql`
        query AlertNameInputQuery($attributes: PreviewSavedSearchAttributes!) {
          viewer {
            previewSavedSearch(attributes: $attributes) {
              ...AlertNameInput_previewSavedSearch
            }
          }
        }
      `}
      variables={{ attributes: criteriaState }}
      placeholder={<Input title="Alert Name" disabled />}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        }

        return (
          <AlertNameInputFragmentContainer
            previewSavedSearch={props?.viewer?.previewSavedSearch ?? null}
          />
        )
      }}
    />
  )
}

interface AlertNameInputProps {
  previewSavedSearch: AlertNameInput_previewSavedSearch$data | null
}

const AlertNameInput: FC<AlertNameInputProps> = props => {
  const placeholder = props.previewSavedSearch?.displayName ?? ""
  const [statePlaceholder, setStatePlaceholder] = useState(placeholder)
  const { values, errors, handleChange, handleBlur } = useFormikContext<
    AlertFormikValues
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

export const AlertNameInputFragmentContainer = createFragmentContainer(
  AlertNameInput,
  {
    previewSavedSearch: graphql`
      fragment AlertNameInput_previewSavedSearch on PreviewSavedSearch {
        displayName
      }
    `,
  }
)
