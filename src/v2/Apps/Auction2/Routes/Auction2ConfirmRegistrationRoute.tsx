import { Button, Join, ModalDialog, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { Auction2ConfirmRegistrationRoute_me } from "v2/__generated__/Auction2ConfirmRegistrationRoute_me.graphql"
import { Auction2ConfirmRegistrationRoute_sale } from "v2/__generated__/Auction2ConfirmRegistrationRoute_sale.graphql"
import { useCreateBidder } from "v2/Apps/Auction2/Queries/useCreateBidder"
import { useAuctionTracking } from "v2/Apps/Auction2/Hooks/useAuctionTracking"
import { IdentityVerificationWarning } from "v2/Apps/Auction2/Components/Form/IdentityVerificationWarning"
import { ConditionsOfSaleCheckbox } from "v2/Apps/Auction2/Components/Form/ConditionsOfSaleCheckbox"
import { Form, Formik } from "formik"
import {
  confirmRegistrationValidationSchema,
  formatError,
  AuctionFormValues,
} from "v2/Apps/Auction2/Components/Form/Utils"
import { useEffect } from "react"

interface Auction2ConfirmRegistrationRouteProps {
  me: Auction2ConfirmRegistrationRoute_me
  sale: Auction2ConfirmRegistrationRoute_sale
}

const Auction2ConfirmRegistrationRoute: React.FC<Auction2ConfirmRegistrationRouteProps> = ({
  me,
  sale,
}) => {
  const { tracking } = useAuctionTracking()
  const { router } = useRouter()
  const { submitMutation: createBidder } = useCreateBidder()
  const { auctionURL, needsIdentityVerification } = computeProps({
    sale,
    me,
  })

  const handleSubmit = async (_values, helpers) => {
    try {
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

  // Track page view
  useEffect(() => {
    const isRegistered = sale?.bidder?.qualifiedForBidding

    if (isRegistered) {
      router.replace(`/auction2/${sale.slug}`)
    } else {
      tracking.confirmRegistrationPageView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalDialog title={`Register for ${sale.name}`} onClose={closeModal}>
      <Formik<Pick<AuctionFormValues, "agreeToTerms">>
        initialValues={{
          agreeToTerms: false,
        }}
        onSubmit={handleSubmit}
        validationSchema={confirmRegistrationValidationSchema}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Join separator={<Spacer my={2} />}>
                {needsIdentityVerification ? (
                  <IdentityVerificationWarning />
                ) : (
                  <Text variant="md">
                    Welcome back. To complete your registration, please confirm
                    that you agree to the Conditions of Sale.
                  </Text>
                )}

                <ConditionsOfSaleCheckbox />

                <Button loading={isSubmitting} type="submit">
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

export const Auction2ConfirmRegistrationRouteFragmentContainer = createFragmentContainer(
  Auction2ConfirmRegistrationRoute,
  {
    me: graphql`
      fragment Auction2ConfirmRegistrationRoute_me on Me {
        internalID
        identityVerified
      }
    `,
    sale: graphql`
      fragment Auction2ConfirmRegistrationRoute_sale on Sale {
        slug
        name
        internalID
        status
        requireIdentityVerification
        bidder {
          qualifiedForBidding
        }
      }
    `,
  }
)

const computeProps = ({ me, sale }: Auction2ConfirmRegistrationRouteProps) => {
  const auctionURL = `/auction2/${sale.slug}`

  const needsIdentityVerification =
    sale?.requireIdentityVerification &&
    !sale?.bidder?.qualifiedForBidding &&
    !me?.identityVerified

  return {
    needsIdentityVerification,
    auctionURL,
  }
}
