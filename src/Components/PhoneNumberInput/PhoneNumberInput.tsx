import {
  Box,
  BoxProps,
  Flex,
  Input,
  InputProps,
  Select,
  SelectProps,
  Text,
} from "@artsy/palette"
import { useEffect, useState } from "react"
import { useSystemContext } from "System"
import { getPhoneNumberInformation } from "./getPhoneNumberInformation"
import { countries } from "Utils/countries"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"

export interface PhoneNumber {
  isValid: boolean
  national?: string
  regionCode?: string
}

export interface PhoneNumberValidationResult {
  international: string
  isValid: boolean
  national: string
  originalNumber: string
  region: string
}

export interface PhoneNumberInputProps extends BoxProps {
  phoneNumber: PhoneNumber
  onPhoneNumberValidation: (arg: PhoneNumberValidationResult) => void
  inputProps?: Partial<InputProps>
  optional?: boolean
  selectProps?: Partial<SelectProps>
  error?: string
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phoneNumber: { isValid, national, regionCode },
  onPhoneNumberValidation,
  inputProps,
  optional,
  selectProps,
  error,
  ...props
}) => {
  const { relayEnvironment } = useSystemContext()

  const [number, setNumber] = useState(isValid && national ? national : "")
  const [focus, setFocus] = useState(false)
  const [hover, setHover] = useState(false)
  const [region, setRegion] = useState(
    isValid && regionCode ? regionCode : "us"
  )

  const { debouncedValue } = useDebouncedValue({ value: number, delay: 200 })

  useEffect(() => {
    validatePhoneNumber(number?.trim())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, region])

  useEffect(() => {
    if (isValid && !number && national) {
      setNumber(national)
      regionCode && setRegion(regionCode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [national])

  const handleFocus = <T extends Element>(
    value: boolean,
    handler?: React.FocusEventHandler<T>
  ) => (e: React.FocusEvent<T>) => {
    handler?.(e)
    setFocus(value)
  }

  const handleHover = <T extends Element>(
    value: boolean,
    handler?: React.MouseEventHandler<T>
  ) => (e: React.MouseEvent<T>) => {
    handler?.(e)
    setHover(value)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value)

    // shortest international phone number is 7 digits; > 5 for extra safety
    if (debouncedValue.length > 5) {
      validatePhoneNumber(e.target.value)
    }
  }

  const validatePhoneNumber = async (number: string) => {
    if (relayEnvironment) {
      const phoneInformation = await getPhoneNumberInformation(
        number,
        relayEnvironment,
        region
      )
      onPhoneNumberValidation({
        ...phoneInformation,
        region,
      } as PhoneNumberValidationResult)
    }
  }

  return (
    <Flex flexDirection="column" {...props}>
      <Flex>
        <Text variant="xs" mb={0.5} mr={0.5}>
          Phone number
        </Text>
        {!!optional && (
          <Text variant="xs" color="black60">
            (Optional)
          </Text>
        )}
      </Flex>

      <Flex>
        <Box minWidth={120} maxWidth="35%">
          <Select
            {...(selectProps || {})}
            name="countryCode"
            options={countries}
            selected={region}
            focus={focus}
            hover={hover}
            onSelect={setRegion}
            onBlur={handleFocus(false, selectProps?.onBlur)}
            onFocus={handleFocus(true, selectProps?.onFocus)}
            onMouseOver={handleHover(true, selectProps?.onMouseOver)}
            onMouseOut={handleHover(false, selectProps?.onMouseOut)}
            error={!!error}
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
            value={number}
            focus={focus}
            hover={hover}
            onBlur={handleFocus(false, inputProps?.onBlur)}
            onFocus={handleFocus(true, inputProps?.onFocus)}
            onMouseOver={handleHover(true, inputProps?.onMouseOver)}
            onMouseOut={handleHover(false, inputProps?.onMouseOut)}
            onChange={handleNumberChange}
            style={{
              borderLeft: "none",
            }}
            error={!!error}
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
