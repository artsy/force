import { countries } from "v2/Utils/countries"
import {
  Box,
  BoxProps,
  Flex,
  Input,
  Select,
  InputProps,
  Text,
} from "@artsy/palette"
import { useEffect, useState } from "react"

export interface PhoneNumber {
  isValid: boolean
  national?: string
  regionCode?: string
}

export interface PhoneNumberInputProps extends BoxProps {
  phoneNumber: PhoneNumber
  onChange?: (regionCode: string, number?: string) => void
  inputProps?: InputProps
  error?: string
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phoneNumber: { isValid, national, regionCode },
  onChange,
  inputProps,
  error,
  ...props
}) => {
  const [number, setNumber] = useState(isValid && national ? national : "")
  const [region, setRegion] = useState(
    isValid && regionCode ? regionCode : "us"
  )

  useEffect(() => {
    onChange?.(region, number?.trim())
  }, [number, region])

  useEffect(() => {
    if (isValid && !number && national) {
      setNumber(national)
      regionCode && setRegion(regionCode)
    }
  }, [national])

  return (
    <Flex flexDirection="column" {...props}>
      <Flex justifyContent="space-between">
        <Text variant="xs" mb={0.5} textTransform="uppercase">
          Phone number
        </Text>
      </Flex>

      <Flex>
        <Box minWidth={120} maxWidth="35%">
          <Select
            name="countryCode"
            options={countries}
            selected={region}
            onSelect={setRegion}
            style={{
              borderRight: "none",
              letterSpacing: "1px",
            }}
          />
        </Box>
        <Flex flexDirection="column" width="100%">
          <Box height="100%"></Box>
          <Input
            {...(inputProps || {})}
            name="phone"
            type="tel"
            onChange={e => setNumber(e.target.value)}
            value={number}
            style={{ borderLeft: "none" }}
          />
        </Flex>
      </Flex>

      {error && (
        <Text variant="xs" mt={0.5} color="red100">
          {error}
        </Text>
      )}
    </Flex>
  )
}
