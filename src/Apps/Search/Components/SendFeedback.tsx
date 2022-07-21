import { FC } from "react"
import {
  Button,
  Column,
  GridColumns,
  Input,
  Message,
  TextArea,
  useToasts,
} from "@artsy/palette"
import { useSystemContext } from "System/useSystemContext"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { email, name } from "Components/Authentication/Validators"
import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { SendFeedbackSearchResultsMutation } from "__generated__/SendFeedbackSearchResultsMutation.graphql"

export const SendFeedback: FC = () => {
  const { isLoggedIn, user } = useSystemContext()

  const { sendToast } = useToasts()

  const { submitMutation } = useMutation<SendFeedbackSearchResultsMutation>({
    mutation: graphql`
      mutation SendFeedbackSearchResultsMutation(
        $input: SendFeedbackMutationInput!
      ) {
        sendFeedback(input: $input) {
          feedbackOrError {
            __typename
          }
        }
      }
    `,
  })

  return (
    <Formik
      validateOnMount
      initialValues={{
        name: user?.name ?? "",
        email: user?.email ?? "",
        message: "",
      }}
      validationSchema={Yup.object().shape({
        email,
        name,
        message: Yup.string().required("Please enter a message"),
      })}
      onSubmit={async ({ name, email, message }, { resetForm }) => {
        try {
          await submitMutation({
            variables: {
              input: {
                ...(isLoggedIn
                  ? { message, test: "1" }
                  : { name, email, message }),
              },
            },
            rejectIf: res => {
              return (
                res.sendFeedback?.feedbackOrError?.__typename ===
                "SendFeedbackMutationFailure"
              )
            },
          })

          sendToast({
            variant: "success",
            message: "Your message has been sent!",
            description: "Thank you for helping to improve Artsy.",
          })

          resetForm({
            touched: {},
            values: {
              name: user?.name ?? name,
              email: user?.email ?? email,
              message: "",
            },
          })
        } catch (err) {
          console.error(err)

          sendToast({
            variant: "error",
            message: err.message ?? "Something went wrong",
          })
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        isSubmitting,
        isValid,
      }) => {
        return (
          <Form>
            <GridColumns gridRowGap={4}>
              <Column span={8} wrap>
                <Message variant="info">
                  Your feedback is important to us. Tell us how we can improve
                  and help you find what you are looking for.
                </Message>
              </Column>

              {!isLoggedIn && (
                <>
                  <Column span={4}>
                    <Input
                      name="name"
                      title="Name"
                      placeholder="Your name"
                      required
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && errors.name}
                    />
                  </Column>

                  <Column span={4} wrap>
                    <Input
                      name="email"
                      title="Email"
                      placeholder="Your email"
                      required
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                    />
                  </Column>
                </>
              )}

              <Column span={8} wrap>
                <TextArea
                  name="message"
                  title="Message"
                  placeholder="Your comments here"
                  required
                  onChange={({ value }) => {
                    setFieldValue("message", value)
                  }}
                  value={values.message}
                  onBlur={handleBlur}
                  error={touched.message && errors.message}
                />
              </Column>

              <Column span={2}>
                <Button
                  type="submit"
                  width="100%"
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                >
                  Submit
                </Button>
              </Column>
            </GridColumns>
          </Form>
        )
      }}
    </Formik>
  )
}
