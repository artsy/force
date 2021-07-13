import {
  Box,
  BorderBox,
  Text,
  Join,
  Flex,
  Select,
  GridColumns,
  Column,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { graphql } from "lib/graphql"
import { uniqBy } from "lodash"
import React from "react"
import { createFragmentContainer } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useRouter } from "v2/System/Router/useRouter"
import { ShowsHeader_viewer } from "v2/__generated__/ShowsHeader_viewer.graphql"

interface ShowsHeaderProps {
  viewer: ShowsHeader_viewer
}

const DEFAULT_CITIES = [
  { text: "All", value: "" },
  // { text: "Online Exclusive", value: "online" }, // TODO
]

export const ShowsHeader: React.FC<ShowsHeaderProps> = ({
  viewer: { featuredCities, allCities },
}) => {
  const { router } = useRouter()

  const handleSelect = (value: string) => {
    router.push(`/shows2/${value}`)
  }

  const options = uniqBy([...DEFAULT_CITIES, ...allCities], city => city.value)

  return (
    <BorderBox p={0}>
      <GridColumns width="100%">
        <Column span={10} display={["none", "block"]}>
          <Overlay>
            <Viewport px={2}>
              <Rail mr={2}>
                <Join separator={<Box mx={1} />}>
                  {[...DEFAULT_CITIES, ...featuredCities].map((city, i) => {
                    return (
                      <City
                        key={city.value}
                        to={`/shows2/${city.value}`}
                        textDecoration="none"
                        exact
                        activeClassName="active"
                      >
                        <Text variant="md">{city.text}</Text>
                      </City>
                    )
                  })}
                </Join>
              </Rail>
            </Viewport>
          </Overlay>
        </Column>

        <Column span={2} p={1} pl={[1, 0]}>
          <Select width="100%" options={options} onSelect={handleSelect} />
        </Column>
      </GridColumns>
    </BorderBox>
  )
}

export const ShowsHeaderFragmentContainer = createFragmentContainer(
  ShowsHeader,
  {
    viewer: graphql`
      fragment ShowsHeader_viewer on Viewer {
        allCities: cities {
          text: name
          value: slug
        }
        featuredCities: cities(featured: true) {
          text: name
          value: slug
        }
      }
    `,
  }
)

const City = styled(RouterLink)`
  &.active {
    color: ${themeGet("colors.brand")};
  }
`

// TODO: Extract this pattern
const Overlay = styled(Box)`
  position: relative;
  height: 100%;

  /* Fade-out gradient */
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 60px;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    /* TODO: Hide when scrolled all the way over */
    /* transition: opacity 250ms; */
  }
`

const Viewport = styled(Flex)`
  overflow-x: auto;
  height: 100%;
  align-items: center;
`

const Rail = styled(Box)`
  display: flex;
  white-space: nowrap;
`
