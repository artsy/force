import { FC } from "react"
import { Input } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useFormikContext } from "formik"
import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

export const AlertNameInput: FC = () => {
  const { state } = useAlertContext()

  const { values, errors, handleChange, handleBlur } = useFormikContext<
    AlertFormikValues
  >()

  return (
    <Input
      title="Alert Name"
      name="name"
      placeholder={state.preview.displayName}
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
