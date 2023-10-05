import {
  Button,
  Input,
  Join,
  PasswordInput,
  Select,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { PRICE_BUCKETS } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileAboutYou"
import { passwordValidator } from "Components/AuthDialog/Views/AuthDialogSignUp"
import { Form, Formik } from "formik"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import * as Yup from "yup"
import { SettingsEditSettingsInformation_me$data } from "__generated__/SettingsEditSettingsInformation_me.graphql"
import { useUpdateSettingsInformation } from "./useUpdateSettingsInformation"
import {
  PhoneNumberInput,
  validatePhoneNumber,
} from "Components/PhoneNumberInput"

interface SettingsEditSettingsInformationProps {
  me: SettingsEditSettingsInformation_me$data
}

export const SettingsEditSettingsInformation: React.FC<SettingsEditSettingsInformationProps> = ({
  me,
}) => {
  const { sendToast } = useToasts()
  const { submitMutation } = useUpdateSettingsInformation()
  const phoneNumber = me.phoneNumber?.display ?? me.phoneNumber?.originalNumber
  const phoneCountryCode = me.phoneNumber?.regionCode ?? "us"

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Information
      </Text>
      <Formik
        initialValues={{
          email: me.email ?? "",
          phoneNumber: phoneNumber ?? "",
          phoneCountryCode,
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
          phoneNumber: Yup.string()
            .test({
              name: "phone-number-is-valid",
              message: "Please enter a valid phone number",
              test: (national, context) => {
                // Phone number not required so allow blank
                if (!national || !national.length) {
                  return true
                }

                return validatePhoneNumber({
                  national: `${national}`,
                  regionCode: `${context.parent.phoneCountryCode}`,
                })
              },
            })
            .notRequired(),
          phoneNumberCountryCode: Yup.string().notRequired(),
        })}
        onSubmit={async (
          {
            email,
            password,
            phoneNumber,
            phoneCountryCode,
            priceRangeMin,
            priceRangeMax,
          },
          { setFieldValue }
        ) => {
          try {
            const { updateMyUserProfile } = await submitMutation({
              variables: {
                input: {
                  email,
                  password,
                  phoneNumber,
                  phoneCountryCode,
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
              "phoneCountryCode",
              updatedPhoneCountryCode ?? phoneCountryCode
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

              <PhoneNumberInput
                title="Mobile Number"
                mt={4}
                inputProps={{
                  name: "phoneNumber",
                  onBlur: handleBlur,
                  onChange: handleChange,
                  placeholder: "Enter your mobile phone number",
                  value: values.phoneNumber,
                }}
                selectProps={{
                  name: "phoneCountryCode",
                  onBlur: handleBlur,
                  selected: values.phoneCountryCode,
                  onSelect: value => {
                    setFieldValue("phoneCountryCode", value)
                  },
                }}
                error={
                  (touched.phoneCountryCode && errors.phoneCountryCode) ||
                  (touched.phoneNumber && errors.phoneNumber)
                }
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
                    .map(n => parseInt(n, 10))

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

export const SettingsEditSettingsInformationFragmentContainer = createFragmentContainer(
  SettingsEditSettingsInformation,
  {
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
  }
)
