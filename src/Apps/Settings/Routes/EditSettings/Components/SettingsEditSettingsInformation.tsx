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
import { email, name, password } from "Components/Authentication/Validators"
import { Form, Formik } from "formik"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import * as Yup from "yup"
import { SettingsEditSettingsInformation_me$data } from "__generated__/SettingsEditSettingsInformation_me.graphql"
import { useUpdateSettingsInformation } from "./useUpdateSettingsInformation"

interface SettingsEditSettingsInformationProps {
  me: SettingsEditSettingsInformation_me$data
}

export const SettingsEditSettingsInformation: React.FC<SettingsEditSettingsInformationProps> = ({
  me,
}) => {
  const { sendToast } = useToasts()
  const { submitMutation } = useUpdateSettingsInformation()
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Information
      </Text>
      {isCollectorProfileEnabled ? (
        <Formik
          initialValues={{
            email: me.email ?? "",
            phone: me.phone ?? "",
            priceRange: me.priceRange ?? "",
            priceRangeMax: me.priceRangeMax,
            priceRangeMin: me.priceRangeMin,
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email,
            // Requires password when email is changed
            password: password.when("email", {
              is: email => email !== me.email,
              otherwise: field => field.notRequired(),
            }),
            phone: Yup.string().test(
              "Phone must be valid",
              "Phone number must be valid",
              value => {
                // https://github.com/artsy/gravity/blob/a8227694da735dc03c8ba50928325d84e4b2846b/app/models/util/phone_validation.rb#L2
                if (!value) return true
                const digits = (value.match(/\d/g) ?? []).length
                const validChars = /^[+\/\-()\.\s0-9A-Za-z]+$/g.test(value)
                return digits >= 3 && validChars
              }
            ),
          })}
          onSubmit={async (
            { email, password, phone, priceRangeMin, priceRangeMax },
            { setFieldValue }
          ) => {
            try {
              const { updateMyUserProfile } = await submitMutation({
                variables: {
                  input: {
                    email,
                    password,
                    phone,
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
              setFieldValue("phone", updatedMe?.phone ?? phone)
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

                <Input
                  title="Mobile Number"
                  name="phone"
                  placeholder="Enter your mobile phone number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
                  autoComplete="tel"
                  error={errors.phone}
                />

                <Select
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
      ) : (
        <Formik
          initialValues={{
            name: me.name ?? "",
            email: me.email ?? "",
            phone: me.phone ?? "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email,
            name,
            // Requires password when email is changed
            password: password.when("email", {
              is: email => email !== me.email,
              otherwise: field => field.notRequired(),
            }),
            phone: Yup.string().test(
              "Phone must be valid",
              "Phone number must be valid",
              value => {
                // https://github.com/artsy/gravity/blob/a8227694da735dc03c8ba50928325d84e4b2846b/app/models/util/phone_validation.rb#L2
                if (!value) return true
                const digits = (value.match(/\d/g) ?? []).length
                const validChars = /^[+\/\-()\.\s0-9A-Za-z]+$/g.test(value)
                return digits >= 3 && validChars
              }
            ),
          })}
          onSubmit={async ({ email, name, password, phone }, { resetForm }) => {
            try {
              const { updateMyUserProfile } = await submitMutation({
                variables: { input: { email, name, password, phone } },
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

              resetForm({
                values: {
                  name: updatedMe?.name ?? name,
                  email: updatedMe?.email ?? email,
                  phone: updatedMe?.phone ?? phone,
                  password: "",
                },
              })
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
            handleBlur,
            handleChange,
            isSubmitting,
            values,
            isValid,
          }) => (
            <Form>
              <Join separator={<Spacer y={2} />}>
                <Input
                  title="Full Name"
                  name="name"
                  error={errors.name}
                  placeholder="Enter your full name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="name"
                />

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
                <Input
                  title="Mobile Number"
                  name="phone"
                  placeholder="Enter your mobile phone number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
                  autoComplete="tel"
                  error={errors.phone}
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
      )}
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
        phone
        priceRange
        priceRangeMin
        priceRangeMax
      }
    `,
  }
)
