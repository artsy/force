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

      // @ts-expect-error STRICT_NULL_CHECK
      const response = await UpdateUserInformation(relayEnvironment, variables)
      // @ts-expect-error STRICT_NULL_CHECK
      const userOrError = response.updateMyUserProfile.userOrError

      // @ts-expect-error STRICT_NULL_CHECK
      if (userOrError.mutationError) {
        // @ts-expect-error STRICT_NULL_CHECK
        const { message, fieldErrors } = userOrError.mutationError
        if (fieldErrors) {
          // display errors for a specified form field
          // @ts-expect-error STRICT_NULL_CHECK
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
      <Text size="6" mb={2}>
        Information
      </Text>
      <Formik
        initialValues={me}
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
              error={errors.name as any}
              placeholder="Enter your full name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              mb={2}
              title="Email"
              error={errors.email as any}
              placeholder="Enter your email address"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              mb={2}
              title="Mobile number"
              placeholder="Enter your mobile phone number"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {me.paddleNumber && (
              <>
                <Input
                  mb={2}
                  title="Bidder number"
                  name="paddleNumber"
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
                  // @ts-expect-error STRICT_NULL_CHECK
                  error={
                    !values.password && "Password is required to change email."
                  }
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
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
        internalID
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
      // @ts-expect-error STRICT_NULL_CHECK
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

// @ts-expect-error STRICT_NULL_CHECK
type GravityFieldErrors = UpdateUserInformationMutationResponse["updateMyUserProfile"]["userOrError"]["mutationError"]

const formatGravityErrors = ({ fieldErrors }: GravityFieldErrors) => {
  const formatted = {}
  fieldErrors.map(err => {
    formatted[err["name"]] = err.message.split(", ")
  })
  return formatted
}
