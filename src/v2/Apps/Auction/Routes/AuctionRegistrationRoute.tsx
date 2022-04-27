import {
  Button,
  Column,
  GridColumns,
  Join,
  ModalDialog,
  Spacer,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionRegistrationRoute_me } from "v2/__generated__/AuctionRegistrationRoute_me.graphql"
import { AuctionRegistrationRoute_sale } from "v2/__generated__/AuctionRegistrationRoute_sale.graphql"
import { Form, Formik, FormikHelpers } from "formik"
import { CreditCardInputProvider } from "v2/Components/CreditCardInput"
import { useRouter } from "v2/System/Router/useRouter"
import {
  AuctionFullFormValues,
  AuctionPhoneFormValues,
  initialValuesForRegistration,
  registrationValidationSchema,
} from "v2/Apps/Auction/Components/Form/Utils"
import {
  useCreateTokenAndSubmit,
  useUpdateMyUserProfileAndSubmit,
} from "v2/Apps/Auction/Hooks/useCreateTokenAndSubmit"
import React, { useEffect } from "react"
import { ConditionsOfSaleCheckbox } from "v2/Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"
import { AddressFormWithCreditCard } from "v2/Apps/Auction/Components/Form/AddressFormWithCreditCard"
import { IdentityVerificationWarning } from "v2/Apps/Auction/Components/Form/IdentityVerificationWarning"
import { useAuctionTracking } from "v2/Apps/Auction/Hooks/useAuctionTracking"
import { ErrorStatus } from "../Components/Form/ErrorStatus"
import { AuctionConfirmRegistrationRoute_sale } from "v2/__generated__/AuctionConfirmRegistrationRoute_sale.graphql"

import {
  emptyPhoneNumber,
  PhoneNumberInput,
} from "v2/Components/PhoneNumberInput"
import { getPhoneNumberInformation } from "v2/Utils/phoneNumberUtils"
import { useSystemContext } from "v2/System"

export interface AuctionRegistrationRouteProps {
  me: AuctionRegistrationRoute_me
  sale: AuctionRegistrationRoute_sale
}

interface RegistrationFormProps extends AuctionRegistrationRouteProps {
  onSuccess: () => void
  needsIdentityVerification: boolean
}

const AuctionRegistrationRoute: React.FC<AuctionRegistrationRouteProps> = ({
  me,
  sale,
}) => {
  const { tracking } = useAuctionTracking()
  const { router } = useRouter()
  const { needsIdentityVerification, requiredBidderInfo } = computeProps({
    sale,
    me,
  })

  const handleModalClose = () => {
    router.push(`/auction/${sale.slug}`)
  }

  // Track page view or redirect
  useEffect(() => {
    if (redirectToSaleHome(sale)) {
      router.replace(`/auction/${sale.slug}`)
    } else if (!requiredBidderInfo) {
      router.replace(`/auction/${sale.slug}/confirm-registration`)
    } else {
      tracking.registrationPageView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Will redirect to /confirm-registration above on page mount
  if (!requiredBidderInfo) {
    return null
  }
  let RequiredInfoForm: React.FC<RegistrationFormProps>

  if (requiredBidderInfo == "payment") {
    RequiredInfoForm = NewCreditCardForm
  } else {
    RequiredInfoForm = NewPhoneNumberForm
  }

  return (
    <ModalDialog
      title="Register to Bid on Artsy"
      onClose={handleModalClose}
      width={["100%", 600]}
    >
      <RequiredInfoForm
        me={me}
        sale={sale}
        onSuccess={() => router.push(`/auction/${sale.slug}`)}
        needsIdentityVerification={needsIdentityVerification}
      />
    </ModalDialog>
  )
}

const NewCreditCardForm: React.FC<RegistrationFormProps> = ({
  me,
  sale,
  onSuccess,
  needsIdentityVerification,
}) => {
  const { createToken: handleSubmit } = useCreateTokenAndSubmit({
    me,
    sale,
    onSuccess,
  })

  return (
    <Formik<AuctionFullFormValues>
      validateOnMount
      initialValues={initialValuesForRegistration}
      onSubmit={handleSubmit}
      validationSchema={registrationValidationSchema}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form>
            <Join separator={<Spacer my={2} />}>
              <AddressFormWithCreditCard />

              {needsIdentityVerification && <IdentityVerificationWarning />}

              <ConditionsOfSaleCheckbox />

              <Button
                size="large"
                width="100%"
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
              >
                Register
              </Button>

              <ErrorStatus />
            </Join>
          </Form>
        )
      }}
    </Formik>
  )
}

