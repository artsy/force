import {
  Banner,
  Button,
  Flex,
  ModalDialog,
  Text,
  PasswordInput,
  Spacer,
} from "@artsy/palette"
import { FC } from "react"
import { Form, Formik, FormikHelpers } from "formik"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ConfirmPassword } from "./Mutations/ConfirmPassword"
import { ConfirmPasswordInput } from "__generated__/ConfirmPasswordMutation.graphql"
import * as Yup from "yup"

interface ConfirmPasswordModalProps {
  buttonText?: string
  onCancel: () => void
  onConfirm: (
    password: string,
    formikHelpers: FormikHelpers<ConfirmPasswordInput>
  ) => void
  show: boolean
  subTitle?: string
  title?: string
}

export const ConfirmPasswordModal: FC<ConfirmPasswordModalProps> = ({
  buttonText,
  onCancel,
  onConfirm,
  show,
  subTitle,
  title,
}) => {
  const { relayEnvironment } = useSystemContext()

  if (!show) {
    return null
  }

  return (
    <ModalDialog title={title} width={440} onClose={onCancel}>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={async ({ password }: ConfirmPasswordInput, formikHelpers) => {
          formikHelpers.setStatus({ error: undefined })
          try {
            await ConfirmPassword(relayEnvironment!, {
              password,
            })
            onConfirm(password, formikHelpers)
          } catch (err) {
            formikHelpers.setStatus(err)
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          status,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            {subTitle && (
              <Text variant="sm" color="black60" mb={2}>
                {subTitle}
              </Text>
            )}

            <PasswordInput
              autoFocus
              error={errors.password as any}
              placeholder="Enter your password"
              title="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
            />

            {status && !status.success && status.error && (
              <Banner mt={2} variant="error">
                {status.error}
              </Banner>
            )}

            <Flex mt={2}>
              <Button
                flex={1}
                variant="tertiary"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>

              <Spacer x={1} />

              <Button
                flex={1}
                type="submit"
                loading={isSubmitting}
                disabled={!values.password}
              >
                {buttonText || "Confirm"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </ModalDialog>
  )
}

const VALIDATION_SCHEMA = Yup.object().shape({
  password: Yup.string().required("Password is required"),
})
