import {
  Box,
  BoxProps,
  Flex,
  InputProps,
  Input,
  Select,
  SelectProps,
  Text,
} from "@artsy/palette"
import { countries } from "Utils/countries"

interface PhoneNumberInputProps extends BoxProps {
  title?: string
  required?: boolean
  error?: string | boolean
  /** Props for phoneNumber (national) input */
  inputProps: InputProps
  /** Props for regionCode select */
  selectProps: Omit<SelectProps, "options">
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  title = "Phone number",
  required,
  error,
  inputProps,
  selectProps,
  ...rest
}) => {
  return (
    <Box width="100%" {...rest}>
      <Text variant="xs" mb={0.5}>
        {title}
        {required && (
          <Box as="span" color="brand">
            *
          </Box>
        )}
      </Text>

      <Flex gap={1}>
        <Box minWidth={120} maxWidth="35%">
          <Select
            error={!!error}
            options={countries}
            autoComplete="tel-country-code"
            {...selectProps}
          />
        </Box>

        <Input
          error={!!error}
          maxLength={25}
          width="100%"
          type="tel"
          autoComplete="tel-national"
          {...inputProps}
        />
      </Flex>

      {error && (
        <Text variant="xs" mt={0.5} color="red100">
          {error}
        </Text>
      )}
    </Box>
  )
}
