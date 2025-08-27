import {
  Button,
  Input,
  Join,
  PasswordInput,
  Select,
  SelectInput,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { PRICE_BUCKETS } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileAboutYou"
import { sortCountriesForCountryInput } from "Components/Address/utils/sortCountriesForCountryInput"
import { useInitialLocationValues } from "Components/Address/utils/useInitialLocationValues"
import { richPhoneValidators } from "Components/Address/utils/utils"
import { passwordValidator } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { countries as countryPhoneOptions } from "Utils/countries"
import type { SettingsEditSettingsInformation_me$data } from "__generated__/SettingsEditSettingsInformation_me.graphql"
import { Form, Formik } from "formik"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import * as Yup from "yup"
import { useUpdateSettingsInformation } from "./useUpdateSettingsInformation"

interface SettingsEditSettingsInformationProps {
  me: SettingsEditSettingsInformation_me$data
}

export const SettingsEditSettingsInformation: React.FC<
  React.PropsWithChildren<SettingsEditSettingsInformationProps>
> = ({ me }) => {
  const { sendToast } = useToasts()
  const { submitMutation } = useUpdateSettingsInformation()
  const phoneNumber = me.phoneNumber?.display ?? me.phoneNumber?.originalNumber
  const phoneCountryCode = me.phoneNumber?.regionCode

  const countryInputOptions = sortCountriesForCountryInput(countryPhoneOptions)
  const locationBasedInitialValues =
    useInitialLocationValues(countryInputOptions)
  const defaultPhoneCountryCode = phoneCountryCode
    ? phoneCountryCode
    : locationBasedInitialValues.phoneNumberCountryCode || "us"

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Information
      </Text>
      <Formik
        key={`formik-${defaultPhoneCountryCode}`}
        initialValues={{
          email: me.email ?? "",
          phoneNumber: phoneNumber ?? "",
          phoneNumberCountryCode: defaultPhoneCountryCode,
          priceRange: me.priceRange ?? "",
          priceRangeMax: me.priceRangeMax,
          priceRangeMin: me.priceRangeMin,
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Please enter a valid email.")
            .required("Please enter a valid email."),
          // Requires password when email is changed
          password: passwordValidator.when("email", {
            is: email => email !== me.email,
            otherwise: field => field.notRequired(),
          }),
          phoneNumber: richPhoneValidators.phoneNumber.notRequired(),
          phoneNumberCountryCode:
            richPhoneValidators.phoneNumberCountryCode.notRequired(),
        })}
        onSubmit={async (
          {
            email,
            password,
            phoneNumber,
            phoneNumberCountryCode,
            priceRangeMin,
            priceRangeMax,
          },
          { setFieldValue },
        ) => {
          try {
            const { updateMyUserProfile } = await submitMutation({
              variables: {
                input: {
                  email,
                  password,
                  phoneNumber,
                  phoneCountryCode: phoneNumberCountryCode,
                  priceRangeMin,
                  priceRangeMax,
                },
              },
              rejectIf: res => {
                return res.updateMyUserProfile?.userOrError?.mutationError
              },
            })

            sendToast({
              variant: "success",
              message: "Information updated successfully",
            })

            // If the email was updated, inform the user that they will need to
            // confirm the new email address before we will update it.
            if (email !== me.email) {
              sendToast({
                variant: "alert",
                message:
                  "Please confirm your new email for this update to take effect",
              })
            }

            const updatedMe = updateMyUserProfile?.me

            setFieldValue("email", updatedMe?.email ?? email)

            const updatedPhoneNumber =
              updatedMe?.phoneNumber?.display ??
              updatedMe?.phoneNumber?.originalNumber
            const updatedPhoneCountryCode = updatedMe?.phoneNumber?.regionCode
            setFieldValue("phoneNumber", updatedPhoneNumber ?? phoneNumber)
            setFieldValue(
              "phoneNumberCountryCode",
              updatedPhoneCountryCode ?? phoneNumberCountryCode,
            )

            setFieldValue("password", "")
          } catch (err) {
            console.error(err)

            const error = Array.isArray(err) ? err[0] : err

            sendToast({
              variant: "error",
              message: "There was a problem",
              description: error.message,
            })
          }
        }}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
          isSubmitting,
          values,
          isValid,
        }) => (
          <Form>
            <Join separator={<Spacer y={2} />}>
              <Input
                title="Email"
                name="email"
                error={errors.email}
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                required
                autoComplete="email"
              />

              <SelectInput
                key={`phone-input-${values.phoneNumberCountryCode || "empty"}`}
                label="Mobile Number"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                options={countryPhoneOptions}
                onSelect={option => {
                  setFieldValue("phoneNumberCountryCode", option.value)
                }}
                dropdownValue={values.phoneNumberCountryCode}
                inputValue={values.phoneNumber}
                placeholder="(000) 000 0000"
                autoComplete="tel-national"
                enableSearch
              />

              <Select
                name="priceRange"
                title="Price Range"
                options={PRICE_BUCKETS}
                selected={values.priceRange}
                onSelect={value => {
                  setFieldValue("priceRange", value)

                  // We don't actually accept a priceRange,
                  // so have to split it into min/max
                  const [priceRangeMin, priceRangeMax] = value
                    .split(":")
                    .map(n => Number.parseInt(n, 10))

                  setFieldValue("priceRangeMin", priceRangeMin)
                  setFieldValue("priceRangeMax", priceRangeMax)
                }}
              />

              {me.paddleNumber && (
                <Input
                  name="paddleNumber"
                  title="Bidder Number"
                  value={me.paddleNumber}
                  readOnly
                  disabled
                />
              )}

              {values.email !== me.email && (
                <PasswordInput
                  name="password"
                  title="Password"
                  error={errors.password}
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="current-password"
                />
              )}

              <Button
                data-test="information-submit"
                mt={2}
                type="submit"
                loading={isSubmitting}
                disabled={!isValid}
              >
                Save Changes
              </Button>
            </Join>
          </Form>
        )}
      </Formik>
    </>
  )
}

export const SettingsEditSettingsInformationFragmentContainer =
  createFragmentContainer(SettingsEditSettingsInformation, {
    me: graphql`
      fragment SettingsEditSettingsInformation_me on Me {
        email
        name
        paddleNumber
        phoneNumber {
          regionCode
          display(format: NATIONAL)
          originalNumber
        }
        priceRange
        priceRangeMin
        priceRangeMax
      }
    `,
  })
