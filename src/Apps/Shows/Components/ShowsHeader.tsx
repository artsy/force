import {
  Box,
  BorderBox,
  Text,
  Join,
  Select,
  GridColumns,
  Column,
  HorizontalOverflow,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { uniqBy } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { ShowsHeader_viewer$data } from "__generated__/ShowsHeader_viewer.graphql"

interface ShowsHeaderProps {
  viewer: ShowsHeader_viewer$data
}

const DEFAULT_CITIES = [
  { text: "All", value: "" },
  { text: "Online Exclusive", value: "online" },
]

export const ShowsHeader: React.FC<ShowsHeaderProps> = ({
  viewer: { featuredCities, allCities },
}) => {
  const { router } = useRouter()

  const handleSelect = (value: string) => {
    router.push(`/shows/${value}`)
  }

  const options = uniqBy([...DEFAULT_CITIES, ...allCities], city => city.value)

  return (
    <BorderBox p={0}>
      <GridColumns width="100%">
        <Column span={10} display={["none", "block"]}>
          <HorizontalOverflow height="100%" p={2} data-test="cities-rail">
            <Join separator={<Box mx={1} />}>
              {[
                ...DEFAULT_CITIES,
                ...featuredCities,
                { text: "All Cities", value: "all-cities" },
              ].map((city, i) => {
                return (
                  <City
                    key={city.value}
                    to={`/shows/${city.value}`}
                    textDecoration="none"
                    exact
                    activeClassName="active"
                  >
                    <Text variant="sm-display">{city.text}</Text>
                  </City>
                )
              })}
            </Join>
          </HorizontalOverflow>
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
  display: flex;
  align-items: center;

  &.active {
    color: ${themeGet("colors.brand")};
  }
`
