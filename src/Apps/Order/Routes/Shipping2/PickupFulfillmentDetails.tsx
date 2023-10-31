export const PickupFulfillmentDetails: FC<FulfillmentDetailsFormProps> = props => {
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

  return (
    <Formik<FulfillmentValues>
      initialValues={shippingContext.initialValues.fulfillmentDetails}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {shippingContext.initialValues.fulfillmentDetails.fulfillmentType ===
      "PICKUP" ? (
        <PickupFulfillmentDetailsFormLayout />
      ) : (
        <FulfillmentDetailsFormLayout
          order={props.order}
          me={props.me}
          verifyAddressNow={verifyAddressNow}
          onAddressVerificationComplete={handleVerificationComplete}
        />
      )}
    </Formik>
  )
}
