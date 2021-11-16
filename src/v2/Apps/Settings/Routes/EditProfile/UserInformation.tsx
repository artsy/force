import * as React from "react"
import {
  QueryRenderer,
  RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import { useSystemContext } from "v2/System/SystemContext"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { Form, Formik, FormikProps } from "formik"
import { UserInformation_me } from "v2/__generated__/UserInformation_me.graphql"
import { UserInformationQuery } from "v2/__generated__/UserInformationQuery.graphql"
import { Box, Button, Text, Banner, Input } from "@artsy/palette"
import { ChangeUserInformationValidator } from "v2/Components/Authentication/Validators"
import { PasswordInput } from "v2/Components/PasswordInput"
import type { SystemContextProps } from "@artsy/reaction/dist/Artsy"
import { UpdateUserInformation } from "./UpdateUserInformationMutation"
import {
  UpdateMyProfileInput,
  UpdateUserInformationMutationResponse,
} from "v2/__generated__/UpdateUserInformationMutation.graphql"

interface UserInformationProps extends SystemContextProps {
  me: UserInformation_me
  relay: RelayRefetchProp
}

export const UserInformation: React.FC<UserInformationProps> = ({
  me,
  relay,
}) => {
  const { relayEnvironment } = useSystemContext()

  const onSubmit = async (
    { email, name, phone, password }: UpdateMyProfileInput,
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

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const response = await UpdateUserInformation(relayEnvironment, variables)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const userOrError = response.updateMyUserProfile.userOrError

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      if (userOrError.mutationError) {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const { message, fieldErrors } = userOrError.mutationError
        if (fieldErrors) {
          // display errors for a specified form field
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          const formattedErrors = formatGravityErrors(userOrError.mutationError)
          formikBag.setErrors(formattedErrors)
        } else if (message) {
          // display generic gravity error
          formikBag.setStatus({ error: message })
        }
      } else {
        formikBag.resetForm()
        relay.refetch({})
      }
    } catch (err) {
      formikBag.setErrors(err)
    }
  }

  return (
    <Box>
      <Text variant="lg" mb={2}>
        Information
      </Text>
      <Formik
        initialValues={
          {
            name: me.name,
            email: me.email,
            phone: me.phone,
            paddleNumber: me.paddleNumber
          }
        }
        validationSchema={ChangeUserInformationValidator}
        onSubmit={onSubmit}
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
            <Input
              mb={2}
              title="Full name"
              name="name"
              error={errors.name as any}
              placeholder="Enter your full name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              width="50%"
            />
            <Input
              mb={2}
              title="Email"
              name="email"
              error={errors.email as any}
              placeholder="Enter your email address"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              width="50%"
            />
            <Input
              mb={2}
              title="Mobile number"
              name="phone"
              placeholder="Enter your mobile phone number"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              width="50%"
            />
            {me.paddleNumber && (
              <>
                <Input
                  mb={2}
                  name="paddleNumber"
                  width="50%"
                  title="Bidder number"
                  value={me.paddleNumber}
                  readOnly
                />
              </>
            )}
            <input name="internalID" value={me.internalID} hidden readOnly />
            {touched.email && values.email !== me.email && (
              <>
                <PasswordInput
                  title="Password"
                  autoFocus
                  block
                  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                  error={
                    !values.password && "Password is required to change email."
                  }
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  width="50%"
                />
              </>
            )}
            {status && !status.success && (
              <Banner variant="error">{status.error}</Banner>
            )}
            <Button loading={isSubmitting}>Save changes</Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export const UserInformationRefetchContainer = createRefetchContainer(
  UserInformation,
  {
    me: graphql`
      fragment UserInformation_me on Me {
        email
        name
        paddleNumber
        phone
      }
    `,
  },
  graphql`
    query UserInformationRefetchQuery {
      me {
        ...UserInformation_me
      }
    }
  `
)

export const UserInformationQueryRenderer = () => {
  const { user, relayEnvironment } = useSystemContext()

  if (!user) {
    console.log("NO USER INFO FOUND **********")
    return null
  }

  return (
    <QueryRenderer<UserInformationQuery>
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query UserInformationQuery @raw_response_type {
          me {
            ...UserInformation_me
          }
        }
      `}
      render={renderWithLoadProgress(UserInformationRefetchContainer)}
    />
  )
}

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
type GravityFieldErrors = UpdateUserInformationMutationResponse["updateMyUserProfile"]["userOrError"]["mutationError"]

const formatGravityErrors = ({ fieldErrors }: GravityFieldErrors) => {
  const formatted = {}
  fieldErrors.map(err => {
    formatted[err["name"]] = err.message.split(", ")
  })
  return formatted
}
