import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Separator,
  Text,
  TextArea,
  useToasts,
} from "@artsy/palette"
import * as Yup from "yup"
import { FC } from "react"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Formik, Form } from "formik"
import { useDeleteAccount } from "./useDeleteAccount"
import { logout } from "v2/Utils/auth"
import { PasswordInput } from "@artsy/palette"
import { password } from "v2/Components/Authentication/Validators"

export const DeleteAccountRoute: FC = () => {
  const { sendToast } = useToasts()
  const { submitMutation } = useDeleteAccount()

  return (
    <GridColumns>
      <Column span={8}>
        <Text variant="lg" mb={4}>
          Delete My Account
        </Text>

        <Formik
          validateOnMount
          initialValues={{
            explanation: "",
            confirmation: false,
            password: "",
          }}
          validationSchema={Yup.object().shape({
            explanation: Yup.string().min(1).required(),
            confirmation: Yup.boolean().oneOf([true]),
            password: password,
          })}
          onSubmit={async ({ explanation, password }) => {
            try {
              await submitMutation({
                variables: {
                  input: { explanation, password, url: window.location.href },
                },
                rejectIf: res => {
                  return res.deleteMyAccountMutation?.userAccountOrError
                    ?.mutationError
                },
              })

              sendToast({
                variant: "success",
                message: "Profile deleted successfully",
                description: "Redirecting you to the Artsy homepage",
              })

              await logout()

              window.location.href = "/"
            } catch (err) {
              sendToast({
                variant: "error",
                message: "There was a problem",
                description: err?.[0]?.message ?? err.message,
              })
            }
          }}
        >
          {({
            errors,
            handleChange,
            isSubmitting,
            isValid,
            setFieldValue,
            touched,
            values,
          }) => {
            return (
              <Form>
                <Checkbox
                  selected={values.confirmation}
                  onSelect={selected => {
                    setFieldValue("confirmation", selected)
                  }}
                >
                  I understand that this will permanently delete my account and
                  cannot be undone.
                </Checkbox>

                <TextArea
                  name="explanation"
                  mt={2}
                  title="Please Tell Us Why"
                  value={values.explanation}
                  required
                  onChange={({ value }) => {
                    setFieldValue("explanation", value)
                  }}
                />

                <PasswordInput
                  name="password"
                  mt={2}
                  title="Password"
                  error={touched.password && errors.password}
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />

                <Button
                  mt={4}
                  type="submit"
                  disabled={!isValid}
                  loading={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )
          }}
        </Formik>

        <Separator my={4} />

        <Text variant="md" color="black60">
          <RouterLink to="edit-settings" textDecoration="none">
            Cancel
          </RouterLink>
        </Text>
      </Column>
    </GridColumns>
  )
}
