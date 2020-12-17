import {
  Box,
  Button,
  Flex,
  LargeSelect,
  Sans,
  Separator,
  Serif,
  Spacer,
} from "@artsy/palette"
import {
  Form,
  Formik,
  FormikHelpers as FormikActions,
  FormikValues,
} from "formik"
import { dropWhile } from "lodash"
import React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"

import { BidForm_me } from "v2/__generated__/BidForm_me.graphql"
import { BidForm_saleArtwork } from "v2/__generated__/BidForm_saleArtwork.graphql"
import { CreditCardInstructions } from "v2/Apps/Auction/Components/CreditCardInstructions"
import { PricingTransparencyQueryRenderer as PricingTransparency } from "v2/Apps/Auction/Components/PricingTransparency"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { AddressForm } from "v2/Components/AddressForm"
import { ConditionsOfSaleCheckbox } from "v2/Components/Auction/ConditionsOfSaleCheckbox"
import {
  OnSubmitValidationError,
  TrackErrors,
} from "v2/Apps/Auction/Components/OnSubmitValidationError"
import {
  Bidding as BiddingValidationSchemas,
  FormValuesForBidding,
  determineDisplayRequirements,
  getSelectedBid,
  initialValuesForBidding,
} from "v2/Apps/Auction/Components/Form"
import { AuctionErrorModal } from "v2/Apps/Auction/Components/AuctionErrorModal"

const {
  validationSchemaForRegisteredUsers,
  validationSchemaForUnregisteredUsersWithCreditCard,
  validationSchemaForUnregisteredUsersWithoutCreditCard,
} = BiddingValidationSchemas

interface Props {
  artworkSlug: string
  initialSelectedBid?: string
  me: BidForm_me
  onSubmit: (values: FormikValues, actions: FormikActions<object>) => void
  onMaxBidSelect?: (values: string) => void
  relay: RelayProp
  saleArtwork: BidForm_saleArtwork
  trackSubmissionErrors: TrackErrors
}

export const BidForm: React.FC<Props> = ({
  artworkSlug,
  initialSelectedBid,
  me,
  onSubmit,
  onMaxBidSelect,
  relay,
  saleArtwork,
  trackSubmissionErrors,
}) => {
  const displayIncrements = dropWhile(
    saleArtwork.increments,
    increment => increment.cents < saleArtwork.minimumNextBid.cents
  ).map(inc => ({ text: inc.display, value: inc.cents.toString() }))

  const selectedBid = getSelectedBid({ displayIncrements, initialSelectedBid })
  const {
    requiresCheckbox,
    requiresPaymentInformation,
  } = determineDisplayRequirements(saleArtwork.sale.registrationStatus, me)
  const validationSchema = requiresCheckbox
    ? requiresPaymentInformation
      ? validationSchemaForUnregisteredUsersWithoutCreditCard
      : validationSchemaForUnregisteredUsersWithCreditCard
    : validationSchemaForRegisteredUsers

  return (
    <Formik<FormValuesForBidding>
      initialValues={{ ...initialValuesForBidding, selectedBid }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        isValid,
        setFieldError,
        setFieldValue,
        setFieldTouched,
        setStatus,
        setSubmitting,
        status,
        submitCount,
      }) => (
        <Form>
          <OnSubmitValidationError
            cb={trackSubmissionErrors}
            formikProps={{
              errors,
              isSubmitting,
              isValid,
              setSubmitting,
              submitCount,
            }}
          />

          <Serif mt={4} pb={0.5} size="4t" weight="semibold" color="black100">
            Set your max bid
          </Serif>

          <LargeSelect
            selected={values.selectedBid}
            onSelect={value => {
              onMaxBidSelect && onMaxBidSelect(value)
              setFieldValue("selectedBid", value)
              setFieldTouched("selectedBid")
            }}
            options={displayIncrements}
            error={touched.selectedBid && errors.selectedBid}
          />

          <PricingTransparency
            relayEnvironment={relay.environment}
            saleId={saleArtwork.sale.slug}
            artworkId={artworkSlug}
            bidAmountMinor={parseInt(values.selectedBid)}
          />

          <Spacer mt={4} />

          {requiresPaymentInformation && (
            <>
              <Separator mb={3} />
              <CreditCardInstructions />

              <Serif mt={4} mb={2} size="4t" weight="semibold" color="black100">
                Card Information
              </Serif>

              <CreditCardInput
                error={{ message: errors.creditCard } as stripe.Error}
                onChange={({ error }) =>
                  setFieldError("creditCard", error?.message)
                }
              />

              <Spacer mt={2} />

              <AddressForm
                value={values.address}
                onChange={address => setFieldValue("address", address)}
                errors={errors.address}
                touched={touched.address}
                billing
                showPhoneNumberInput
              />
            </>
          )}

          <Spacer mt={3} />

          {requiresCheckbox && (
            <Flex mb={3} flexDirection="column" justifyContent="center">
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
          )}

          <Button
            size="large"
            width="100%"
            loading={isSubmitting}
            type="submit"
          >
            Confirm bid
          </Button>

          <AuctionErrorModal
            show={!!status}
            onClose={() => setStatus(null)}
            status={status}
          />
        </Form>
      )}
    </Formik>
  )
}

export const BidFormFragmentContainer = createFragmentContainer(BidForm, {
  me: graphql`
    fragment BidForm_me on Me {
      hasQualifiedCreditCards
    }
  `,
  saleArtwork: graphql`
    fragment BidForm_saleArtwork on SaleArtwork {
      minimumNextBid: minimumNextBid {
        cents
      }
      increments(useMyMaxBid: true) {
        cents
        display
      }
      sale {
        slug
        registrationStatus {
          qualifiedForBidding
        }
      }
    }
  `,
})
