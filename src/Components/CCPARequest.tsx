import {
  Button,
  Input,
  TextArea,
  Text,
  ModalDialog,
  Join,
  Spacer,
  VisuallyHidden,
  Message,
  useToasts,
} from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FC, useState } from "react"
import createLogger from "Utils/logger"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { CCPARequestMutation } from "__generated__/CCPARequestMutation.graphql"
import { RouterLink } from "System/Components/RouterLink"

const logger = createLogger("Components/CCPARequest.tsx")

interface CCPARequestProps {
  onClose: () => void
}

export const CCPARequest: FC<CCPARequestProps> = ({ onClose }) => {
  const { user } = useSystemContext()

  const { submitMutation } = useMutation<CCPARequestMutation>({
    mutation: graphql`
      mutation CCPARequestMutation($input: CreateAccountRequestMutationInput!) {
        createAccountRequest(input: $input) {
          accountRequestOrError {
            ... on CreateAccountRequestMutationSuccess {
              accountRequest {
                notes
              }
            }
            ... on CreateAccountRequestMutationFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })

  const { sendToast } = useToasts()

  return (
    <Formik
      initialValues={{
        email: user?.email ?? "",
        name: user?.name ?? "",
        notes: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Please enter a valid email address")
          .required("Please enter your email address"),
        name: Yup.string().required("Please enter your name"),
        notes: Yup.string().required("Please enter a message"),
      })}
      validateOnMount
      onSubmit={async (values, { setStatus }) => {
        try {
          await submitMutation({
            variables: { input: { ...values, action: "user_data" } },
            rejectIf: res => {
              return res.createAccountRequest?.accountRequestOrError
                ?.mutationError
            },
          })

          onClose()

          sendToast({
            variant: "success",
            message: "We’ve received your message.",
          })
        } catch (err) {
          logger.error(err)

          const error = Array.isArray(err) ? err[0] : err

          setStatus({ error: true, message: error.message })
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        isValid,
        isSubmitting,
        submitForm,
        status,
      }) => {
        return (
          <ModalDialog
            title="Personal Data Request"
            onClose={onClose}
            footer={
              <Button
                width="100%"
                type="submit"
                disabled={!isValid}
                loading={isSubmitting}
                onClick={submitForm}
              >
                Save
              </Button>
            }
          >
            <Text variant="sm">
              Our{" "}
              <RouterLink inline target="_blank" to="/privacy">
                Privacy Policy
              </RouterLink>{" "}
              has the information we collect, how we use it, and why we use it.
              You can also email{" "}
              <RouterLink inline to="mailto:privacy@artsy.net">
                privacy@artsy.net
              </RouterLink>{" "}
              for more information or to submit a request.
            </Text>

            <Spacer y={4} />

            <Form>
              <Join separator={<Spacer y={1} />}>
                <TextArea
                  title="Your Message"
                  name="notes"
                  placeholder="Describe your data request"
                  onChange={({ value }) => {
                    setFieldValue("notes", value)
                  }}
                  onBlur={handleBlur}
                  error={touched.notes && errors.notes}
                  value={values.notes}
                />

                <Input
                  title="Name"
                  name="name"
                  placeholder="Your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  value={values.name}
                />

                <Input
                  title="Email"
                  name="email"
                  placeholder="Your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  value={values.email}
                />

                {status?.error && (
                  <Message variant="error">
                    {status.message ||
                      "Something went wrong. Please try again."}
                  </Message>
                )}
              </Join>

              {/* Modal footer button is outside the form element. Hidden button supports <enter> */}
              <VisuallyHidden>
                <button type="submit" tabIndex={-1} disabled={!isValid}>
                  Save
                </button>
              </VisuallyHidden>
            </Form>
          </ModalDialog>
        )
      }}
    </Formik>
  )
}

export const useCCPARequest = () => {
  const [isCCPARequestVisible, setIsCCPARequestVisible] = useState(false)

  const showCCPARequest = () => {
    setIsCCPARequestVisible(true)
  }

  const hideCCPARequest = () => {
    setIsCCPARequestVisible(false)
  }

  const CCPARequestComponent = (
    <>{isCCPARequestVisible && <CCPARequest onClose={hideCCPARequest} />}</>
  )

  return {
    showCCPARequest,
    hideCCPARequest,
    isCCPARequestVisible,
    CCPARequestComponent,
  }
}
