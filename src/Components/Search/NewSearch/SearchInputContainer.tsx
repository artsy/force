import { LabeledInput, Clickable, LabeledInputProps } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { isEmpty } from "lodash"
import * as React from "react"
import styled from "styled-components"
import SearchIcon from "@artsy/icons/SearchIcon"
import { Media } from "Utils/Responsive"

const SearchButton = styled(Clickable)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:focus {
    outline: none;

    svg > path {
      fill: ${themeGet("colors.white100")};
    }
  }
`

export const SearchInputContainer: React.ForwardRefExoticComponent<
  Omit<LabeledInputProps, "label"> & { ref?: React.Ref<HTMLInputElement> }
> = React.forwardRef((props, ref) => {
  return (
    <LabeledInput
      ref={ref}
      width="100%"
      height={props.height ?? 50}
      label={
        <SearchButton
          type="submit"
          onClick={event => {
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            ;(event.target as HTMLElement).parentElement.blur()

            if (isEmpty(props.value)) {
              event.preventDefault()
            }
          }}
        >
          <Media greaterThan="xs">
            <SearchIcon fill={"black60"} width="18px" height="18px" />
          </Media>

          <Media at="xs">
            <SearchIcon fill={"black60"} width="22px" height="22px" />
          </Media>
        </SearchButton>
      }
      {...props}
    />
  )
})
