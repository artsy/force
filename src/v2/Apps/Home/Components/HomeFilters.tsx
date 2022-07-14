import {
  LabeledInput,
  MagnifyingGlassIcon,
  Flex,
  Box,
  Text,
  Spacer,
  Clickable,
  Pill,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { isEmpty } from "lodash"
import { useState } from "react"
import { RouterLink } from "v2/System/Router/RouterLink"

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
      fill: ${themeGet("colors.white100")};
    }
  }
`

export const HomeFilters: React.FC = ({}) => {
  const [keyword, setKeyword] = useState()

  const handleSetKeyword = e => {
    // console.log("Debug", e)
    setKeyword(e.target.value)
  }

  return (
    <Box style={{ width: "100%" }}>
      <Flex flexDirection={"column"} justifyContent={"center"}>
        <Text variant="xl">Find art you love</Text>
        <Spacer mt={[1, 2]} />
        <LabeledInput
          placeholder="Enter a search term"
          type="text"
          onChange={handleSetKeyword}
          label={
            <SearchButton
              type="submit"
              onClick={event => {
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                ;(event.target as HTMLElement).parentElement.blur()

                if (isEmpty(keyword)) {
                  event.preventDefault()
                }

                window.location.href = `/search?term=${keyword}`
              }}
            >
              <MagnifyingGlassIcon />
            </SearchButton>
          }
        />
        <Spacer mt={[1, 2]}>
          <Pill
            variant="search"
            as={RouterLink}
            // @ts-ignore
            to={"/search?term=Andy%20Warhol"}
            my={0.5}
            mr={1}
          >
            Andy Warhol
          </Pill>
          <Pill
            variant="search"
            as={RouterLink}
            // @ts-ignore
            to={"/search?term=Blue%20rug"}
            my={0.5}
            mr={1}
          >
            Blue rug
          </Pill>
          <Pill
            variant="search"
            as={RouterLink}
            // @ts-ignore
            to={"search?term=Berlin"}
            my={0.5}
            mr={1}
          >
            Berlin
          </Pill>
          <Pill
            variant="search"
            as={RouterLink}
            // @ts-ignore
            to={"/search?term=Contemporary"}
            my={0.5}
            mr={1}
          >
            Contemporary
          </Pill>
          <Pill
            variant="search"
            as={RouterLink}
            // @ts-ignore
            to={"/gene/finds-under-1000"}
            my={0.5}
            mr={1}
          >
            Works under $1000
          </Pill>
        </Spacer>
      </Flex>
    </Box>
  )
}
