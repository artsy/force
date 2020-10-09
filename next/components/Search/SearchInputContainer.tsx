import { Box, Input, MagnifyingGlassIcon, color, space } from "@artsy/palette"
import { isEmpty } from "lodash"
import React from "react"
import styled from "styled-components"

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background: none;
  padding: 0;

  &:focus {
    background: ${color("purple100")};
    border-radius: 50%;
    outline: none;

    svg > path {
      fill: ${color("white100")};
    }
  }
`

const SearchInput = styled(Input)`
  width: 100%;
  padding-right: ${space(4)}px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const SearchInputContainer: React.ForwardRefExoticComponent<any> = React.forwardRef(
  (props, ref) => {
    return (
      <Box position="relative">
        <SearchInput ref={ref} {...props} />

        <SearchButton
          onClick={event => {
            ;(event.target as HTMLElement).parentElement.blur()
            if (isEmpty(props.value)) {
              event.preventDefault()
            }
          }}
        >
          <MagnifyingGlassIcon />
        </SearchButton>
      </Box>
    )
  }
)
