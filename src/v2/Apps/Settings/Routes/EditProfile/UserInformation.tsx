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
import {
  Box,
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
  const { sendToast } = useToasts()

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

      const response = await UpdateUserInformation(relayEnvironment!, variables)
      const userOrError = response.updateMyUserProfile!.userOrError

      sendToast({
        variant: "success",
        message: "Information updated successfully",
      })

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
        relay.refetch({})
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
    <Box>
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
              <input name="internalID" value={me.internalID} hidden readOnly />
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
              {status && !status.success && (
                <Banner variant="error">{status.error}</Banner>
              )}
              <Button mt={2} type="submit" loading={isSubmitting}>
                Save changes
              </Button>
            </Join>
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
