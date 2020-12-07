import { Button, Flex, Modal, space } from "@artsy/palette"
import React from "react"
import { useSystemContext } from "v2/Artsy"
import { PasswordInput } from "v2/Components/PasswordInput"
import { Form, Formik, FormikProps } from "formik"
import { Error } from "v2/Components/Authentication/commonElements"
import { ConfirmPassword } from "./Mutations/ConfirmPassword"
import { ConfirmPasswordInput } from "v2/__generated__/ConfirmPasswordMutation.graphql"

interface ConfirmPasswordModalProps {
  onConfirm: (password: string, formikBag: FormikProps<any>) => void
  onCancel: () => void
  show: boolean
  title?: string
  inputMessage?: string
}

export const ConfirmPasswordModal: React.FC<ConfirmPasswordModalProps> = props => {
  const { onCancel, onConfirm, show, title, inputMessage } = props
  const { relayEnvironment } = useSystemContext()

  const onSubmit = async (
    { password }: ConfirmPasswordInput,
    formikBag: FormikProps<any>
  ) => {
    formikBag.setStatus({ error: undefined })
    try {
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
      <Formik
        initialValues={{
          password: "",
        }}
        onSubmit={onSubmit}
      >
        {({
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
              error={
                !values.password && (inputMessage || "Password is required.")
              }
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {status && !status.success && <Error show>{status.error}</Error>}
            <Flex mt={space(2)} justifyContent="flex-end">
              <Button variant="noOutline" onClick={onClickCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={!values.password}
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
