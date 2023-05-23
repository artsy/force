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
} from "@artsy/palette"
import { Formik, Form } from "formik"
import { useState, FC, ReactElement } from "react"
import {
  CountrySelect,
  ALL_COUNTRY_SELECT_OPTIONS,
} from "Components/CountrySelect"

function mockRequest(): Promise<any> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 3))
    }, 300)
  )
}

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

const MODAL_WIDTH = 549

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

const getDefaultCountry = (userCountry: string): string => {
  const countryCode = ALL_COUNTRY_SELECT_OPTIONS.find(
    country => country.text === userCountry
  )?.value
  return countryCode || "US"
}

export const CheckoutAddress: FC<{
  userCountry: string
  onChange: AddressChangeHandler
}> = ({ userCountry, onChange }) => {
  const userDefaultCountry = getDefaultCountry(userCountry)
  const [displayModal, setDisplayModal] = useState(false)
  const [modalTitle, setModalTitle] = useState<ErrorModalTitle>(
    ErrorModalTitle.general
  )
  const [modalContent, setModalContent] = useState<ReactElement>()

  const handleUseThisAddressClick = () => {}
  const handleEditAddressClick = () => {}

  const handleFormSubmit = async () => {
    const res = await mockRequest()
    switch (res) {
      case 0:
        setModalTitle(ErrorModalTitle.general)
        setModalContent(
          <>
            <Text>
              The address you entered may be incorrect or incomplete. Please
              check it and make any changes necessary.
            </Text>
            <Spacer y={2} />
            <Text fontWeight={600}>What you entered</Text>
            <Spacer y={1} />
            <Box border="1px solid #C2C2C2" p={20}>
              <Text>Some address...</Text>
            </Box>
            <Spacer y={2} />
            <Flex width="100%" justifyContent="space-between">
              <Button
                onClick={handleUseThisAddressClick}
                variant="secondaryBlack"
                width="49%"
              >
                Use This Address
              </Button>
              <Button onClick={handleEditAddressClick} width="49%">
                Edit Address
              </Button>
            </Flex>
          </>
        )
        setDisplayModal(true)
        break
      case 1:
        break
      case 2:
        break
      default:
        break
    }
  }

  const handleModalClose = () => {
    setDisplayModal(false)
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
      onSubmit={handleFormSubmit}
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
                onClose={handleModalClose}
                width={MODAL_WIDTH}
              >
                {modalContent}
              </ModalDialog>
            )}
            <GridColumns>
              <Column span={12}>
                <Input
                  name="attributes.name"
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
                <Button
                  onClick={handleFormSubmit}
                  variant="primaryBlack"
                  width="50%"
                >
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
