import { Button, Join, ModalDialog, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionRegistrationRoute_me } from "v2/__generated__/AuctionRegistrationRoute_me.graphql"
import { AuctionRegistrationRoute_sale } from "v2/__generated__/AuctionRegistrationRoute_sale.graphql"
import { Form, Formik } from "formik"
import { CreditCardInputProvider } from "v2/Components/CreditCardInput"
import { useRouter } from "v2/System/Router/useRouter"
import {
  AuctionFormValues,
  initialValuesForRegistration,
  registrationValidationSchema,
} from "v2/Apps/Auction/Components/Form/Utils"
import { useCreateTokenAndSubmit } from "v2/Apps/Auction/Hooks/useCreateTokenAndSubmit"
import { useEffect } from "react"
import { ConditionsOfSaleCheckbox } from "v2/Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"
import { AddressFormWithCreditCard } from "v2/Apps/Auction/Components/Form/AddressFormWithCreditCard"
import { IdentityVerificationWarning } from "v2/Apps/Auction/Components/Form/IdentityVerificationWarning"
import { useAuctionTracking } from "v2/Apps/Auction/Hooks/useAuctionTracking"
import { ErrorStatus } from "../Components/Form/ErrorStatus"
import { AuctionConfirmRegistrationRoute_sale } from "v2/__generated__/AuctionConfirmRegistrationRoute_sale.graphql"

export interface AuctionRegistrationRouteProps {
  me: AuctionRegistrationRoute_me
  sale: AuctionRegistrationRoute_sale
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
        identityVerified
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
    !me?.identityVerified

  return {
    needsIdentityVerification,
  }
}

export const redirectToSaleHome = (
  sale: AuctionRegistrationRoute_sale | AuctionConfirmRegistrationRoute_sale
) => {
  const redirectToSaleHome =
    sale?.bidder?.qualifiedForBidding || sale.isClosed || sale.isLiveOpen
  return redirectToSaleHome
}
