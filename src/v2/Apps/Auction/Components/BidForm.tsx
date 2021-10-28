import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  Separator,
  Spacer,
} from "@artsy/palette"
import {
  Form,
  FormikHelpers as FormikActions,
  FormikProps,
  FormikValues,
} from "formik"
import { dropWhile } from "lodash"
import * as React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"

import { BidForm_me } from "v2/__generated__/BidForm_me.graphql"
import { BidForm_saleArtwork } from "v2/__generated__/BidForm_saleArtwork.graphql"
import { CreditCardInstructions } from "v2/Apps/Auction/Components/CreditCardInstructions"
import { PricingTransparencyQueryRenderer } from "v2/Apps/Auction/Components/PricingTransparency"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { AddressForm } from "v2/Components/AddressForm"
import { ConditionsOfSaleCheckbox } from "v2/Components/Auction/ConditionsOfSaleCheckbox"
import {
  OnSubmitValidationError,
  TrackErrors,
} from "v2/Apps/Auction/Components/OnSubmitValidationError"
import {
  BillingInfoFormContext,
  determineDisplayRequirements,
  BillingInfoWithBid,
  getSelectedBid,
} from "v2/Apps/Auction/Components/Form"
import { AuctionErrorModal } from "v2/Apps/Auction/Components/AuctionErrorModal"
import { BillingInfoFormKeys } from "./Form/formValidation"

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
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    increment => increment.cents < saleArtwork.minimumNextBid.cents
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  ).map(inc => ({ value: inc.cents.toString(), text: inc.display }))

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const selectedBid = getSelectedBid({ initialSelectedBid, displayIncrements })
  const {
    requiresCheckbox,
    requiresPaymentInformation,
  } = determineDisplayRequirements(
    saleArtwork.sale?.registrationStatus!,
    me as { hasQualifiedCreditCards: boolean }
  )
  const registeredUsers: BillingInfoFormKeys[] = ["selectedBid"]
  const unregisteredUsersWithCreditCard: BillingInfoFormKeys[] = [
    "agreeToTerms",
    ...registeredUsers,
  ]
  const unregisteredUsersWithoutCreditCard: BillingInfoFormKeys[] = [
    "addressWithPhone",
    ...unregisteredUsersWithCreditCard,
  ]

  const formKeys = requiresCheckbox
    ? requiresPaymentInformation
      ? unregisteredUsersWithoutCreditCard
      : unregisteredUsersWithCreditCard
    : registeredUsers

  return (
    <BillingInfoFormContext
      formKeys={formKeys}
      initialValues={{ selectedBid }}
      onSubmit={onSubmit}
    >
      {(formik: FormikProps<BillingInfoWithBid>) => (
        <Form>
          <OnSubmitValidationError cb={trackSubmissionErrors} />

          <Text variant="md" mt={2} pb={0.5} fontWeight="bold" color="black100">
            Set your max bid
          </Text>

          <Select
            selected={formik.values.selectedBid}
            onSelect={value => {
              onMaxBidSelect && onMaxBidSelect(value)
              formik.setFieldValue("selectedBid", value)
              formik.setFieldTouched("selectedBid")
            }}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            options={displayIncrements}
            error={formik.touched.selectedBid && formik.errors.selectedBid}
          />

          <PricingTransparencyQueryRenderer
            relayEnvironment={relay.environment}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            saleId={saleArtwork.sale.slug}
            artworkId={artworkSlug}
            bidAmountMinor={parseInt(formik.values.selectedBid)}
          />

          <Spacer mt={2} />

          {requiresPaymentInformation && (
            <>
              <Separator mb={2} />
              <CreditCardInstructions />

              <Text
                variant="md"
                mt={4}
                mb={2}
                fontWeight="bold"
                color="black100"
              >
                Card Information
              </Text>

              <CreditCardInput />

              <Spacer mt={4} />

              <AddressForm billing={true} showPhoneNumberInput={true} />
            </>
          )}

          <Spacer mt={3} />

          {requiresCheckbox && (
            <Flex mb={4} flexDirection="column" justifyContent="center">
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
                <Text variant="md" mt={1} color="red100" textAlign="center">
                  {formik.errors.agreeToTerms}
                </Text>
              )}
            </Flex>
          )}

          <Button
            variant="primaryBlack"
            width="100%"
            loading={formik.isSubmitting}
            type="submit"
            mb={4}
          >
            Confirm bid
          </Button>

          <AuctionErrorModal
            show={!!formik.status}
            onClose={() => formik.setStatus(null)}
            status={formik.status}
          />
        </Form>
      )}
    </BillingInfoFormContext>
  )
}

export const BidFormFragmentContainer = createFragmentContainer(BidForm, {
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
  me: graphql`
    fragment BidForm_me on Me {
      hasQualifiedCreditCards
    }
  `,
})
