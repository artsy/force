import { Button, Input, Join, ModalDialog, Spacer, Text } from "@artsy/palette"
import { ConditionsOfSaleCheckbox } from "Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"
import { IdentityVerificationWarning } from "Apps/Auction/Components/Form/IdentityVerificationWarning"
import { formatError } from "Apps/Auction/Components/Form/Utils/formatError"
import type { AuctionFormValues } from "Apps/Auction/Components/Form/Utils/initialValues"
import { confirmRegistrationValidationSchemas } from "Apps/Auction/Components/Form/Utils/validationSchemas"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useCreateBidder } from "Apps/Auction/Queries/useCreateBidder"
import { useRouter } from "System/Hooks/useRouter"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import type { AuctionConfirmRegistrationRoute_me$data } from "__generated__/AuctionConfirmRegistrationRoute_me.graphql"
import type { AuctionConfirmRegistrationRoute_sale$data } from "__generated__/AuctionConfirmRegistrationRoute_sale.graphql"
import { Form, Formik } from "formik"
import { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { redirectToSaleHome } from "./AuctionRegistrationRoute"

interface AuctionConfirmRegistrationRouteProps {
  me: AuctionConfirmRegistrationRoute_me$data
  sale: AuctionConfirmRegistrationRoute_sale$data
}

const AuctionConfirmRegistrationRoute: React.FC<
  React.PropsWithChildren<AuctionConfirmRegistrationRouteProps>
> = ({ me, sale }) => {
  const { tracking } = useAuctionTracking()
  const { router } = useRouter()
  const { submitMutation: createBidder } = useCreateBidder()
  const { auctionURL, needsIdentityVerification, validationSchema } =
    computeProps({
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
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (redirectToSaleHome(sale)) {
      router.replace(`/auction/${sale.slug}`)
    } else if (!me.hasQualifiedCreditCards) {
      router.replace(`/auction/${sale.slug}/register`)
    } else {
      tracking.confirmRegistrationPageView()
    }
  }, [])

  // Will redirect to /register above on page mount
  if (!me.hasQualifiedCreditCards) {
    return null
  }

  const additionalText = !hasPhoneNumber
    ? " and provide a valid phone number"
    : ""

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
              <Join separator={<Spacer y={2} />}>
                {needsIdentityVerification ? (
                  <IdentityVerificationWarning />
                ) : (
                  <ConditionsOfSaleMessage additionalText={additionalText} />
                )}

                {!hasPhoneNumber && (
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

const ConditionsOfSaleMessage: React.FC<
  React.PropsWithChildren<{ additionalText?: string }>
> = ({ additionalText }) => {
  return (
    <Text variant="sm-display">
      Welcome back. To complete your registration, please confirm that you agree
      to the Conditions of Sale
      {additionalText}.
    </Text>
  )
}

export const AuctionConfirmRegistrationRouteFragmentContainer =
  createFragmentContainer(AuctionConfirmRegistrationRoute, {
    me: graphql`
      fragment AuctionConfirmRegistrationRoute_me on Me {
        internalID
        isIdentityVerified
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
  })

const computeProps = ({ me, sale }: AuctionConfirmRegistrationRouteProps) => {
  const auctionURL = `/auction/${sale.slug}`

  const needsIdentityVerification =
    sale?.requireIdentityVerification &&
    !sale?.bidder?.qualifiedForBidding &&
    !me?.isIdentityVerified

  const validationSchema = !!me.phoneNumber?.originalNumber
    ? confirmRegistrationValidationSchemas.withoutPhoneValidation
    : confirmRegistrationValidationSchemas.withPhoneValidation

  return {
    auctionURL,
    needsIdentityVerification,
    validationSchema,
  }
}
