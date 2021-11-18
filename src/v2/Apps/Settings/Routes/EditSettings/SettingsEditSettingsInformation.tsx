import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Form, Formik, FormikProps } from "formik"
import { SettingsEditSettingsInformation_me } from "v2/__generated__/SettingsEditSettingsInformation_me.graphql"
import {
  Button,
  Text,
  Banner,
  Input,
  Join,
  Spacer,
  useToasts,
  PasswordInput,
} from "@artsy/palette"
import { ChangeUserInformationValidator } from "v2/Components/Authentication/Validators"
import { useUpdateSettingsInformation } from "./useUpdateSettingsInformation"

interface SettingsEditSettingsInformationProps {
  me: SettingsEditSettingsInformation_me
}

export const SettingsEditSettingsInformation: React.FC<SettingsEditSettingsInformationProps> = ({
  me,
}) => {
  const { sendToast } = useToasts()
  const { submitUpdateSettingsInformation } = useUpdateSettingsInformation()

  const onSubmit = async (
    { email, name, phone, password },
    // TODO: Fix typing & type errors
    formikBag: FormikProps<any>
  ) => {
    formikBag.setStatus({ error: undefined })

    try {
      const variables = {
        email,
        name,
        password,
        phone,
      }

      const response = await submitUpdateSettingsInformation(variables)

      const userOrError = response.updateMyUserProfile!.userOrError

      sendToast({
        variant: "success",
        message: "Information updated successfully",
      })

      // TODO: Simplify this mess
      if (userOrError!.mutationError) {
        const { message, fieldErrors } = userOrError!.mutationError
        if (fieldErrors) {
          // display errors for a specified form field
          const formattedErrors = formatGravityErrors(
            userOrError!.mutationError
          )
          formikBag.setErrors(formattedErrors)
        } else if (message) {
          // display generic gravity error
          formikBag.setStatus({ error: message })
        }
      } else {
        formikBag.resetForm()
      }
    } catch (err) {
      formikBag.setErrors(err)

      sendToast({
        variant: "error",
        message: "There was a problem",
        description: err.message,
      })
    }
  }

  return (
    <>
      <Text variant="lg" mb={4}>
        Information
      </Text>

      <Formik
        initialValues={{
          name: me.name,
          email: me.email,
          phone: me.phone,
          paddleNumber: me.paddleNumber,
          internalID: me.internalID,
        }}
        validationSchema={ChangeUserInformationValidator}
        onSubmit={onSubmit}
        validateOnBlur={false}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          status,
          touched,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Join separator={<Spacer mt={2} />}>
              <Input
                title="Full name"
                name="name"
                error={errors.name as any}
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Input
                title="Email"
                name="email"
                error={errors.email as any}
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Input
                title="Mobile number"
                name="phone"
                placeholder="Enter your mobile phone number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                type="tel"
              />

              {me.paddleNumber && (
                <>
                  <Input
                    name="paddleNumber"
                    title="Bidder number"
                    value={me.paddleNumber}
                    readOnly
                  />
                </>
              )}

              {touched.email && values.email !== me.email && (
                <>
                  <PasswordInput
                    title="Password"
                    autoFocus
                    error={
                      !values.password &&
                      "Password is required to change email."
                    }
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </>
              )}

              {/* TODO: Remove with toast usage */}
              {status && status.error && (
                <Banner variant="error">{status.error}</Banner>
              )}

              <Button mt={2} type="submit" loading={isSubmitting}>
                Save Changes
              </Button>
            </Join>
          </Form>
        )}
      </Formik>
    </>
  )
}

export const SettingsEditSettingsInformationFragmentContainer = createFragmentContainer(
  SettingsEditSettingsInformation,
  {
    me: graphql`
      fragment SettingsEditSettingsInformation_me on Me {
        email
        name
        paddleNumber
        phone
        internalID
      }
    `,
  }
)

// TODO: Clean up with error related refactoring
const formatGravityErrors = ({ fieldErrors }: any) => {
  const formatted = {}
  fieldErrors.map(err => {
    formatted[err["name"]] = err.message.split(", ")
  })
  return formatted
}
