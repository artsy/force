import { Button, Join, ModalDialog, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionRegistrationRoute_me$data } from "__generated__/AuctionRegistrationRoute_me.graphql"
import { AuctionRegistrationRoute_sale$data } from "__generated__/AuctionRegistrationRoute_sale.graphql"
import { Form, Formik } from "formik"
import { CreditCardInputProvider } from "Components/CreditCardInput"
import { useRouter } from "System/Hooks/useRouter"
import { useCreateTokenAndSubmit } from "Apps/Auction/Hooks/useCreateTokenAndSubmit"
import { useEffect } from "react"
import { ConditionsOfSaleCheckbox } from "Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"
import { AddressFormWithCreditCard } from "Apps/Auction/Components/Form/AddressFormWithCreditCard"
import { IdentityVerificationWarning } from "Apps/Auction/Components/Form/IdentityVerificationWarning"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { ErrorStatus } from "Apps/Auction/Components/Form/ErrorStatus"
import { AuctionConfirmRegistrationRoute_sale$data } from "__generated__/AuctionConfirmRegistrationRoute_sale.graphql"
import {
  AuctionFormValues,
  initialValuesForRegistration,
} from "Apps/Auction/Components/Form/Utils/initialValues"
import { registrationValidationSchema } from "Apps/Auction/Components/Form/Utils/validationSchemas"

export interface AuctionRegistrationRouteProps {
  me: AuctionRegistrationRoute_me$data
  sale: AuctionRegistrationRoute_sale$data
}

const AuctionRegistrationRoute: React.FC<AuctionRegistrationRouteProps> = ({
  me,
  sale,
}) => {
  const { tracking } = useAuctionTracking()
  const { router } = useRouter()
  const { needsIdentityVerification } = computeProps({ sale, me })
  const { createToken: handleSubmit } = useCreateTokenAndSubmit({
    me,
    sale,
    onSuccess: () => {
      router.push(`/auction/${sale.slug}`)
    },
  })

  const handleModalClose = () => {
    router.push(`/auction/${sale.slug}`)
  }

  // Track page view or redirect
  useEffect(() => {
    if (redirectToSaleHome(sale)) {
      router.replace(`/auction/${sale.slug}`)
    } else if (me.hasQualifiedCreditCards) {
      router.replace(`/auction/${sale.slug}/confirm-registration`)
    } else {
      tracking.registrationPageView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Will redirect to /confirm-registration above on page mount
  if (me.hasQualifiedCreditCards) {
    return null
  }

  return (
    <ModalDialog
      title="Register to Bid on Artsy"
      onClose={handleModalClose}
      width={["100%", 600]}
    >
      <Formik<AuctionFormValues>
        validateOnMount
        initialValues={initialValuesForRegistration}
        onSubmit={handleSubmit}
        validationSchema={registrationValidationSchema}
      >
        {({ isSubmitting, isValid }) => {
          return (
            <Form>
              <Join separator={<Spacer y={2} />}>
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
    </ModalDialog>
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
        isIdentityVerified
        hasQualifiedCreditCards
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
  const needsIdentityVerification =
    sale?.requireIdentityVerification &&
    !sale?.bidder?.qualifiedForBidding &&
    !me?.isIdentityVerified

  return {
    needsIdentityVerification,
  }
}

export const redirectToSaleHome = (
  sale:
    | AuctionRegistrationRoute_sale$data
    | AuctionConfirmRegistrationRoute_sale$data
) => {
  const redirectToSaleHome =
    sale?.bidder?.qualifiedForBidding || sale.isClosed || sale.isLiveOpen
  return redirectToSaleHome
}
