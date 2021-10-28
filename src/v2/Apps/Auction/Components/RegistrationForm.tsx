import { Box, Button, Flex, Text, Spacer } from "@artsy/palette"
import { Form, FormikConfig, FormikProps } from "formik"
import * as React from "react"

import { CreditCardInstructions } from "v2/Apps/Auction/Components/CreditCardInstructions"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { AddressForm } from "v2/Components/AddressForm"
import { ConditionsOfSaleCheckbox } from "v2/Components/Auction/ConditionsOfSaleCheckbox"
import { BillingInfoFormValues, BillingInfoWithTerms } from "./Form"
import {
  OnSubmitValidationError,
  TrackErrors,
} from "v2/Apps/Auction/Components/OnSubmitValidationError"
import { BillingInfoFormContext } from "./Form"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"

type FormValues = Pick<
  BillingInfoFormValues,
  "address" | "agreeToTerms" | "creditCard"
>
interface RegistrationFormProps {
  onSubmit: FormikConfig<FormValues>["onSubmit"]
  trackSubmissionErrors: TrackErrors
  needsIdentityVerification: boolean
}
export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  trackSubmissionErrors,
  needsIdentityVerification,
}) => {
  return (
    <BillingInfoFormContext
      formKeys={["addressWithPhone", "agreeToTerms", "creditCard"]}
      onSubmit={onSubmit}
    >
      {(formik: FormikProps<BillingInfoWithTerms>) => (
        <Form>
          <CreditCardInstructions />
          <Spacer mt={2} />
          <OnSubmitValidationError cb={trackSubmissionErrors} />
          <Text variant="sm">Credit Card</Text>
          <CreditCardInput />
          <Spacer mt={4} />

          <AddressForm billing showPhoneNumberInput />

          {needsIdentityVerification && (
            <Text variant="sm">
              This auction requires Artsy to verify your identity before
              bidding.
              <br />
              <br />
              After you register, you’ll receive an email with a link to
              complete identity verification.
            </Text>
          )}
          <Flex mt={4} mb={3} flexDirection="column" justifyContent="center">
            <Box mx="auto">
              <ConditionsOfSaleCheckbox
                selected={formik.values.agreeToTerms}
                onSelect={value => {
                  // `setFieldTouched` needs to be called first otherwise it would cause race condition.
                  formik.setFieldTouched("agreeToTerms")
                  formik.setFieldValue("agreeToTerms", value)
                }}
              />
            </Box>
            {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
              <Text variant="xs" color="red100" textAlign="center">
                {formik.errors.agreeToTerms}
              </Text>
            )}
          </Flex>
          <Button
            size="large"
            width="100%"
            loading={formik.isSubmitting}
            type="submit"
            mb={6}
          >
            Register
          </Button>
          <ErrorModal
            show={formik.status === "submissionFailed"}
            onClose={() => {}}
          />
        </Form>
      )}
    </BillingInfoFormContext>
  )
}
