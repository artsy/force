import { Button, Join, ModalDialog, Select, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { Auction2BidRoute_sale } from "v2/__generated__/Auction2BidRoute_sale.graphql"
import { Auction2BidRoute_artwork } from "v2/__generated__/Auction2BidRoute_artwork.graphql"
import { Auction2BidRoute_me } from "v2/__generated__/Auction2BidRoute_me.graphql"
import { AuctionLotInfoFragmentContainer } from "./Components/AuctionLotInfo"
import { dropWhile } from "lodash"
import { Form, Formik } from "formik"
import { OnSubmitValidationError } from "v2/Apps/Auction2/Components/Form/OnSubmitValidationError"
import { PricingTransparency2QueryRenderer } from "./Components/PricingTransparency2"
import { Match } from "found"
import { useEffect } from "react"
import { useSubmitBid } from "./useSubmitBid"
import { AddressFormWithCreditCard } from "v2/Apps/Auction2/Components/Form/AddressFormWithCreditCard"
import { ConditionsOfSaleCheckbox } from "v2/Apps/Auction2/Components/Form/ConditionsOfSaleCheckbox"
import {
  biddingValidationSchemas,
  getSelectedBid,
  initialValuesForBidding,
} from "v2/Apps/Auction2/Components/Form/Utils"
import { useAuctionTracking } from "v2/Apps/Auction2/Hooks/useAuctionTracking"
import { CreditCardInputProvider } from "v2/Components/CreditCardInput"
import { ErrorStatus } from "../../Components/Form/ErrorStatus"

interface Auction2BidRouteProps {
  sale: Auction2BidRoute_sale
  artwork: Auction2BidRoute_artwork
  me: Auction2BidRoute_me
}

const Auction2BidRoute: React.FC<Auction2BidRouteProps> = ({
  sale,
  artwork,
  me,
}) => {
  const { match, router } = useRouter()
  const { tracking } = useAuctionTracking()

  const {
    artworkSlug,
    bidderID,
    displayIncrements,
    requiresCheckbox,
    requiresPaymentInformation,
    selectedBid,
    validationSchema,
  } = computeProps({ artwork, match, me })

  const { submitBid } = useSubmitBid({
    artwork,
    bidderID,
    me,
    requiresPaymentInformation,
    sale,
  })

  const handleBidSubmit = async (values, helpers) => {
    try {
      await submitBid(values, helpers)
    } catch (error) {
      // TODO: Connect to system errors
      console.error("handleBidSubmit", error)
    }
  }

  const handleModalClose = () => {
    router.push(`/auction2/${sale.slug}`)
  }

  // Track initial load
  useEffect(() => {
    tracking.bidPageView({ artwork, me })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalDialog title="Confirm your bid" onClose={handleModalClose}>
      <Formik
        initialValues={{ ...initialValuesForBidding, selectedBid }}
        validationSchema={validationSchema}
        onSubmit={handleBidSubmit}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Form>
              <Join separator={<Spacer my={2} />}>
                <AuctionLotInfoFragmentContainer
                  saleArtwork={artwork.saleArtwork!}
                />

                <Text variant="lg">Set your max bid</Text>

                <Select
                  selected={values.selectedBid}
                  onSelect={value => {
                    tracking.maxBidSelected(bidderID!, value)

                    setFieldValue("selectedBid", value)
                    setFieldTouched("selectedBid")
                  }}
                  options={displayIncrements}
                  error={touched.selectedBid && (errors.selectedBid as string)}
                />

                <PricingTransparency2QueryRenderer
                  saleId={artwork.saleArtwork?.sale?.slug!}
                  artworkId={artworkSlug}
                />

                {requiresPaymentInformation && <AddressFormWithCreditCard />}
                {requiresCheckbox && <ConditionsOfSaleCheckbox />}

                <Button width="100%" loading={isSubmitting} type="submit">
                  Confirm bid
                </Button>

                <ErrorStatus />

                <OnSubmitValidationError
                  onError={errors => {
                    tracking.confirmBidFailed(errors, bidderID!)
                  }}
                />
              </Join>
            </Form>
          )
        }}
      </Formik>
    </ModalDialog>
  )
}

export const Auction2BidRouteFragmentContainer = createFragmentContainer(
  (props: Auction2BidRouteProps) => {
    return (
      // Wrap the provider down here as we need it for our hooks
      <CreditCardInputProvider>
        <Auction2BidRoute {...props} />
      </CreditCardInputProvider>
    )
  },
  {
    sale: graphql`
      fragment Auction2BidRoute_sale on Sale {
        internalID
        slug
      }
    `,
    artwork: graphql`
      fragment Auction2BidRoute_artwork on Artwork {
        slug
        internalID
        saleArtwork {
          ...AuctionLotInfo_saleArtwork
          minimumNextBid {
            cents
          }
          increments(useMyMaxBid: true) {
            cents
            display
          }
          sale {
            internalID
            bidder {
              id
            }
            slug
            registrationStatus {
              qualifiedForBidding
            }
          }
        }
      }
    `,
    me: graphql`
      fragment Auction2BidRoute_me on Me {
        internalID
        hasQualifiedCreditCards
      }
    `,
  }
)

const computeProps = ({
  artwork,
  match,
  me,
}: {
  artwork: Auction2BidRoute_artwork
  match: Match
  me: Auction2BidRoute_me
}) => {
  const artworkSlug = match.params.artworkSlug
  const bidder = artwork.saleArtwork?.sale?.bidder
  const bidderID = bidder?.id

  const displayIncrements = dropWhile(
    artwork.saleArtwork?.increments,
    increment => {
      // @ts-ignore
      return increment.cents < artwork.saleArtwork?.minimumNextBid!.cents!
    }
  ).map(increment => {
    return {
      value: increment!.cents!.toString(),
      text: increment!.display!,
    }
  })

  const initialSelectedBid = match?.location?.query?.bid

  const selectedBid = getSelectedBid({
    initialSelectedBid,
    displayIncrements,
  })

  const requiresCheckbox = !bidder
  const requiresPaymentInformation = !(
    requiresCheckbox || me.hasQualifiedCreditCards
  )

  const {
    validationSchemaForRegisteredUsers,
    validationSchemaForUnregisteredUsersWithCreditCard,
    validationSchemaForUnregisteredUsersWithoutCreditCard,
  } = biddingValidationSchemas

  const validationSchema = (() => {
    if (requiresCheckbox) {
      if (requiresPaymentInformation) {
        return validationSchemaForUnregisteredUsersWithoutCreditCard
      } else {
        return validationSchemaForUnregisteredUsersWithCreditCard
      }
    } else {
      validationSchemaForRegisteredUsers
    }
  })()

  return {
    artworkSlug,
    bidderID,
    displayIncrements,
    requiresCheckbox,
    requiresPaymentInformation,
    selectedBid,
    validationSchema,
  }
}
