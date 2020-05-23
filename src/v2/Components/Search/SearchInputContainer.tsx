import { Box, color, MagnifyingGlassIcon } from "@artsy/palette"
import Input from "v2/Components/Input"
import { isEmpty } from "lodash"
import React from "react"
import styled from "styled-components"

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: calc(50% + 3px);
  border: none;
  margin-top: -14px;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background: none;
  padding: 0;

  :focus {
    background: ${color("purple100")};
    border-radius: 50%;

    svg > path {
      fill: ${color("white100")};
    }
  }
`

export const SearchInputContainer: React.ForwardRefExoticComponent<any> = React.forwardRef(
  (props, ref) => {
    return (
      <Box style={{ position: "relative" }}>
        <Input ref={ref} style={{ width: "100%" }} {...props} />
        <SearchButton
          onClick={event => {
            ; (event.target as HTMLElement).parentElement.blur()
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
