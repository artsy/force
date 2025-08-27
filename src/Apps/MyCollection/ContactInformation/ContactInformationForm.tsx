import { Box, type BoxProps, Input, SelectInput } from "@artsy/palette"
import { countries } from "Utils/countries"
import type { ContactInformationForm_me$data } from "__generated__/ContactInformationForm_me.graphql"
import { useFormikContext } from "formik"
import { createFragmentContainer, graphql } from "react-relay"

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

export const ContactInformationForm: React.FC<
  React.PropsWithChildren<ContactInformationFormProps>
> = ({ me, optionalPhoneNumber = false, ...rest }) => {
  const { values, handleChange, handleBlur, touched, errors, setFieldValue } =
    useFormikContext<ContactInformationFormModel>()

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
      <SelectInput
        label="Phone number"
        options={countries}
        onSelect={option => {
          setFieldValue("phoneNumberCountryCode", option.value)
        }}
        name="phoneNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        mt={4}
        dropdownValue={values.phoneNumberCountryCode}
        inputValue={values.phoneNumber}
        placeholder="(000) 000 0000"
        autoComplete="tel-national"
        enableSearch
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
          regionCode
        }
      }
    `,
  },
)
