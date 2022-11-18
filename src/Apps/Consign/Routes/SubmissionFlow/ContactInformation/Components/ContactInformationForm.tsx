import { Box, BoxProps, Input } from "@artsy/palette"
import { useFormikContext } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { ContactInformationForm_me$data } from "__generated__/ContactInformationForm_me.graphql"
import {
  PhoneNumber,
  PhoneNumberInput,
  PhoneNumberValidationResult,
} from "Components/PhoneNumberInput/PhoneNumberInput"
export interface ContactInformationFormModel {
  name: string
  email: string
  phone: PhoneNumber & { international?: string }
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

  const handlePhoneNumberValidation = (
    validationResult: PhoneNumberValidationResult
  ) => {
    if (validationResult) {
      setFieldValue("phone", validationResult)
      return
    }

    setFieldValue("phone", {
      international: "",
      isValid: false,
      national: "",
      originalNumber: "",
    })
  }

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
        phoneNumber={values.phone}
        optional={optionalPhoneNumber}
        onPhoneNumberValidation={handlePhoneNumberValidation}
        inputProps={{
          maxLength: 25,
          onBlur: handleBlur("phone"),
          placeholder: "(000) 000 0000",
        }}
        error={touched.phone && (errors.phone as string)}
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
