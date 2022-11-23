import { Box, BoxProps, Input } from "@artsy/palette"
import { useFormikContext } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { ContactInformationForm_me$data } from "__generated__/ContactInformationForm_me.graphql"
import { PhoneNumberInput } from "Components/PhoneNumberInput"

export interface ContactInformationFormModel {
  name: string
  email: string
  phoneNumber: string
  phoneNumberCountryCode: string
}

export interface ContactInformationFormProps extends BoxProps {
  me: ContactInformationForm_me$data
  optionalPhoneNumber?: boolean
}

export const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  me,
  optionalPhoneNumber = false,
  ...rest
}) => {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormikContext<ContactInformationFormModel>()

  return (
    <Box {...rest}>
      <Input
        maxLength={256}
        name="name"
        title="Name"
        placeholder="Your full name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
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
        required
        error={
          (touched.phoneNumberCountryCode && errors.phoneNumberCountryCode) ||
          (touched.phoneNumber && errors.phoneNumber)
        }
      />
    </Box>
  )
}

export const ContactInformationFormFragmentContainer = createFragmentContainer(
  ContactInformationForm,
  {
    me: graphql`
      fragment ContactInformationForm_me on Me {
        internalID
        name
        email
        phone
        phoneNumber {
          isValid
          international: display(format: INTERNATIONAL)
          national: display(format: NATIONAL)
          regionCode
        }
      }
    `,
  }
)
