import * as Yup from "yup"
import {
  Box,
  Button,
  Column,
  GridColumns,
  Input,
  Flex,
  Message,
  ModalDialog,
  Text,
  Spacer,
  RadioGroup,
  BorderedRadio,
} from "@artsy/palette"
import { Formik, Form } from "formik"
import { useState, FC } from "react"
import {
  CountrySelect,
  ALL_COUNTRY_SELECT_OPTIONS,
} from "Components/CountrySelect"
import { Environment, fetchQuery, graphql } from "relay-runtime"
import { useSystemContext } from "System/useSystemContext"

export interface Address {
  name: string
  country: string
  addressLine1: string
  city: string
  region: string
  postalCode: string
  addressLine2: string
}

export type AddressChangeHandler = (
  address: Address,
  key: keyof Address
) => void

enum ErrorModalTitle {
  general = "Check your delivery address",
  suggested = "Confirm your delivery address",
}

enum AddressSuggestionRadioButton {
  recommended = "Recommended",
  user_address = "What you entered",
}

export const INITIAL_ADDRESS = {
  name: "",
  country: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  region: "",
}

const INITIAL_VALUES = {
  attributes: INITIAL_ADDRESS,
}

const VALIDATION_SCHEMA = Yup.object().shape({
  attributes: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    addressLine1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    region: Yup.string().required("Region is required"),
    postalCode: Yup.string().required("Postal Code is required"),
  }),
})

