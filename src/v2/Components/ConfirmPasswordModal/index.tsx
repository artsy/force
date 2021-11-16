import { Banner, Button, Flex, Modal, space, Text } from "@artsy/palette"
import * as React from "react"
import { useSystemContext } from "v2/System"
import { PasswordInput } from "v2/Components/PasswordInput"
import { Form, Formik, FormikProps } from "formik"
import { ConfirmPassword } from "./Mutations/ConfirmPassword"
import { ConfirmPasswordInput } from "v2/__generated__/ConfirmPasswordMutation.graphql"
import { loginPassword } from "v2/Components/Authentication/Validators"
interface ConfirmPasswordModalProps {
  onConfirm: (password: string, formikBag: FormikProps<any>) => void
  onCancel: () => void
  show: boolean
  title?: string
  subTitle?: string
  buttonText?: string
}

export const ConfirmPasswordModal: React.FC<ConfirmPasswordModalProps> = props => {
  const { buttonText, onCancel, onConfirm, show, title, subTitle } = props
  const { relayEnvironment } = useSystemContext()

  const onSubmit = async (
    { password }: ConfirmPasswordInput,
    formikBag: FormikProps<any>
  ) => {
    formikBag.setStatus({ error: undefined })
    try {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      await ConfirmPassword(relayEnvironment, {
        password,
      })
      onConfirm(password, formikBag)
    } catch (err) {
      formikBag.setStatus(err)
    }
  }

  const onClickCancel = e => {
    e.preventDefault()
    onCancel()
  }

  return (
    <Modal
      show={show}
      title={title || "Confirm your password"}
      onClose={onCancel}
    >
      {subTitle && <Text pb={space(1)}>{subTitle}</Text>}
      <Formik
        initialValues={{
          password: "",
        }}
        onSubmit={onSubmit}
        validationSchema={loginPassword}
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
          <Form
            onSubmit={handleSubmit}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSubmit()
              }
            }}
          >
            <PasswordInput
              autoFocus
              block
              // FIXME: Formik typing issue
              error={errors.password as any}
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {status && !status.success && (
              <Banner variant="error">{status.error}</Banner>
            )}
            <Flex mt={space(2)} justifyContent="flex-end">
              <Button variant="noOutline" onClick={onClickCancel}>
                Cancel
              </Button>
              <Button
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
    </Modal>
  )
}
