import { Button, Flex, Input, Spacer, Text, Toggle } from "@artsy/palette"
import { Form, type FormikProps } from "formik"
import * as Yup from "yup"

export interface ArtworkListFormikValues {
  name: string
  shareableWithPartners?: boolean
}

export const MAX_NAME_LENGTH = 40

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/\S+/, {
      message: "Name cannot be empty",
    })
    .max(MAX_NAME_LENGTH),
})

interface ArtworkListFormProps {
  /** The bag of Formik props to be used by the form */
  formik: FormikProps<ArtworkListFormikValues>

  /** Is this form being used to create or edit an artwork list? */
  mode: "create" | "edit"

  /** Handler for the Cancel button */
  onClose: () => void

  /** Does the handler for the Cancel button simply dismiss, or navigate back to the previous step? */
  cancelMode?: "dismiss" | "back"
}

export const ArtworkListForm: React.FC<
  React.PropsWithChildren<ArtworkListFormProps>
> = props => {
  const { formik, mode, onClose, cancelMode } = props

  return (
    <Form>
      <Input
        name="name"
        value={formik.values.name}
        title={mode === "create" ? "Name your list" : "List Name"}
        placeholder="E.g. Photography, Warhol, etc."
        error={formik.touched.name && formik.errors.name}
        maxLength={MAX_NAME_LENGTH}
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        showCounter
      />

      <Spacer y={4} />

      <>
        <Text variant="sm">Shared list</Text>
        <Spacer y={1} />
        <Flex>
          <Text variant="xs" color="mono60">
            Shared lists are eligible to receive offers from galleries.
            Switching sharing off will make them visible only to you, and you
            won't receive offers. List names are always private.
          </Text>
          <Spacer x={1} />
          <Toggle
            selected={formik.values.shareableWithPartners}
            onSelect={value =>
              formik.setFieldValue("shareableWithPartners", value)
            }
          />
        </Flex>
        <Spacer y={4} />
      </>

      <Flex
        justifyContent={["flex-start", "space-between"]}
        flexDirection={["column", "row-reverse"]}
      >
        <Button
          type="submit"
          loading={!!formik.isSubmitting}
          disabled={!formik.dirty || !formik.isValid}
        >
          {mode === "create" ? "Create List" : "Save Changes"}
        </Button>

        <Spacer y={[1, 0]} />

        <Button variant="secondaryBlack" onClick={onClose}>
          {cancelMode === "back" ? "Back" : "Cancel"}
        </Button>
      </Flex>
    </Form>
  )
}