export const CheckoutAddress: FC<{
  userCountry: string
  onChange: AddressChangeHandler
}> = ({ userCountry, onChange }) => {
  const userDefaultCountry = getCountryNameOrCode(userCountry, true)
  const [displayModal, setDisplayModal] = useState(false)
  const [modalTitle, setModalTitle] = useState<ErrorModalTitle>(
    ErrorModalTitle.general
  )
  const [selectedAddress, setSelectedAddress] = useState<
    AddressSuggestionRadioButton
  >(AddressSuggestionRadioButton.recommended)
  const [addressLines, setAddressLines] = useState<string[]>([])

  const { relayEnvironment } = useSystemContext()

  const handleKeepAddressClick = () => {
    // re-submit address
  }

  const handleEditAddressClick = () => {
    // do nothing
    setDisplayModal(false)
  }

  const handleUseSuggestedAddressClick = () => {
    // submit suggested address
  }

  const handleFormSubmit = async ({ name, ...address }: Address) => {
    const response = await fetchQuery<any>(
      relayEnvironment as Environment,
      graphql`
        query CheckoutAddressQuery($address: AddressInput!) {
          verifyAddress(address: $address) {
            inputAddress {
              lines
              address {
                addressLine1
                addressLine2
                city
                country
                postalCode
                region
              }
            }
            suggestedAddresses {
              lines
              address {
                addressLine1
                addressLine2
                city
                country
                postalCode
                region
              }
            }
            verificationStatus
          }
        }
      `,
      {
        address,
      },
      {
        fetchPolicy: "network-only",
      }
    ).toPromise()

    console.log({ response })

    const { firstLine, secondLine } = formatAddress({ name, ...address })
    setAddressLines([firstLine, secondLine])

    const res = await mockRequest()

    switch (res) {
      case 0:
        setModalTitle(ErrorModalTitle.general)
        setDisplayModal(true)
        break
      case 1:
        setModalTitle(ErrorModalTitle.suggested)
        setDisplayModal(true)
        break
      case 2:
        break
      default:
        break
    }
  }

  return (
    <Formik
      validateOnMount
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        attributes: {
          ...INITIAL_VALUES.attributes,
          country: userDefaultCountry,
        },
      }}
      onSubmit={({ attributes }) => handleFormSubmit(attributes)}
    >
      {({ values, errors, touched, status, handleChange, handleBlur }) => {
        const changeEventHandler = (
          e: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
          key: keyof Address
        ) => {
          handleChange(e)
          onChange(
            {
              ...values.attributes,
              [key]: e.currentTarget.value,
            },
            key
          )
        }
        return (
          <Form>
            {displayModal && (
              <ModalDialog
                title={modalTitle}
                onClose={() => setDisplayModal(false)}
                width={["100%", 550]}
              >
                {modalTitle === ErrorModalTitle.general && (
                  <>
                    <Text>
                      The address you entered may be incorrect or incomplete.
                      Please check it and make any changes necessary.
                    </Text>
                    <Spacer y={4} />
                    <Text fontWeight="bold">What you entered</Text>
                    <Spacer y={1} />
                    <Box border="1px solid" borderColor="black30" p={2}>
                      {addressLines.map((line: string) => (
                        <Text key={line}>{line}</Text>
                      ))}
                    </Box>
                    <Spacer y={4} />
                    <Flex width="100%" justifyContent="space-between">
                      <Button
                        onClick={handleKeepAddressClick}
                        variant="secondaryBlack"
                        flex={1}
                      >
                        Use This Address
                      </Button>
                      <Spacer x={1} />
                      <Button onClick={handleEditAddressClick} flex={1}>
                        Edit Address
                      </Button>
                    </Flex>
                  </>
                )}

                {modalTitle === ErrorModalTitle.suggested && (
                  <>
                    <Text>
                      To ensure prompt and accurate delivery, we suggest a
                      modified shipping address.
                    </Text>
                    <Spacer y={2} />
                    <RadioGroup
                      onSelect={selected =>
                        setSelectedAddress(
                          selected as AddressSuggestionRadioButton
                        )
                      }
                      defaultValue={selectedAddress}
                    >
                      <BorderedRadio
                        value={AddressSuggestionRadioButton.recommended}
                        label={AddressSuggestionRadioButton.recommended}
                      >
                        <Flex flexDirection="column">
                          {addressLines.map((line: string) => (
                            <Text variant="xs" key={line}>
                              {line}
                            </Text>
                          ))}
                        </Flex>
                      </BorderedRadio>
                      <BorderedRadio
                        value={AddressSuggestionRadioButton.user_address}
                        label={AddressSuggestionRadioButton.user_address}
                      >
                        <Flex flexDirection="column">
                          {addressLines.map((line: string) => (
                            <Text variant="xs" key={line}>
                              {line}
                            </Text>
                          ))}
                        </Flex>
                      </BorderedRadio>
                    </RadioGroup>
                    <Spacer y={4} />
                    <Flex width="100%" justifyContent="space-between">
                      <Button
                        onClick={handleEditAddressClick}
                        variant="secondaryBlack"
                        flex={1}
                      >
                        Back to Edit
                      </Button>
                      <Spacer x={1} />
                      <Button onClick={handleUseSuggestedAddressClick} flex={1}>
                        Use This Address
                      </Button>
                    </Flex>
                  </>
                )}
              </ModalDialog>
            )}
            <GridColumns>
              <Column span={12}>
                <Input
                  name="attributes.name"
                  aria-label="address-name-input"
                  title="Add full name"
                  placeholder="Enter name"
                  autoComplete="name"
                  autoFocus
                  value={values.attributes.name}
                  onChange={e => changeEventHandler(e, "name")}
                  onBlur={handleBlur}
                  error={touched.attributes?.name && errors.attributes?.name}
                  required
                />
              </Column>

              <Column span={12}>
                <CountrySelect
                  title="Country"
                  aria-label="address-country-select"
                  name="attributes.country"
                  value={values.attributes.country}
                  onChange={e => changeEventHandler(e, "country")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.country && errors.attributes?.country
                  }
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.addressLine1"
                  aria-label="address-street-input"
                  title="Address line 1"
                  placeholder="Add street address"
                  autoComplete="address-line1"
                  value={values.attributes.addressLine1}
                  onChange={e => changeEventHandler(e, "addressLine1")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.addressLine1 &&
                    errors.attributes?.addressLine1
                  }
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.addressLine2"
                  aria-label="address-optional-second-line-input"
                  title="Address line 2 (optional)"
                  placeholder="Add apt, floor, suite, etc."
                  autoComplete="address-line2"
                  value={values.attributes.addressLine2}
                  onChange={e => changeEventHandler(e, "addressLine2")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.addressLine2 &&
                    errors.attributes?.addressLine2
                  }
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.postalCode"
                  aria-label="address-postal-code-input"
                  title="Postal Code"
                  placeholder="Add postal code"
                  autoComplete="postal-code"
                  value={values.attributes.postalCode}
                  onChange={e => changeEventHandler(e, "postalCode")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.postalCode &&
                    errors.attributes?.postalCode
                  }
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.city"
                  aria-label="address-city-input"
                  title="City"
                  placeholder="Add city"
                  autoComplete="address-level2"
                  value={values.attributes.city}
                  onChange={e => changeEventHandler(e, "city")}
                  onBlur={handleBlur}
                  error={touched.attributes?.city && errors.attributes?.city}
                  required
                />
              </Column>

              <Column span={12}>
                <Input
                  name="attributes.region"
                  aria-label="address-state-or-region-input"
                  title="State, Province, or Region"
                  placeholder="Add state, province, or region"
                  autoComplete="address-level1"
                  value={values.attributes.region}
                  onChange={e => changeEventHandler(e, "region")}
                  onBlur={handleBlur}
                  error={
                    touched.attributes?.region && errors.attributes?.region
                  }
                  required
                />
              </Column>

              {status?.error && (
                <Column span={12}>
                  <Message variant="error">
                    {status.message ||
                      "Something went wrong. Please try again."}
                  </Message>
                </Column>
              )}
              <Column span={12}>
                <Button variant="primaryBlack" width="50%">
                  Save and Continue
                </Button>
              </Column>
            </GridColumns>
          </Form>
        )
      }}
    </Formik>
  )
}

// get country code or name by code or name
const getCountryNameOrCode = (userCountry: string, code: boolean): string => {
  if (code) {
    const countryCode = ALL_COUNTRY_SELECT_OPTIONS.find(
      country => country.text === userCountry
    )?.value
    return countryCode || "US"
  }

  const countryName = ALL_COUNTRY_SELECT_OPTIONS.find(
    country => country.value === userCountry
  )?.text
  return countryName || "United States"
}

// formats address into 2 lines
const formatAddress = (
  address: Address
): { firstLine: string; secondLine: string } => {
  let firstLine = address.addressLine1
  let secondLine = address.city

  if (address.addressLine2) {
    firstLine = `${firstLine}, ${address.addressLine2}`
  }

  if (address.region) {
    secondLine = `${secondLine}, ${address.region}`
  }

  secondLine = `${secondLine}, ${address.postalCode}, ${getCountryNameOrCode(
    address.country,
    false
  )}`

  return {
    firstLine,
    secondLine,
  }
}

// TODO: to be deleted
function mockRequest(): Promise<any> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 3))
    }, 300)
  )
}
