import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  PasswordInput,
  Separator,
  Text,
  TextArea,
  useToasts,
} from "@artsy/palette"
import { passwordValidator } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { Form, Formik } from "formik"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { logout } from "Utils/auth"
import * as Yup from "yup"
import { DeleteAccountRoute_me$data } from "__generated__/DeleteAccountRoute_me.graphql"
import { useDeleteAccount } from "./useDeleteAccount"

interface DeleteAccountRouteProps {
  me: DeleteAccountRoute_me$data
}

export const DeleteAccountRoute: FC<DeleteAccountRouteProps> = ({
  me: { hasPassword },
}) => {
  const { sendToast } = useToasts()
  const { submitMutation } = useDeleteAccount()

  return (
    <GridColumns>
      <Column span={8}>
        <Text variant={["md", "lg"]} mb={4}>
          Delete My Account
        </Text>

        <Formik
          validateOnMount
          initialValues={{
            confirmation: false,
            explanation: "",
            hasPassword,
            password: "",
          }}
          validationSchema={Yup.object().shape({
            explanation: Yup.string().min(1).required(),
            confirmation: Yup.boolean().oneOf([true]),
            hasPassword: Yup.boolean(),
            password: passwordValidator.when("hasPassword", {
              is: true,
              otherwise: field => field.notRequired(),
            }),
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
            handleBlur,
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

                {hasPassword && (
                  <PasswordInput
                    error={touched.password && errors.password}
                    mt={2}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    title="Password"
                    value={values.password}
                  />
                )}

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

        <Text variant="sm-display" color="black60">
          <RouterLink to="edit-settings" textDecoration="none">
            Cancel
          </RouterLink>
        </Text>
      </Column>
    </GridColumns>
  )
}

export const DeleteAccountRouteFragmentContainer = createFragmentContainer(
  DeleteAccountRoute,
  {
    me: graphql`
      fragment DeleteAccountRoute_me on Me {
        hasPassword
      }
    `,
  }
)
