import { countries } from "v2/Utils/countries"
import {
  Box,
  BoxProps,
  Flex,
  Input,
  Select,
  InputProps,
  Text,
  SelectProps,
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
  inputProps?: Partial<InputProps>
  selectProps?: Partial<SelectProps>
  error?: string
}

const errorBorderColor = "#C82400"

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phoneNumber: { isValid, national, regionCode },
  onChange,
  inputProps,
  selectProps,
  error,
  ...props
}) => {
  const [number, setNumber] = useState(isValid && national ? national : "")
  const [focus, setFocus] = useState(false)
  const [hover, setHover] = useState(false)
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
    inputProps?.onChange?.(e)
    setNumber(e.target.value)
  }

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
            style={{
              borderColor: error ? errorBorderColor : "",
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
              borderColor: error ? errorBorderColor : "",
              borderLeft: "none",
            }}
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
