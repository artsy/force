import SearchIcon from "@artsy/icons/SearchIcon"
import { Clickable, LabeledInput, type LabeledInputProps } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { isEmpty } from "lodash"
import * as React from "react"
import styled from "styled-components"

const SearchButton = styled(Clickable)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:focus {
    outline: none;

    svg > path {
      fill: ${themeGet("colors.mono0")};
    }
  }
`

export const NavBarSearchInputContainer = React.forwardRef(
  (
    props: Omit<LabeledInputProps, "label"> & {
      ref?: React.Ref<HTMLInputElement>
    },
    ref,
  ) => {
    return (
      <LabeledInput
        ref={ref as any}
        width="100%"
        height={40}
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
            <SearchIcon fill="mono60" width={[22, 18]} height={[22, 18]} />
          </SearchButton>
        }
        {...props}
      />
    )
  },
)
