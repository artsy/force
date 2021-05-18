import {
  Error,
  Footer,
  FormContainer as Form,
  SubmitButton,
  EmailSubscriptionCheckbox,
  TermsOfServiceCheckbox,
} from "v2/Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "v2/Components/Authentication/Types"
import { SignUpValidator } from "v2/Components/Authentication/Validators"
import { PasswordInput } from "v2/Components/PasswordInput"
import QuickInput from "v2/Components/QuickInput"
import { Formik, FormikProps } from "formik"
import React, { Component } from "react"
import { recaptcha } from "v2/Utils/recaptcha"

export interface SignUpFormState {
  error?: string
}

export class SignUpForm extends Component<FormProps, SignUpFormState> {
  state = {
    error: this.props.error,
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("signup_submit", recaptcha_token => {
      const valuesWithToken = {
        ...values,
        recaptcha_token,
      }
      // @ts-expect-error STRICT_NULL_CHECK
      this.props.handleSubmit(valuesWithToken, formikBag)
    })
  }

  render() {
    const initialValues = {
      accepted_terms_of_service: false,
      agreed_to_receive_emails: false,
      ...this.props.values,
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        validationSchema={SignUpValidator}
      >
        {({
          errors,
          handleBlur,
          handleChange: formikHandleChange,
          handleSubmit,
          isSubmitting,
          setStatus,
          setTouched,
          status,
          touched,
          values,
        }: FormikProps<InputValues>) => {
          const handleChange = e => {
            setStatus(null)
            // @ts-expect-error STRICT_NULL_CHECK
            this.setState({ error: null })
            formikHandleChange(e)
          }

          const emailErrorMessage = touched.email ? errors.email : ""
          const passwordErrorMessage = touched.password ? errors.password : ""
          const nameErrorMessage = touched.name ? errors.name : ""
          const termsErrorMessage = touched.accepted_terms_of_service
            ? errors.accepted_terms_of_service
            : ""

          return (
            <Form onSubmit={handleSubmit} data-test="SignUpForm">
              <QuickInput
                autoFocus
                block
                error={emailErrorMessage}
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your email address"
                type="email"
                value={values.email}
              />
              <PasswordInput
                block
                error={passwordErrorMessage}
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter a password"
                showPasswordMessage
                value={values.password}
              />
              <QuickInput
                block
                error={nameErrorMessage}
                label="Name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your full name"
                type="text"
                value={values.name}
              />
              <TermsOfServiceCheckbox
                checked={values.accepted_terms_of_service}
                error={termsErrorMessage}
                name="accepted_terms_of_service"
                onBlur={handleBlur}
                onChange={handleChange}
                type="checkbox"
                value={values.accepted_terms_of_service}
              />
              <EmailSubscriptionCheckbox
                checked={values.agreed_to_receive_emails}
                name="agreed_to_receive_emails"
                onBlur={handleBlur}
                onChange={handleChange}
                type="checkbox"
                value={values.agreed_to_receive_emails}
              />
              {status && !status.success && <Error show>{status.error}</Error>}
              <SubmitButton loading={isSubmitting}>Sign up</SubmitButton>
              <Footer
                handleTypeChange={() =>
                  // @ts-expect-error STRICT_NULL_CHECK
                  this.props.handleTypeChange(ModalType.login)
                }
                onAppleLogin={e => {
                  if (!values.accepted_terms_of_service) {
                    setTouched({
                      accepted_terms_of_service: true,
                    })
                  } else {
                    // @ts-expect-error STRICT_NULL_CHECK
                    this.props.onAppleLogin(e)
                  }
                }}
                onFacebookLogin={e => {
                  if (!values.accepted_terms_of_service) {
                    setTouched({
                      accepted_terms_of_service: true,
                    })
                  } else {
                    // @ts-expect-error STRICT_NULL_CHECK
                    this.props.onFacebookLogin(e)
                  }
                }}
                inline
                showRecaptchaDisclaimer={this.props.showRecaptchaDisclaimer}
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}
