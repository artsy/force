import {
  BorderedRadio,
  Box,
  Button,
  Checkbox,
  Collapse,
  RadioGroup,
  Text,
} from "@artsy/palette"
import {
  AddressFormWrapper,
  AddressFormValues,
  AddressInputs,
  EMPTY_ADDRESS,
  DEFAULT_VALIDATION_SCHEMA,
} from "Components/Address/NewAddressForm"
import { PhoneNumberForm } from "Apps/Order/Components/PhoneNumberForm"
import { Form, FormikErrors, useFormikContext } from "formik"
import * as React from "react"
import { Title } from "react-head"

export const DebugApp: React.FC<{}> = () => {
  return (
    <>
      <Title>Baseline</Title>

      <Text variant="sm-display">Baseline</Text>
      <ShippingLikeExample />
    </>
  )
}

const initialAddress: AddressFormValues = {
  name: "",
  country: "",
  addressLine1: "",
  city: "",
  region: "",
  postalCode: "",
  addressLine2: "",
}

type AddressValuesWithAgreement = AddressFormValues & { agreedToTerms: boolean }

const ExtraInputs: React.FC<{}> = () => {
  const {
    setFieldTouched,
    setFieldValue,
    setFieldError,
    handleChange,
    values,
  } = useFormikContext<AddressValuesWithAgreement>()

  return (
    <Checkbox
      mt={2}
      selected={values.agreedToTerms}
      onSelect={value => {
        if (values.name !== "Erik") {
          setFieldError("name", "Name must be Erik")
          setFieldError("agreedToTerms", "Scroll up")
          return
        }
        setFieldValue("agreedToTerms", value)
        setFieldTouched("agreedToTerms", true)
      }}
      onChange={handleChange}
    >
      For the love of art :)
    </Checkbox>
  )
}

interface PickupValues extends AddressFormValues {
  fulfillmentType?: "PICKUP"
  phoneNumber?: string
  selectedShippingQuote: null
}
interface ShipValues extends AddressFormValues {
  fulfillmentType: "SHIP"
  phoneNumber?: string
  selectedShippingQuote?: string
}

type ShippingFormValues = PickupValues | ShipValues

