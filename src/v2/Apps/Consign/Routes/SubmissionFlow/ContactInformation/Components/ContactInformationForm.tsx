import { Box, BoxProps, Input } from "@artsy/palette"
import { useFormikContext } from "formik"
import { useEffect } from "react"
import { useRouter } from "v2/System/Router/useRouter"
import { ContactInformation_me } from "v2/__generated__/ContactInformation_me.graphql"
import { useSubmission } from "../../Utils/useSubmission"
import { getPhoneNumberInformation } from "../../Utils/phoneNumberUtils"
import { useSystemContext } from "v2/System"
import { PhoneNumber, PhoneNumberInput } from "./PhoneNumberInput"

export interface ContactInformationFormModel {
  name: string
  email: string
  phone: PhoneNumber & { international?: string }
}

export interface ContactInformationFormProps extends BoxProps {
  me: ContactInformation_me
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
    resetForm,
    validateForm,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext<ContactInformationFormModel>()
  const { relayEnvironment } = useSystemContext()

  const {
    match: {
      params: { id },
    },
  } = useRouter()
  const { submission } = useSubmission(id)

  useEffect(() => {
    if (submission) {
      resetForm({ values: submission.contactInformationForm })
      setFieldTouched("phone", false)
      validateForm(submission.contactInformationForm)
    }
  }, [submission])

  const handlePhoneNumberChange = async (region, number) => {
    if (region && number && relayEnvironment) {
      const phoneInformation = await getPhoneNumberInformation(
        number,
        relayEnvironment,
        region
      )

      setFieldValue("phone", phoneInformation)
    }
  }

  return (
    <Box {...rest}>
      <Input
        max={256}
        name="name"
        title="name"
        placeholder="Your Full Name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        mt={4}
        max={256}
        name="email"
        title="email"
        placeholder="Your Email Address"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <PhoneNumberInput
        mt={4}
        phoneNumber={values.phone}
        onChange={handlePhoneNumberChange}
        inputProps={{
          onBlur: handleBlur("phone"),
          placeholder: "(000) 000 0000",
        }}
        error={touched.phone && (errors.phone as string)}
      />
    </Box>
  )
}
