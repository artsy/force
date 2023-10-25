import { TextArea, Text, Spacer } from "@artsy/palette"
import { SavedSearchAlertFormValues } from "Components/SavedSearchAlert/types"
import { useFormikContext } from "formik"

export const DetailsInput: React.FC = () => {
  const { values, errors, setFieldValue, handleBlur } = useFormikContext<
    SavedSearchAlertFormValues
  >()

  return (
    <>
      <Text variant="sm-display">
        Tell us more about what you’re looking for
      </Text>
      <Spacer y={1} />
      <TextArea
        name="details"
        placeholder="For example, a specific request such as ‘figurative painting’ or ‘David Hockney iPad drawings.’"
        onChange={({ value }) => {
          setFieldValue("details", value)
        }}
        onBlur={handleBlur}
        value={values.details}
        error={errors.details}
        maxLength={700}
      />
    </>
  )
}
