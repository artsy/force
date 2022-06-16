import {
  Clickable,
  CloseCircleIcon,
  InputProps,
  LabeledInput,
  MagnifyingGlassIcon,
} from "@artsy/palette"
import { useRef, useState } from "react"
import * as React from "react"

export type FilterInputProps = InputProps

export const FilterInput: React.FC<InputProps> = ({
  onChange,
  value = "",
  ...rest
}) => {
  const ref = useRef<HTMLInputElement | null>(null)

  const [controlledValue, setValue] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setValue(value)
    onChange && onChange(event)
  }

  const handleClick = () => {
    setValue("")

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    ref.current.focus()

    // HACK: simulate an onChange event
    onChange && onChange({ target: { value: "" } } as any)
  }

  return (
    <LabeledInput
      ref={ref}
      role="search"
      label={
        controlledValue !== "" ? (
          // Active state
          <Clickable
            display="flex"
            onClick={handleClick}
            aria-label="Clear search input"
          >
            <CloseCircleIcon />
          </Clickable>
        ) : (
          // Resting state
          <MagnifyingGlassIcon style={{ pointerEvents: "none" }} />
        )
      }
      onChange={handleChange}
      value={controlledValue}
      {...rest}
    />
  )
}
