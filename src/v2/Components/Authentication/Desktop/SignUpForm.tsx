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

          return (
            <Form onSubmit={handleSubmit} data-test="SignUpForm">
              <QuickInput
                block
                // @ts-expect-error STRICT_NULL_CHECK
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
              <PasswordInput
                block
                // @ts-expect-error STRICT_NULL_CHECK
                error={touched.password && errors.password}
                placeholder="Enter a password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                showPasswordMessage
              />
              <QuickInput
                block
                // @ts-expect-error STRICT_NULL_CHECK
                error={touched.name && errors.name}
                placeholder="Enter your full name"
                name="name"
                label="Name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TermsOfServiceCheckbox
                error={
                  touched.accepted_terms_of_service &&
                  errors.accepted_terms_of_service
                }
                checked={values.accepted_terms_of_service}
                value={values.accepted_terms_of_service}
                type="checkbox"
                name="accepted_terms_of_service"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <EmailSubscriptionCheckbox
                checked={values.agreed_to_receive_emails}
                value={values.agreed_to_receive_emails}
                type="checkbox"
                name="agreed_to_receive_emails"
                onChange={handleChange}
                onBlur={handleBlur}
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
