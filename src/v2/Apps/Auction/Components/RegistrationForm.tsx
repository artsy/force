import { Box, Button, Flex, Sans, Serif, Spacer } from "@artsy/palette"
import { Form, Formik, FormikConfig } from "formik"
import * as React from "react"

import { CreditCardInstructions } from "v2/Apps/Auction/Components/CreditCardInstructions"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { AddressForm } from "v2/Components/AddressForm"
import { ConditionsOfSaleCheckbox } from "v2/Components/Auction/ConditionsOfSaleCheckbox"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import {
  FormValuesForRegistration,
  Registration,
  initialValuesForRegistration,
} from "v2/Apps/Auction/Components/Form"
import {
  OnSubmitValidationError,
  TrackErrors,
} from "v2/Apps/Auction/Components/OnSubmitValidationError"
import type { StripeError } from "@stripe/stripe-js"

interface RegistrationFormProps {
  onSubmit: FormikConfig<FormValuesForRegistration>["onSubmit"]
  trackSubmissionErrors: TrackErrors
  needsIdentityVerification: boolean
}

export const RegistrationForm: React.FC<RegistrationFormProps> = props => (
  <Formik<FormValuesForRegistration>
    initialValues={initialValuesForRegistration}
    onSubmit={props.onSubmit}
    validationSchema={Registration.validationSchema}
  >
    {({
      errors,
      isSubmitting,
      values,
      isValid,
      setFieldError,
      setFieldValue,
      setFieldTouched,
      setStatus,
      setSubmitting,
      status,
      submitCount,
      touched,
    }) => (
      <Form>
        <CreditCardInstructions />
        <Spacer mt={2} />

        <OnSubmitValidationError
          cb={props.trackSubmissionErrors}
          formikProps={{
            errors,
            isSubmitting,
            isValid,
            setSubmitting,
            submitCount,
          }}
        />

        <Serif mt={4} mb={0.5} size="3t">
          Credit card
        </Serif>

        <CreditCardInput
          error={{ message: errors.creditCard } as StripeError}
          onChange={({ error }) => setFieldError("creditCard", error?.message)}
        />

        <Spacer mt={4} />

        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <AddressForm
          value={values.address}
          onChange={(address, _key) => setFieldValue("address", address)}
          errors={errors.address}
          touched={touched.address}
          billing
          showPhoneNumberInput
        />

        {props.needsIdentityVerification && (
          <Serif size="4t">
            This auction requires Artsy to verify your identity before bidding.
            <br />
            <br />
            After you register, you’ll receive an email with a link to complete
            identity verification.
          </Serif>
        )}

        <Flex mt={4} mb={3} flexDirection="column" justifyContent="center">
          <Box mx="auto">
            <ConditionsOfSaleCheckbox
              selected={values.agreeToTerms}
              onSelect={value => {
                // `setFieldTouched` needs to be called first otherwise it would cause race condition.
                setFieldTouched("agreeToTerms")
                setFieldValue("agreeToTerms", value)
              }}
            />
          </Box>

          {touched.agreeToTerms && errors.agreeToTerms && (
            <Sans mt={1} color="red100" size="2" textAlign="center">
              {errors.agreeToTerms}
            </Sans>
          )}
        </Flex>

        <Button size="large" width="100%" loading={isSubmitting} type="submit">
          Register
        </Button>

        <ErrorModal
          show={status === "submissionFailed"}
          onClose={() => setStatus(null)}
        />
      </Form>
    )}
  </Formik>
)
