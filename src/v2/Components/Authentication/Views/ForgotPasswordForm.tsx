import { Banner, Box, Button, Input, Join, Spacer } from "@artsy/palette"
import { Formik, FormikProps } from "formik"
import { Component } from "react"
import * as React from "react"
import { recaptcha } from "v2/Utils/recaptcha"
import { AuthenticationFooter } from "../Components/AuthenticationFooter"
import { FormProps, InputValues, ModalType } from "../Types"
import { ForgotPasswordValidator } from "../Validators"

export interface ForgotPasswordFormState {
  error?: string | null
}

export class ForgotPasswordForm extends Component<
  FormProps,
  ForgotPasswordFormState
> {
  state = {
    error: this.props.error,
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("forgot_submit")
    this.props.handleSubmit?.(values, formikBag)
  }

  render() {
    return (
      <Formik
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        initialValues={this.props.values}
        onSubmit={this.onSubmit}
        validationSchema={ForgotPasswordValidator}
        validateOnBlur={false}
      >
        {({
          values,
          errors,
          touched,
          handleChange: formikHandleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
          setStatus,
        }: FormikProps<InputValues>) => {
          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(event)
          }

          return (
            <Box
              as="form"
              data-test="ForgotPasswordForm"
              width="100%"
              // @ts-ignore
              onSubmit={handleSubmit}
            >
              <Join separator={<Spacer mt={2} />}>
                <Input
                  error={touched.email && errors.email}
                  placeholder="Enter your email address"
                  name="email"
                  title="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                  autoComplete="email"
                />

                {status && !status.success && (
                  <Banner variant="error">{status.error}</Banner>
                )}

                <Button type="submit" width="100%" disabled={isSubmitting}>
                  Send me reset instructions
                </Button>

                <AuthenticationFooter
                  handleTypeChange={this.props.handleTypeChange}
                  mode={"forgot" as ModalType}
                />
              </Join>
            </Box>
          )
        }}
      </Formik>
    )
  }
}
