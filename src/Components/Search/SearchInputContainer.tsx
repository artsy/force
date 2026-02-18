import SearchIcon from "@artsy/icons/SearchIcon"
import { Clickable, LabeledInput, type LabeledInputProps } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import isEmpty from "lodash/isEmpty"
import * as React from "react"
import styled from "styled-components"

const SearchButton = styled(Clickable)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:focus {
    background: ${themeGet("colors.purple100")};
    outline: none;

    svg > path {
      fill: ${themeGet("colors.mono0")};
    }
  }
`

export const SearchInputContainer = React.forwardRef(
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
              ;(event.target as HTMLElement)?.parentElement?.blur()

              if (isEmpty(props.value)) {
                event.preventDefault()
              }
            }}
          >
            <SearchIcon height={22} width={22} />
          </SearchButton>
        }
        {...props}
      />
    )
  },
)
