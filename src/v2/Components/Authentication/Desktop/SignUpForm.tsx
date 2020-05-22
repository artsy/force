import {
  Error,
  Footer,
  FormContainer as Form,
  SubmitButton,
  TermsOfServiceCheckbox,
} from "v2/Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "v2/Components/Authentication/Types"
import { SignUpValidator } from "v2/Components/Authentication/Validators"
import PasswordInput from "v2/Components/PasswordInput"
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
      this.props.handleSubmit(valuesWithToken, formikBag)
    })
  }

  render() {
    return (
      <Formik
        initialValues={{
          accepted_terms_of_service: false,
          ...this.props.values,
        }}
        onSubmit={this.onSubmit}
        validationSchema={SignUpValidator}
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
          setTouched,
        }: FormikProps<InputValues>) => {
          const handleChange = e => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form onSubmit={handleSubmit} data-test="SignUpForm">
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
              <PasswordInput
                block
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
              {status && !status.success && <Error show>{status.error}</Error>}
              <SubmitButton loading={isSubmitting}>Sign up</SubmitButton>
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange(ModalType.login)
                }
                onAppleLogin={e => {
                  if (!values.accepted_terms_of_service) {
                    setTouched({
                      accepted_terms_of_service: true,
                    })
                  } else {
                    this.props.onAppleLogin(e)
                  }
                }}
                onFacebookLogin={e => {
                  if (!values.accepted_terms_of_service) {
                    setTouched({
                      accepted_terms_of_service: true,
                    })
                  } else {
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
