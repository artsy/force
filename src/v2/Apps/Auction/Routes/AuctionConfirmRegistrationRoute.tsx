import {
  Button,
  Column,
  GridColumns,
  Input,
  Join,
  ModalDialog,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { AuctionConfirmRegistrationRoute_me } from "v2/__generated__/AuctionConfirmRegistrationRoute_me.graphql"
import { AuctionConfirmRegistrationRoute_sale } from "v2/__generated__/AuctionConfirmRegistrationRoute_sale.graphql"
import { useCreateBidder } from "v2/Apps/Auction/Queries/useCreateBidder"
import { useAuctionTracking } from "v2/Apps/Auction/Hooks/useAuctionTracking"
import { IdentityVerificationWarning } from "v2/Apps/Auction/Components/Form/IdentityVerificationWarning"
import { ConditionsOfSaleCheckbox } from "v2/Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"
import { Form, Formik } from "formik"
import {
  formatError,
  AuctionFormValues,
  confirmRegistrationValidationSchemas,
} from "v2/Apps/Auction/Components/Form/Utils"
import { useEffect } from "react"
import { redirectToSaleHome } from "./AuctionRegistrationRoute"
import { useUpdateMyUserProfile } from "v2/Utils/Hooks/Mutations/useUpdateMyUserProfile"

interface AuctionConfirmRegistrationRouteProps {
  me: AuctionConfirmRegistrationRoute_me
  sale: AuctionConfirmRegistrationRoute_sale
}

const AuctionConfirmRegistrationRoute: React.FC<AuctionConfirmRegistrationRouteProps> = ({
  me,
  sale,
}) => {
  const { tracking } = useAuctionTracking()
  const { router } = useRouter()
  const { submitMutation: createBidder } = useCreateBidder()
  const {
    auctionURL,
    needsIdentityVerification,
    validationSchema,
  } = computeProps({
    sale,
    me,
  })
  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()
  const hasPhoneNumber = !!me?.phoneNumber?.originalNumber

  const handleSubmit = async (values, helpers) => {
    try {
      if (!hasPhoneNumber) {
        await submitUpdateMyUserProfile({
          phone: values.phoneNumber,
        })
      }

      const response = await createBidder({
        variables: {
          input: {
            saleID: sale.internalID,
          },
        },
      })

      tracking.registrationSubmitted({
        bidderID: response.createBidder?.bidder?.internalID,
        sale,
        me,
      })

      router.push(`${auctionURL}?accepted-conditions=true`)
    } catch (error) {
      helpers.setSubmitting(false)
      helpers.setError(formatError(error))
    }
  }

  const closeModal = () => {
    router.push(auctionURL)
  }

  // Track page view or redirect
  useEffect(() => {
    if (redirectToSaleHome(sale)) {
      router.replace(`/auction/${sale.slug}`)
    } else if (!me.hasQualifiedCreditCards) {
      router.replace(`/auction/${sale.slug}/register`)
    } else {
      tracking.confirmRegistrationPageView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Will redirect to /register above on page mount
  if (!me.hasQualifiedCreditCards) {
    return null
  }

  return (
    <ModalDialog title={`Register for ${sale.name}`} onClose={closeModal}>
      <Formik<Pick<AuctionFormValues, "agreeToTerms" | "phoneNumber">>
        validateOnMount
        initialValues={{
          agreeToTerms: false,
          phoneNumber: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          isSubmitting,
          isValid,
          touched,
          values,
          handleChange,
          handleBlur,
          errors,
        }) => {
          return (
            <Form>
              <Join separator={<Spacer my={2} />}>
                {needsIdentityVerification ? (
                  <IdentityVerificationWarning />
                ) : (
                  <GridColumns>
                    {!hasPhoneNumber ? (
                      <>
                        <Column span={12}>
                          <ConditionsOfSaleMessage additionalText=" and provide a valid phone number." />
                          <Spacer my={2} />
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
                        </Column>
                      </>
                    ) : (
                      <Column span={12}>
                        <ConditionsOfSaleMessage additionalText="." />
                      </Column>
                    )}
                  </GridColumns>
                )}

                <ConditionsOfSaleCheckbox />

                <Button
                  loading={isSubmitting}
                  disabled={!isValid}
                  type="submit"
                >
                  Register
                </Button>
              </Join>
            </Form>
          )
        }}
      </Formik>
    </ModalDialog>
  )
}

const ConditionsOfSaleMessage: React.FC<{ additionalText?: string }> = ({
  additionalText,
}) => {
  return (
    <Text variant="sm-display">
      Welcome back. To complete your registration, please confirm that you agree
      to the Conditions of Sale
      {additionalText}
    </Text>
  )
}

export const AuctionConfirmRegistrationRouteFragmentContainer = createFragmentContainer(
  AuctionConfirmRegistrationRoute,
  {
    me: graphql`
      fragment AuctionConfirmRegistrationRoute_me on Me {
        internalID
        identityVerified
        hasQualifiedCreditCards

        phoneNumber {
          originalNumber
        }
      }
    `,
    sale: graphql`
      fragment AuctionConfirmRegistrationRoute_sale on Sale {
        slug
        name
        internalID
        status
        isClosed
        isLiveOpen
        requireIdentityVerification
        bidder {
          qualifiedForBidding
        }
      }
    `,
  }
)

const computeProps = ({ me, sale }: AuctionConfirmRegistrationRouteProps) => {
  const auctionURL = `/auction/${sale.slug}`

  const needsIdentityVerification =
    sale?.requireIdentityVerification &&
    !sale?.bidder?.qualifiedForBidding &&
    !me?.identityVerified

  const validationSchema = !!me.phoneNumber?.originalNumber
    ? confirmRegistrationValidationSchemas.withoutPhoneValidation
    : confirmRegistrationValidationSchemas.withPhoneValidation

  return {
    auctionURL,
    needsIdentityVerification,
    validationSchema,
  }
}
