import { ContextModule } from "@artsy/cohesion"
import { Button, SelectInput, Spacer, Text } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToFieldErrorOnSubmit } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToFieldErrorOnSubmit"
import { useOrder2SetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation"
import { useOrder2SetOrderPickupDetailsMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderPickupDetailsMutation"
import {
  richRequiredPhoneValidators,
  useInitialLocationValues,
} from "Components/Address/utils"
import { countries as phoneCountryOptions } from "Utils/countries"
import createLogger from "Utils/logger"
import type { Order2PickupForm_order$key } from "__generated__/Order2PickupForm_order.graphql"
import {
  Form,
  Formik,
  type FormikHelpers,
  type FormikValues,
  useFormikContext,
} from "formik"
import { useCallback, useMemo } from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const logger = createLogger("Order2PickupForm.tsx")

interface Order2PickupFormProps {
  order: Order2PickupForm_order$key
}

interface PickupFormValues {
  phoneNumber: string
  phoneNumberCountryCode: string
}

export const Order2PickupForm: React.FC<Order2PickupFormProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)

  const { setFulfillmentDetailsComplete, checkoutTracking, setCheckoutMode } =
    useCheckoutContext()

  const fulfillmentOptions = orderData?.fulfillmentOptions
  // By the time we get here, this option should be available
  const pickupFulfillmentOption = fulfillmentOptions?.find(
    option => option.type === "PICKUP",
  )

  const setOrderPickupDetails = useOrder2SetOrderPickupDetailsMutation()
  const setOrderFulfillmentOption = useOrder2SetOrderFulfillmentOptionMutation()

  const handleSubmit = useCallback(
    async (
      values: FormikValues,
      formikHelpers: FormikHelpers<PickupFormValues>,
    ): Promise<void> => {
      if (!pickupFulfillmentOption) {
        logger.error(
          "No pickup fulfillment option available (should not happen)",
        )
        return
      }

      try {
        checkoutTracking.clickedOrderProgression(
          ContextModule.ordersFulfillment,
        )

        const setOrderFulfillmentOptionResult =
          await setOrderFulfillmentOption.submitMutation({
            variables: {
              input: {
                id: orderData.internalID,
                fulfillmentOption: pickupFulfillmentOption as {
                  type: "PICKUP"
                },
              },
            },
          })
        validateAndExtractOrderResponse(
          setOrderFulfillmentOptionResult.setOrderFulfillmentOption
            ?.orderOrError,
        )

        const setOrderPickupDetailsResult =
          await setOrderPickupDetails.submitMutation({
            variables: {
              input: {
                id: orderData.internalID,
                buyerPhoneNumber: values.phoneNumber,
                buyerPhoneNumberCountryCode: values.phoneNumberCountryCode,
              },
            },
          })
        validateAndExtractOrderResponse(
          setOrderPickupDetailsResult.updateOrderShippingAddress?.orderOrError,
        )

        setFulfillmentDetailsComplete({ isPickup: true })
      } catch (error) {
        logger.error("Error while setting pickup details", error)
      }
    },
    [
      setOrderFulfillmentOption,
      setOrderPickupDetails,
      orderData.internalID,
      pickupFulfillmentOption,
      setFulfillmentDetailsComplete,
      checkoutTracking.clickedOrderProgression,
    ],
  )

  const locationBasedInitialValues = useInitialLocationValues()

  const initialValues = useMemo(() => {
    const existingPhone =
      orderData?.selectedFulfillmentOption?.type === "PICKUP"
        ? orderData.fulfillmentDetails?.phoneNumber
        : null

    if (existingPhone?.originalNumber && existingPhone.regionCode) {
      return {
        phoneNumber: existingPhone.originalNumber,
        phoneNumberCountryCode: existingPhone.regionCode.toLowerCase(),
      }
    }

    return {
      phoneNumber: "",
      phoneNumberCountryCode:
        locationBasedInitialValues.phoneNumberCountryCode || "us",
    }
  }, [
    orderData?.selectedFulfillmentOption?.type,
    orderData?.fulfillmentDetails?.phoneNumber,
    locationBasedInitialValues.phoneNumberCountryCode,
  ])

  return (
    <>
      <Text
        fontWeight="normal"
        color="mono100"
        variant={["sm-display", "sm-display", "md"]}
      >
        Free pickup from
      </Text>
      <Spacer y={1} />
      <Text variant="sm" color="mono60">
        {orderData.shippingOrigin}
      </Text>
      <Spacer y={1} />
      <Text variant="sm" color="mono60">
        After the seller confirms your order, you'll be appointed an Artsy
        specialist within 2 business days to handle pickup logistics.
      </Text>
      <Spacer y={[2, 2, 4]} />
      <Formik<PickupFormValues>
        initialValues={initialValues}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, isValid }) => {
          return (
            <Form noValidate>
              <PickupFormInput />
              <Spacer y={4} />
              <Button
                variant={"primaryBlack"}
                width="100%"
                type="submit"
                onClick={() => {
                  setCheckoutMode("standard")
                }}
                loading={isSubmitting}
                disabled={!isValid}
              >
                Continue to Payment
              </Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

const PickupFormInput: React.FC = () => {
  const formikContext = useFormikContext<PickupFormValues>()
  const formRef = useScrollToFieldErrorOnSubmit(
    CheckoutStepName.FULFILLMENT_DETAILS,
  )

  return (
    <div ref={formRef}>
      <SelectInput
        key={`phone-input-${formikContext.values.phoneNumberCountryCode || "empty"}`}
        label="Phone number"
        mt={1}
        name="phoneNumber"
        onChange={formikContext.handleChange}
        onBlur={formikContext.handleBlur}
        data-testid={"PickupPhoneNumberInput"}
        options={phoneCountryOptions}
        onSelect={(option: (typeof phoneCountryOptions)[number]): void => {
          formikContext.setFieldValue("phoneNumberCountryCode", option.value)
        }}
        dropdownValue={formikContext.values.phoneNumberCountryCode}
        inputValue={formikContext.values.phoneNumber}
        placeholder="(000) 000 0000"
        autoComplete="tel-national"
        error={
          (formikContext.touched.phoneNumberCountryCode &&
            (formikContext.errors.phoneNumberCountryCode as
              | string
              | undefined)) ||
          (formikContext.touched.phoneNumber &&
            (formikContext.errors.phoneNumber as string | undefined))
        }
        enableSearch
        required
      />
    </div>
  )
}

const VALIDATION_SCHEMA = Yup.object().shape({
  ...richRequiredPhoneValidators,
})

const FRAGMENT = graphql`
  fragment Order2PickupForm_order on Order {
    internalID
    fulfillmentOptions {
      type
    }
    selectedFulfillmentOption {
      type
    }
    fulfillmentDetails {
      phoneNumber {
        countryCode
        regionCode
        originalNumber
      }
    }
    shippingOrigin
  }
`
