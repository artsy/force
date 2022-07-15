import {
  LabeledInput,
  MagnifyingGlassIcon,
  Flex,
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
    setKeyword(e.target.value)
  }

  return (
    <Flex height={"60vh"}>
      <Flex justifyContent={"center"} style={{ width: "100%" }}>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text variant="xxl">
            Find art you{" "}
            <span style={{ textDecoration: "underline" }}>love</span>
          </Text>
          <Spacer mt={[1, 2]} />
          <LabeledInput
            placeholder="Enter a search term"
            type="text"
            onChange={handleSetKeyword}
            width={"500px"}
            onKeyDown={event => {
              if (event.key === "Enter") {
                if (isEmpty(keyword)) {
                  event.preventDefault()
                }

                window.location.href = `/search?term=${keyword}`
              }
            }}
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
          <Spacer mt={[1, 2]} />
          <Flex flexDirection={"row"} alignItems={"center"}>
            <Text variant={"md"}>Trending artists:</Text>
            <Spacer mx={1} />
            <Pill
              variant="search"
              as={RouterLink}
              // @ts-ignore
              to={"/search?term=Charline%20Tyberghein"}
              my={0.5}
              mr={1}
            >
              Charline Tyberghein
            </Pill>
            <Pill
              variant="search"
              as={RouterLink}
              // @ts-ignore
              to={"/search?term=Anthony%20Olubunmi%20Akinbola"}
              my={0.5}
              mr={1}
            >
              Anthony Olubunmi Akinbola
            </Pill>
            <Pill
              variant="search"
              as={RouterLink}
              // @ts-ignore
              to={"search?term=Liz%20Collins"}
              my={0.5}
              mr={1}
            >
              Liz Collins
            </Pill>
            <Pill
              variant="search"
              as={RouterLink}
              // @ts-ignore
              to={"/search?term=June%20Edmonds"}
              my={0.5}
              mr={1}
            >
              June Edmonds
            </Pill>
            <Pill
              variant="search"
              as={RouterLink}
              // @ts-ignore
              to={"/search?term=Sophie%20Vallance%20Cantor"}
              my={0.5}
              mr={1}
            >
              Sophie Vallance Cantor
            </Pill>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
