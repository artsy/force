import { Formik, FormikProps } from "formik"
import React, { Component } from "react"

import {
  Error,
  Footer,
  FormContainer as Form,
  SubmitButton,
} from "v2/Components/Authentication/commonElements"
import QuickInput from "v2/Components/QuickInput"
import { recaptcha } from "v2/Utils/recaptcha"
import { FormProps, InputValues, ModalType } from "../Types"
import { ForgotPasswordValidator } from "../Validators"

export interface ForgotPasswordFormState {
  error?: string
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
    this.props.handleSubmit(values, formikBag)
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values}
        onSubmit={this.onSubmit}
        validationSchema={ForgotPasswordValidator}
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
          const handleChange = e => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form
              onSubmit={handleSubmit}
              height={180}
              data-test="ForgotPasswordForm"
            >
              <QuickInput
                block
                error={touched.email && errors.email}
                placeholder="Enter your email address"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />
              {status && !status.success && <Error show>{status.error}</Error>}
              <SubmitButton disabled={isSubmitting}>
                Send me reset instructions
              </SubmitButton>
              <Footer
                handleTypeChange={this.props.handleTypeChange}
                mode={"forgot" as ModalType}
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}
