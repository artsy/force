import { FulfillmentDetailsForm_order$data } from "__generated__/FulfillmentDetailsForm_order.graphql"
import { FulfillmentDetailsForm_me$data } from "__generated__/FulfillmentDetailsForm_me.graphql"
import { AddressVerifiedBy } from "Apps/Order/Components/AddressVerificationFlow"

import { FormikHelpers } from "formik"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"

import { FulfillmentDetailsForm } from "Apps/Order/Routes/Shipping2/FulfillmentDetailsForm"
import {
  FulfillmentType,
  ShippingAddressFormValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"

interface PickupValues {
  fulfillmentType: FulfillmentType.PICKUP
  attributes: {
    name: string
    phoneNumber: string
  }
}

export interface ShipValues {
  fulfillmentType: FulfillmentType.SHIP
  attributes: ShippingAddressFormValues & {
    saveAddress: boolean
    addressVerifiedBy: AddressVerifiedBy | null
  }
}

export type FulfillmentValues = ShipValues | PickupValues

export interface FulfillmentDetailsProps {
  onSubmit: (
    values: FulfillmentValues,
    formikHelpers?: FormikHelpers<FulfillmentValues>
  ) => void | Promise<any>

  me: FulfillmentDetailsForm_me$data
  order: FulfillmentDetailsForm_order$data
}

export const FulfillmentDetails: FC<FulfillmentDetailsProps> = props => {
  const shippingContext = useShippingContext()

  const addressVerificationUSEnabled = !!useFeatureFlag(
    "address_verification_us"
  )
  const addressVerificationIntlEnabled = !!useFeatureFlag(
    "address_verification_intl"
  )

  const shouldVerifyAddressOnSubmit = (values: FulfillmentValues) => {
    const enabledForAddress =
      (values as ShipValues).attributes.country === "US"
        ? addressVerificationUSEnabled
        : addressVerificationIntlEnabled

    const hasSavedAddresses = !!props.me.addressConnection?.edges?.length

    return (
      values.fulfillmentType === FulfillmentType.SHIP &&
      !hasSavedAddresses &&
      enabledForAddress &&
      values.attributes.addressVerifiedBy === null
    )
  }

  // trigger address verification by setting this to true
  const [verifyAddressNow, setVerifyAddressNow] = useState<boolean>(false)

  const handleVerificationComplete = () => {
    setVerifyAddressNow(false)
  }

  const handleSubmit = (values, helpers) => {
    if (shouldVerifyAddressOnSubmit(values)) {
      setVerifyAddressNow(true)
      return
    } else {
      return props.onSubmit(values, helpers)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstArtwork = extractNodes(props.order.lineItems)[0]!.artwork!

  const availableFulfillmentTypes: FulfillmentType[] = firstArtwork.pickupAvailable
    ? [FulfillmentType.PICKUP, FulfillmentType.SHIP]
    : [FulfillmentType.SHIP]

  return (
    <FulfillmentDetailsForm
      initialValues={shippingContext.initialValues.fulfillmentDetails}
      onAddressVerificationComplete={handleVerificationComplete}
      me={props.me}
      verifyAddressNow={verifyAddressNow}
      onSubmit={handleSubmit}
      availableFulfillmentTypes={availableFulfillmentTypes}
    />
  )
}

export const FulfillmentDetailsFragmentContainer = createFragmentContainer(
  FulfillmentDetails,
  {
    order: graphql`
      fragment FulfillmentDetailsForm_order on CommerceOrder {
        internalID
        mode
        state
        requestedFulfillment {
          __typename
          ... on CommercePickup {
            phoneNumber
          }
          ... on CommerceShip {
            name
            addressLine1
            addressLine2
            city
            region
            country
            postalCode
            phoneNumber
          }
          ... on CommerceShipArta {
            name
            addressLine1
            addressLine2
            city
            region
            country
            postalCode
            phoneNumber
          }
        }
        lineItems {
          edges {
            node {
              artwork {
                slug
                processWithArtsyShippingDomestic
                artsyShippingInternational
                pickupAvailable
                onlyShipsDomestically
                euShippingOrigin
                shippingCountry
              }
              shippingQuoteOptions {
                edges {
                  ...ShippingQuotes_shippingQuotes
                  node {
                    id
                    isSelected
                  }
                }
              }
            }
          }
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...OrderStepper_order
      }
    `,
    me: graphql`
      fragment FulfillmentDetailsForm_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        name
        email
        id
        location {
          country
        }
        ...SavedAddresses2_me
        addressConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
              id
              internalID
              addressLine1
              addressLine2
              addressLine3
              city
              country
              isDefault
              name
              phoneNumber
              postalCode
              region
            }
          }
        }
      }
    `,
  }
)
