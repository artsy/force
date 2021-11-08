import { Box, BoxProps, Input } from "@artsy/palette"
import { useFormikContext } from "formik"
import { useEffect } from "react"
import { useRouter } from "v2/System/Router/useRouter"
import { ContactInformation_me } from "v2/__generated__/ContactInformation_me.graphql"
import { useSubmission } from "../../Utils/useSubmission"

export interface ContactInformationFormModel {
  name: string
  email: string
  phone: string
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
    resetForm,
    validateForm,
  } = useFormikContext<ContactInformationFormModel>()

  const {
    match: {
      params: { id },
    },
  } = useRouter()
  const { submission } = useSubmission(id)

  useEffect(() => {
    if (submission) {
      resetForm({ values: submission.contactInformationForm })
      validateForm(submission.contactInformationForm)
    }
  }, [submission])

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
      <Input
        mt={4}
        max={256}
        name="phone"
        title="phone number"
        placeholder="Your Phone number"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Box>
  )
}
