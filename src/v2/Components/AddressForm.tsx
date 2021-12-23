import {
  Flex,
  Join,
  Text,
  Spacer,
  Input,
  TextVariant,
  useThemeConfig,
  TextTransform,
  Box,
  Select,
} from "@artsy/palette"
import { countries } from "v2/Utils/countries"
import { CountrySelect } from "v2/Components/CountrySelect"
import React, { useCallback } from "react"
import { TwoColumnSplit } from "../Apps/Order/Components/TwoColumnLayout"
import { useFormikContext } from "formik"
import { BillingInfoWithTerms } from "v2/Components/BillingInfoFormContext"
import { userHasLabFeature } from "v2/Utils/user"
import { useSystemContext } from "v2/System/SystemContext"

export interface Address {
  name: string
  country: string
  postalCode: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  phoneNumber: string
}

export const emptyAddress: Address = Object.freeze({
  name: "",
  country: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  phoneNumber: "",
})

export type AddressErrors = Partial<Address>
export type AddressTouched = Partial<{ [T in keyof Address]: boolean }>

export interface AddressFormProps {
  billing?: boolean
  domesticOnly?: boolean
  euOrigin?: boolean
  showPhoneNumberInput?: boolean
  shippingCountry?: string
}

export const AddressForm: React.FC<AddressFormProps> = ({
  billing,
  domesticOnly,
  euOrigin,
  showPhoneNumberInput,
  shippingCountry,
}) => {
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    setFieldValue,
  } = useFormikContext<BillingInfoWithTerms>()

  const styles = useThemeConfig({
    v2: {
      smallVariant: "text" as TextVariant,
      xsVariant: "caption" as TextVariant,
      textTransform: "none" as TextTransform,
    },
    v3: {
      smallVariant: "xs" as TextVariant,
      xsVariant: "xs" as TextVariant,
      textTransform: "uppercase" as TextTransform,
    },
  })

  const getErrorMessage = useCallback(
    (key: keyof Address) =>
      (touched?.address &&
        touched.address[key] &&
        errors?.address &&
        errors.address[key]) ||
      "",
    [errors, touched]
  )

  const { user } = useSystemContext()
  const showPhoneNumberCountry =
    user && userHasLabFeature(user, "Phone Number Validation")

  const onlyLocalShipping = !billing && !!domesticOnly
  const lockCountryToOrigin = onlyLocalShipping && !euOrigin
  const lockCountriesToEU = onlyLocalShipping && euOrigin

  return (
    <Join separator={<Spacer mb={2} />}>
      <Flex flexDirection="column">
        <Input
          name="address.name"
          placeholder="Add full name"
          title={billing ? "Name on card" : "Full name"}
          autoCorrect="off"
          value={values?.address?.name || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getErrorMessage("name")}
        />
      </Flex>
      <TwoColumnSplit>
        <Flex flexDirection="column" pb={1}>
          <Text
            mb={0.5}
            variant={styles.smallVariant}
            color="black100"
            textTransform={styles.textTransform}
          >
            Country
          </Text>
          <CountrySelect
            selected={
              lockCountryToOrigin ||
              (lockCountriesToEU && !values?.address?.country)
                ? shippingCountry
                : values?.address?.country
            }
            onSelect={value => setFieldValue("address.country", value)}
            disabled={lockCountryToOrigin}
            euShippingOnly={lockCountriesToEU}
          />
          {(lockCountryToOrigin || lockCountriesToEU) && (
            <>
              <Spacer m={0.5} />
              <Text variant={styles.xsVariant} color="black60">
                {lockCountriesToEU
                  ? "Continental Europe shipping only."
                  : "Domestic shipping only."}
              </Text>
            </>
          )}
        </Flex>

        <Flex flexDirection="column">
          <Input
            name="address.postalCode"
            placeholder="Add postal code"
            title="Postal code"
            autoCapitalize="characters"
            autoCorrect="off"
            value={values?.address?.postalCode || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getErrorMessage("postalCode")}
          />
        </Flex>
      </TwoColumnSplit>
      <TwoColumnSplit>
        <Flex flexDirection="column">
          <Input
            name="address.addressLine1"
            placeholder="Add street address"
            title="Address line 1"
            value={values?.address?.addressLine1 || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getErrorMessage("addressLine1")}
          />
        </Flex>

        <Flex flexDirection="column">
          <Input
            name="address.addressLine2"
            placeholder="Add apt, floor, suite, etc."
            title="Address line 2 (optional)"
            value={values?.address?.addressLine2 || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getErrorMessage("addressLine2")}
          />
        </Flex>
      </TwoColumnSplit>
      <TwoColumnSplit>
        <Flex flexDirection="column">
          <Input
            name="address.city"
            placeholder="Add city"
            title="City"
            value={values?.address?.city || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getErrorMessage("city")}
          />
        </Flex>

        <Flex flexDirection="column">
          <Input
            name="address.region"
            placeholder="Add State, province, or region"
            title="State, province, or region"
            autoCorrect="off"
            value={values?.address?.region || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getErrorMessage("region")}
          />
        </Flex>
      </TwoColumnSplit>
      {showPhoneNumberInput && !showPhoneNumberCountry && (
        <>
          <Flex flexDirection="column">
            <Input
              name="address.phoneNumber"
              title="Phone number"
              type="tel"
              description={
                !billing ? "Required for shipping logistics" : undefined
              }
              placeholder="Add phone"
              autoCorrect="off"
              value={values?.address?.phoneNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getErrorMessage("phoneNumber")}
            />
          </Flex>
          <Spacer mb={2} />
        </>
      )}
      {showPhoneNumberInput && showPhoneNumberCountry && (
        <Flex>
          <Box style={{ maxWidth: "35%" }}>
            <Select
              title="Phone number"
              description={
                !billing ? "Only used for shipping purposes" : undefined
              }
              options={countries}
              style={{
                letterSpacing: "1px",
                borderRight: "none",
              }}
            />
          </Box>
          <Flex
            flexDirection="column"
            style={{
              width: "100%",
            }}
          >
            <Box height="100%"></Box>
            <Input
              name="address.phoneNumber"
              title=""
              type="tel"
              description=""
              placeholder="Add phone"
              autoCorrect="off"
              value={values?.address?.phoneNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getErrorMessage("phoneNumber")}
            />
          </Flex>
        </Flex>
      )}
    </Join>
  )
}
