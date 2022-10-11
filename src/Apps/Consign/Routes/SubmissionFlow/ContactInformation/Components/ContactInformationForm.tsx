import { Box, BoxProps, Input } from "@artsy/palette"
import { getPhoneNumberInformation } from "Apps/Consign/Routes/SubmissionFlow/Utils/phoneNumberUtils"
import { useFormikContext } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System"
import { ContactInformationForm_me$data } from "__generated__/ContactInformationForm_me.graphql"
import { PhoneNumber, PhoneNumberInput } from "./PhoneNumberInput"
export interface ContactInformationFormModel {
  name: string
  email: string
  phone: PhoneNumber & { international?: string }
}

export interface ContactInformationFormProps extends BoxProps {
  me: ContactInformationForm_me$data
}

export const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  me,
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
  const { relayEnvironment } = useSystemContext()

  const handlePhoneNumberChange = async (region, number) => {
    if (region && number && relayEnvironment) {
      const phoneInformation = await getPhoneNumberInformation(
        number,
        relayEnvironment,
        region
      )
      setFieldValue("phone", phoneInformation)
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
        onChange={handlePhoneNumberChange}
        inputProps={{
          maxLength: 256,
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