const usePretendRelay = () => {
  const [fulfillmentType, fulfillmentTypeMutation] = React.useState<
    null | "PICKUP" | "SHIP"
  >(null)

  // address + phone number
  const [fulfillmentDetails, fulfillmentDetailsMutation] = React.useState<
    Partial<
      Omit<ShippingFormValues, "fulfillmentType" | "selectedShippingQuote">
    >
  >({})

  // shipping quote
  const [selectedShippingQuote, selectShippingQuoteMutation] = React.useState<
    null | string
  >(null)

  return {
    fulfillmentType,
    fulfillmentTypeMutation,
    fulfillmentDetails,
    fulfillmentDetailsMutation,
    selectedShippingQuote,
    selectShippingQuoteMutation,
  }
}
const ShippingLikeExample: React.FC<{}> = () => {
  // Treat these as the incoming relay props and their mutation setters
  const {
    fulfillmentType,
    fulfillmentTypeMutation,
    fulfillmentDetails,
    fulfillmentDetailsMutation,
    selectShippingQuoteMutation,
    selectedShippingQuote,
  } = usePretendRelay()

  // We would also want to make sure future steps are unset
  const calculateStep = React.useCallback(() => {
    if (!fulfillmentType) {
      return "fulfillmentType"
    } else if (!fulfillmentDetails) {
      return "fulfillmentDetails"
    } else if (fulfillmentType === "SHIP" && !selectedShippingQuote) {
      return "artsyShipping"
    }
    console.error("shouldn't get here - maybe youre done?")
    return "artsyShipping"
  }, [fulfillmentType, fulfillmentDetails, selectedShippingQuote])

  const [shippingStep, setShippingStep] = React.useState<ShippingStep | null>(
    null
  )

  React.useEffect(() => {
    const newStep = calculateStep()
    setShippingStep(newStep)
    // stopped here; recalculate on shipping step every time props change
    // rather than changing imperatively, pass props to calculateStep(...)
  }, [])

  const maybeGoBack = React.useCallback(
    (values): boolean => {
      if (
        shippingStep !== "fulfillmentType" &&
        values.fulfillmentType !== fulfillmentType
      ) {
        fulfillmentTypeMutation(values.fulfillmentType)
        // clear out the old values
        fulfillmentDetailsMutation({})
        selectShippingQuoteMutation(null)
        return true
      } else {
        return false
      }
    },
    [
      fulfillmentDetailsMutation,
      fulfillmentType,
      fulfillmentTypeMutation,
      selectShippingQuoteMutation,
      shippingStep,
    ]
  )

  const handleSubmit = React.useCallback(
    (values, _helpers) => {
      if (maybeGoBack(values)) return

      if (shippingStep === "fulfillmentType") {
        fulfillmentTypeMutation(values.fulfillmentType)
        setShippingStep("fulfillmentDetails")
      } else if (shippingStep === "fulfillmentDetails") {
        // setAddressNeedsVerification(true)
        // setTemporaryAddress(values)
        // const finalAddress =
        fulfillmentDetailsMutation(values)
        if (values.fulfillmentType === "SHIP") {
          setShippingStep("artsyShipping")
        } else {
          alert("done")
        }
      }
    },
    [
      fulfillmentDetailsMutation,
      fulfillmentTypeMutation,
      maybeGoBack,
      shippingStep,
    ]
  )

  const handleValidate = React.useCallback(
    async values => {
      let errors: FormikErrors<ShippingFormValues> = {}
      if (shippingStep === "fulfillmentType") {
        if (!values.fulfillmentType) {
          errors.fulfillmentType = "Please select a fulfillment"
        }
      } else if (shippingStep === "fulfillmentDetails") {
        console.log(maybeGoBack(values))
        if (maybeGoBack(values)) return {}
        errors = await DEFAULT_VALIDATION_SCHEMA.validate(values)
      } else if (shippingStep === "artsyShipping") {
        if (!values.selectedShippingQuote) {
          errors.selectedShippingQuote = "Please select a shipping quote"
        }
      }
    },
    [maybeGoBack, shippingStep]
  )

  return (
    <>
      <AddressFormWrapper<ShippingFormValues>
        onSubmit={handleSubmit}
        initialValues={EMPTY_ADDRESS}
        validate={handleValidate}
      >
        {({ setFieldValue, values, errors, ...bag }) => (
          <Form>
            <Box>
              <RadioGroup
                data-test="shipping-options"
                onSelect={value => {
                  setFieldValue("fulfillmentType", value)
                  bag.submitForm()
                  // PROBABLY WANT TO SUBMIT THE FORM IMMEDIATELY AND LET THE SUBMIT HANDLER DEAL WITH THE PIECES
                }}
                defaultValue={"PICKUP"}
              >
                <Text variant="lg-display" mb="1">
                  Delivery method
                </Text>
                <BorderedRadio value="SHIP" label="Shipping" />
                <BorderedRadio
                  value="PICKUP"
                  label="Arrange for pickup (free)"
                  data-test="pickupOption"
                >
                  <Collapse open={values.fulfillmentType === "PICKUP"}>
                    <Text variant="xs" color="black60">
                      After your order is confirmed, a specialist will contact
                      you to coordinate pickup.
                    </Text>
                  </Collapse>
                </BorderedRadio>
              </RadioGroup>
              <Collapse
                data-test="addressFormCollapse"
                open={shippingStep !== "fulfillmentType"}
              >
                {fulfillmentType === "SHIP" && <AddressInputs />}
                <PhoneNumberForm
                  tabIndex={shippingStep !== "fulfillmentType" ? 0 : -1}
                  value={values.phoneNumber}
                  errors={errors.phoneNumber || ""}
                  touched={!!bag.touched.phoneNumber}
                  onChange={value => {
                    setFieldValue("phoneNumber", value)
                  }}
                  label="Required for shipping logistics"
                />
              </Collapse>
              <Button type="submit" variant="primaryBlack" width="50%">
                Save and Continue
              </Button>
            </Box>
          </Form>
        )}
      </AddressFormWrapper>
      <Box flexGrow={0} bg="black10" p={1}>
        <Text variant="md">Intermediate Address Form State</Text>
        <Text variant="xs">
          {JSON.stringify(
            {
              shippingStep,
              fulfillmentType,
              fulfillmentDetails,
              selectedShippingQuote,
            },
            null,
            2
          )}
        </Text>
      </Box>
    </>
  )
}
