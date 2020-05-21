import {
  Error,
  Footer,
  FormContainer as Form,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
  SubmitButton,
} from "v2/Components/Authentication/commonElements"
import QuickInput from "v2/Components/QuickInput"
import { Formik, FormikProps } from "formik"
import React from "react"
import { recaptcha } from "v2/Utils/recaptcha"
import { FormProps, InputValues, ModalType } from "../Types"
import { ForgotPasswordValidator } from "../Validators"

export class MobileForgotPasswordForm extends React.Component<FormProps> {
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
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          status,
        }: FormikProps<InputValues>) => {
          return (
            <MobileContainer>
              <MobileInnerWrapper>
                <Form
                  onSubmit={handleSubmit}
                  height={270}
                  data-test="ForgotPasswordForm"
                >
                  <MobileHeader>{this.props.title}</MobileHeader>
                  <QuickInput
                    block
                    error={errors.email}
                    placeholder="Enter your email address"
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                  />
                  {status && !status.success && (
                    <Error show>{status.error}</Error>
                  )}
                  <SubmitButton disabled={isSubmitting}>
                    Send me reset instructions
                  </SubmitButton>
                  <Footer
                    handleTypeChange={this.props.handleTypeChange}
                    mode={"forgot" as ModalType}
                  />
                </Form>
              </MobileInnerWrapper>
            </MobileContainer>
          )
        }}
      </Formik>
    )
  }
}