const NewPhoneNumberForm: React.FC<RegistrationFormProps> = ({
  me,
  sale,
  onSuccess,
  needsIdentityVerification,
}) => {
  const { updateProfileAndSubmit } = useUpdateMyUserProfileAndSubmit({
    me,
    sale,
    onSuccess,
  })
  const { relayEnvironment } = useSystemContext()

  const validatePhone = async ({ phoneNumber }) => {
    const { isValid } = phoneNumber
    if (isValid) {
      return {}
    } else {
      return { phoneNumber: "Please enter a valid phone number" }
    }
  }

  const handlePhoneNumberChange = (
    setFieldValue: FormikHelpers<AuctionPhoneFormValues>["setFieldValue"]
  ) => async (region, number) => {
    if (region && number && relayEnvironment) {
      const phoneInformation = await getPhoneNumberInformation(
        number,
        relayEnvironment,
        region
      )
      setFieldValue("phoneNumber", phoneInformation)
      return
    }

    setFieldValue("phone", {
      international: "",
      isValid: false,
      national: "",
      originalNumber: "",
    })
  }

  return (
    <Formik<AuctionPhoneFormValues>
      validateOnMount
      initialValues={{
        // phoneNumber: "",
        phoneNumber: emptyPhoneNumber,
      }}
      onSubmit={updateProfileAndSubmit}
      validate={validatePhone}
    >
      {({
        isSubmitting,
        isValid,
        values,
        errors,
        touched,
        handleBlur,
        setFieldValue,
        handleChange,
      }) => {
        return (
          <Form>
            <Join separator={<Spacer my={2} />}>
              <GridColumns>
                <Column span={12}>
                  {/*
                  <Input
                    name="phoneNumber"
                    title="Phone Number"
                    type="tel"
                    description="Required for shipping logistics"
                    placeholder="Add phone number"
                    autoComplete="tel"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phoneNumber && errors.phoneNumber}
                    required
                  />
                */}
                  <PhoneNumberInput
                    inputProps={{ name: "phoneNumber", onBlur: handleBlur }}
                    mt={4}
                    onChange={handlePhoneNumberChange(setFieldValue)}
                    phoneNumber={values.phoneNumber}
                    error={
                      touched.phoneNumber && (errors.phoneNumber as string)
                    }
                  />
                </Column>
              </GridColumns>

              {needsIdentityVerification && <IdentityVerificationWarning />}

              <ConditionsOfSaleCheckbox />

              <Button
                size="large"
                width="100%"
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
              >
                Register
              </Button>

              <ErrorStatus />
            </Join>
          </Form>
        )
      }}
    </Formik>
  )
}

export const AuctionRegistrationRouteFragmentContainer = createFragmentContainer(
  (props: AuctionRegistrationRouteProps) => {
    return (
      // Wrap the provider down here as we need it for our hooks
      <CreditCardInputProvider>
        <AuctionRegistrationRoute {...props} />
      </CreditCardInputProvider>
    )
  },
  {
    me: graphql`
      fragment AuctionRegistrationRoute_me on Me {
        internalID
        identityVerified
        hasQualifiedCreditCards
        phoneNumber {
          isValid
          display
        }
      }
    `,
    sale: graphql`
      fragment AuctionRegistrationRoute_sale on Sale {
        slug
        name
        internalID
        status
        requireIdentityVerification
        isClosed
        isLiveOpen
        bidder {
          qualifiedForBidding
        }
      }
    `,
  }
)

const computeProps = ({ sale, me }: AuctionRegistrationRouteProps) => {
  const needsIdentityVerification = Boolean(
    sale?.requireIdentityVerification &&
      !sale?.bidder?.qualifiedForBidding &&
      !me?.identityVerified
  )
  const requiredBidderInfo:
    | "payment"
    | "phone"
    | null = !me.hasQualifiedCreditCards
    ? "payment"
    : !me.phoneNumber?.isValid
    ? "phone"
    : null

  return {
    needsIdentityVerification,
    requiredBidderInfo,
  }
}

export const redirectToSaleHome = (
  sale: AuctionRegistrationRoute_sale | AuctionConfirmRegistrationRoute_sale
) => {
  const redirectToSaleHome =
    sale?.bidder?.qualifiedForBidding || sale.isClosed || sale.isLiveOpen
  return redirectToSaleHome
}
