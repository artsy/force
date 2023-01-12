import { Box, Input, TextArea } from "@artsy/palette"
import { useFormikContext } from "formik"
import { PhoneNumberInput } from "Components/PhoneNumberInput"

export interface ConsignmentInquiryFormModel {
  name: string
  email: string
  phoneNumber: string
  phoneNumberCountryCode: string
  message: string
}

export const ConsignmentInquiryForm: React.FC<{}> = ({ ...rest }) => {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormikContext<ConsignmentInquiryFormModel>()

  return (
    <Box>
      <Input
        maxLength={256}
        name="name"
        title="Name"
        placeholder="Your full name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <Input
        mt={4}
        maxLength={256}
        name="email"
        title="Email"
        placeholder="Your email address"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
        required
      />
      <PhoneNumberInput
        mt={4}
        inputProps={{
          name: "phoneNumber",
          onBlur: handleBlur,
          onChange: handleChange,
          placeholder: "(000) 000 0000",
          value: values.phoneNumber,
        }}
        selectProps={{
          name: "phoneNumberCountryCode",
          onBlur: handleBlur,
          selected: values.phoneNumberCountryCode,
          onSelect: value => {
            setFieldValue("phoneNumberCountryCode", value)
          },
        }}
        error={
          (touched.phoneNumberCountryCode && errors.phoneNumberCountryCode) ||
          (touched.phoneNumber && errors.phoneNumber)
        }
      />
      <TextArea
        mt={4}
        name="message"
        title="Message"
        placeholder="Questions about selling multiple works or an entire collection? Tell us more about how we can assist you. "
        onChange={({ value }) => {
          setFieldValue("message", value)
        }}
        value={values.message}
        onBlur={handleBlur}
        required
        error={touched.message && errors.message}
      />
    </Box>
  )
}
