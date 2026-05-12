import { ContextModule } from "@artsy/cohesion"
import { Button, SelectInput, Spacer, Text } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToFieldErrorOnSubmit } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToFieldErrorOnSubmit"
import { useOrder2SetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation"
import { useOrder2SetOrderPickupDetailsMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderPickupDetailsMutation"
import {
  phoneInitialValuesFromMe,
  handlePhoneNumberChange,
  richRequiredPhoneValidators,
} from "Components/Address/utils"
import { countries as phoneCountryOptions } from "Utils/countries"
import createLogger from "Utils/logger"
import type { Order2PickupForm_me$key } from "__generated__/Order2PickupForm_me.graphql"
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
  me: Order2PickupForm_me$key
}

interface PickupFormValues {
  phoneNumber: string
  phoneNumberCountryCode: string
}

export const Order2PickupForm: React.FC<Order2PickupFormProps> = ({
  order,
  me,
}) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)

  const { completeStep, checkoutTracking, setCheckoutMode } =
    useCheckoutContext()

  const { fulfillmentOptions, shippingOrigin, mode } = orderData
  const isOffer = mode === "OFFER"
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

        completeStep(CheckoutStepName.FULFILLMENT_DETAILS)
      } catch (error) {
        logger.error("Error while setting pickup details", error)
      }
    },
    [
      setOrderFulfillmentOption,
      setOrderPickupDetails,
      orderData.internalID,
      pickupFulfillmentOption,
      completeStep,
      checkoutTracking.clickedOrderProgression,
    ],
  )

  const { phoneNumber: mePhone, phoneNumberCountryCode: mePhoneCountryCode } =
    phoneInitialValuesFromMe(meData.phoneNumber)

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
      phoneNumber: mePhone,
      phoneNumberCountryCode: mePhoneCountryCode,
    }
  }, [
    orderData?.selectedFulfillmentOption?.type,
    orderData?.fulfillmentDetails?.phoneNumber,
    mePhone,
    mePhoneCountryCode,
  ])

  return (
    <>
      <SectionHeading>Free pickup from</SectionHeading>
      <Spacer y={1} />
      {shippingOrigin && (
        <Text variant="xs" color="mono60">
          {shippingOrigin}
        </Text>
      )}
      <Text variant="xs" color="mono60">
        {isOffer
          ? "If your offer is accepted,"
          : "After your order is confirmed,"}{" "}
        a specialist will contact you with details on how to pick up the work.
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
  const formRef = useScrollToFieldErrorOnSubmit()

  return (
    <div ref={formRef}>
      <SelectInput
        key={`phone-input-${formikContext.values.phoneNumberCountryCode || "empty"}`}
        label="Phone number"
        mt={1}
        name="phoneNumber"
        onChange={e => handlePhoneNumberChange(e, formikContext.setFieldValue)}
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

const ME_FRAGMENT = graphql`
  fragment Order2PickupForm_me on Me {
    phoneNumber {
      display(format: NATIONAL)
      originalNumber
      regionCode
    }
  }
`

const ORDER_FRAGMENT = graphql`
  fragment Order2PickupForm_order on Order {
    internalID
    mode
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
