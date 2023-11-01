import { FC, useEffect, useState } from "react"
import { Input } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useFormikContext } from "formik"

import { ArtworkAlertFormikValues } from "Components/ArtworkAlert/Components/Steps/Details"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useArtworkAlertContext } from "Components/ArtworkAlert/Hooks/useArtworkAlertContext"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useSystemContext } from "System/SystemContext"

import { ArtworkAlertNameInputQuery } from "__generated__/ArtworkAlertNameInputQuery.graphql"
import { ArtworkAlertNameInput_previewSavedSearch$data } from "__generated__/ArtworkAlertNameInput_previewSavedSearch.graphql"

export const ArtworkAlertNameInputQueryRenderer: FC = () => {
  const { relayEnvironment } = useSystemContext()

  const { state } = useArtworkAlertContext()

  const { debouncedValue: criteriaState } = useDebouncedValue({
    value: state.criteria,
    delay: 200,
  })

  return (
    <SystemQueryRenderer<ArtworkAlertNameInputQuery>
      environment={relayEnvironment}
      query={graphql`
        query ArtworkAlertNameInputQuery(
          $attributes: PreviewSavedSearchAttributes!
        ) {
          viewer {
            previewSavedSearch(attributes: $attributes) {
              ...ArtworkAlertNameInput_previewSavedSearch
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
          <ArtworkAlertNameInputFragmentContainer
            previewSavedSearch={props?.viewer?.previewSavedSearch ?? null}
          />
        )
      }}
    />
  )
}

interface ArtworkAlertNameInputProps {
  previewSavedSearch: ArtworkAlertNameInput_previewSavedSearch$data | null
}

const ArtworkAlertNameInput: FC<ArtworkAlertNameInputProps> = props => {
  const placeholder = props.previewSavedSearch?.displayName ?? ""
  const [statePlaceholder, setStatePlaceholder] = useState(placeholder)
  const { values, errors, handleChange, handleBlur } = useFormikContext<
    ArtworkAlertFormikValues
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

export const ArtworkAlertNameInputFragmentContainer = createFragmentContainer(
  ArtworkAlertNameInput,
  {
    previewSavedSearch: graphql`
      fragment ArtworkAlertNameInput_previewSavedSearch on PreviewSavedSearch {
        displayName
      }
    `,
  }
)
