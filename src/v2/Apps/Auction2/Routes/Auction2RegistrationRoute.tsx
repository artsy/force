import { Button, Join, ModalDialog, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Auction2RegistrationRoute_me } from "v2/__generated__/Auction2RegistrationRoute_me.graphql"
import { Auction2RegistrationRoute_sale } from "v2/__generated__/Auction2RegistrationRoute_sale.graphql"
import { Form, Formik } from "formik"
import { CreditCardInputProvider } from "v2/Components/CreditCardInput"
import { useRouter } from "v2/System/Router/useRouter"
import {
  AuctionFormValues,
  initialValuesForRegistration,
  registrationValidationSchema,
} from "v2/Apps/Auction2/Components/Form/Utils"
import { useCreateTokenAndSubmit } from "v2/Apps/Auction2/Hooks/useCreateTokenAndSubmit"
import { useEffect } from "react"
import { ConditionsOfSaleCheckbox } from "v2/Apps/Auction2/Components/Form/ConditionsOfSaleCheckbox"
import { AddressFormWithCreditCard } from "v2/Apps/Auction2/Components/Form/AddressFormWithCreditCard"
import { IdentityVerificationWarning } from "v2/Apps/Auction2/Components/Form/IdentityVerificationWarning"
import { useAuctionTracking } from "v2/Apps/Auction2/Hooks/useAuctionTracking"
import { ErrorStatus } from "../Components/Form/ErrorStatus"
import { Auction2ConfirmRegistrationRoute_sale } from "v2/__generated__/Auction2ConfirmRegistrationRoute_sale.graphql"
import { isEmpty } from "lodash"

export interface Auction2RegistrationRouteProps {
  me: Auction2RegistrationRoute_me
  sale: Auction2RegistrationRoute_sale
}

const Auction2RegistrationRoute: React.FC<Auction2RegistrationRouteProps> = ({
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
      router.push(`/auction2/${sale.slug}`)
    },
  })

  const handleModalClose = () => {
    router.push(`/auction2/${sale.slug}`)
  }

  // Track page view or redirect
  useEffect(() => {
    if (redirectToSaleHome(sale)) {
      router.replace(`/auction2/${sale.slug}`)
    } else {
      tracking.registrationPageView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalDialog
      title="Register to Bid on Artsy"
      onClose={handleModalClose}
      width={["100%", 600]}
    >
      <Formik<AuctionFormValues>
        initialValues={initialValuesForRegistration}
        onSubmit={handleSubmit}
        validationSchema={registrationValidationSchema}
      >
        {({ isSubmitting, isValid, touched }) => {
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
                  disabled={!isValid || isSubmitting || isEmpty(touched)}
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

export const Auction2RegistrationRouteFragmentContainer = createFragmentContainer(
  (props: Auction2RegistrationRouteProps) => {
    return (
      // Wrap the provider down here as we need it for our hooks
      <CreditCardInputProvider>
        <Auction2RegistrationRoute {...props} />
      </CreditCardInputProvider>
    )
  },
  {
    me: graphql`
      fragment Auction2RegistrationRoute_me on Me {
        internalID
        identityVerified
      }
    `,
    sale: graphql`
      fragment Auction2RegistrationRoute_sale on Sale {
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

const computeProps = ({ sale, me }: Auction2RegistrationRouteProps) => {
  const needsIdentityVerification =
    sale?.requireIdentityVerification &&
    !sale?.bidder?.qualifiedForBidding &&
    !me?.identityVerified

  return {
    needsIdentityVerification,
  }
}

export const redirectToSaleHome = (
  sale: Auction2RegistrationRoute_sale | Auction2ConfirmRegistrationRoute_sale
) => {
  const redirectToSaleHome =
    sale?.bidder?.qualifiedForBidding || sale.isClosed || sale.isLiveOpen
  return redirectToSaleHome
}
