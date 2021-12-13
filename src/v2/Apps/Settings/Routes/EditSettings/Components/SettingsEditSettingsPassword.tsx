import { FC, useState } from "react"
import {
  Text,
  Input,
  Button,
  Flex,
  PasswordInput,
  Join,
  Spacer,
  useToasts,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import { useUpdateSettingsPassword } from "../useUpdateSettingsPassword"
import { logout } from "v2/Utils/auth"

enum Mode {
  Pending,
  Active,
}

export const SettingsEditSettingsPassword: FC = () => {
  const [mode, setMode] = useState(Mode.Pending)
  const { sendToast } = useToasts()
  const { submitUpdateSettingsPassword } = useUpdateSettingsPassword()

  const handleActivate = () => {
    setMode(Mode.Active)
  }

  const handleCancel = () => {
    setMode(Mode.Pending)
  }

  return (
    <>
      <Text variant="lg" mb={4}>
        Password
      </Text>

      {mode === Mode.Pending ? (
        <>
          <Input
            title="Current Password"
            type="password"
            value="examplepassword"
            required
            disabled
          />

          <Button mt={4} onClick={handleActivate}>
            Create New Password
          </Button>
        </>
      ) : (
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            passwordConfirmation: "",
          }}
          onSubmit={async ({
            currentPassword,
            newPassword,
            passwordConfirmation,
          }) => {
            try {
              await submitUpdateSettingsPassword({
                currentPassword,
                newPassword,
                passwordConfirmation,
              })

              sendToast({
                variant: "success",
                message: "Password updated successfully",
              })

              await logout()

              window.location.href = "/login"
            } catch (err) {
              console.error(err)

              const error = Array.isArray(err) ? err[0] : err

              sendToast({
                variant: "error",
                message: "There was a problem",
                description: error.message,
              })
            }
          }}
        >
          {({ errors, handleBlur, handleChange, isSubmitting, values }) => {
            return (
              <Form>
                <Join separator={<Spacer mt={2} />}>
                  <PasswordInput
                    name="currentPassword"
                    title="Current Password"
                    error={errors.currentPassword}
                    placeholder="Enter your password"
                    value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="current-password"
                  />

                  <PasswordInput
                    name="newPassword"
                    title="New Password"
                    error={errors.newPassword}
                    placeholder="Enter your password"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="new-password"
                  />

                  <PasswordInput
                    name="passwordConfirmation"
                    title="Repeat New Password"
                    error={errors.passwordConfirmation}
                    placeholder="Enter your password"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="new-password"
                  />

                  <Flex mt={4}>
                    <Button type="submit" loading={isSubmitting}>
                      Save Changes
                    </Button>

                    <Button
                      ml={1}
                      type="button"
                      variant="secondaryOutline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Join>
              </Form>
            )
          }}
        </Formik>
      )}
    </>
  )
}
