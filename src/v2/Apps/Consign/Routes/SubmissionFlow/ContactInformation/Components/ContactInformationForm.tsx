import { Box, BoxProps, Input } from "@artsy/palette"
import { useFormikContext } from "formik"

export interface ContactInformationFormModel {
  name: string
  email: string
  phone: string
}

export interface ContactInformationFormProps extends BoxProps {}

export const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  ...rest
}) => {
  const { values, handleChange, handleBlur } = useFormikContext<
    ContactInformationFormModel
  >()

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
        onChange={e => {
          e.target.value = e.target.value.trim()
          handleChange(e)
        }}
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
