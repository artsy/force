import { Input, Text } from "@artsy/palette"
import { SavedSearchAlertFormValues } from "Components/SavedSearchAlert/types"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useFormikContext } from "formik"
import { FC } from "react"
import { graphql } from "react-relay"
import { SavedSearchAlertNameInputQuery } from "__generated__/SavedSearchAlertNameInputQuery.graphql"

interface SavedSavedAlertNameInputProps {
  placeholder?: string
}

export const SavedSearchAlertNameInputQueryRenderer: FC = () => {
  return (
    <SystemQueryRenderer<SavedSearchAlertNameInputQuery>
      lazyLoad
      // placeholder={}
      query={graphql`
        query SavedSearchAlertNameInputQuery {
          previewSavedSearch(
            attributes: { artistIDs: ["andy-warhol"], priceRange: "*-35000" }
          ) {
            displayName
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return <Text>Loading...</Text>
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
  const { values, errors, handleChange, handleBlur } = useFormikContext<
    SavedSearchAlertFormValues
  >()

  return (
    <Input
      title="Alert Name"
      name="name"
      placeholder={placeholder}
      value={values.name}
      onChange={handleChange("name")}
      onBlur={handleBlur("name")}
      error={errors.name}
      maxLength={75}
    />
  )
}
