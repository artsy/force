import {
  Box,
  color,
  Flex,
  Sans,
  sharedTabsStyles,
  space,
  TabsContainer,
} from "@artsy/palette"
import { ArrowButton, Carousel } from "v2/Components/Carousel"
import { Link, LinkProps } from "found"
import React from "react"
import styled from "styled-components"
import { left, right } from "styled-system"
import { Media } from "v2/Utils/Responsive"

export const RouteTabs = styled(TabsContainer)`
  width: 100%;

  a {
    ${sharedTabsStyles.tabContainer};

    :not(:last-child) {
      margin-right: ${space(3)}px;
    }
    color: ${color("black60")};
    text-decoration: none;

    &.active {
      color: ${color("black100")};
      ${sharedTabsStyles.activeTabContainer};
    }
  }
`

export const RouteTab: React.FC<Omit<LinkProps, "ref">> = ({
  children,
  ...props
}) => {
  return (
    <Link {...props} activeClassName="active">
      <Sans size="3t" weight="medium">
        {children}
      </Sans>
    </Link>
  )
}

export interface TabCarouselProps {
  tabs: Array<React.ReactElement<any>>
}

export const TabCarousel: React.FC<TabCarouselProps> = ({ tabs }) => {
  return (
    <Box width="100%">
      <Media greaterThan="xs">
        <RouteTabs>
          <Carousel
            renderLeftArrow={({ Arrow }) => {
              return (
                <TabArrowWrapper left={0}>
                  <Arrow />
                </TabArrowWrapper>
              )
            }}
            renderRightArrow={({ Arrow }) => {
              return (
                <TabArrowWrapper right={0}>
                  <Arrow />
                </TabArrowWrapper>
              )
            }}
            options={{
              wrapAround: false,
              pageDots: false,
              cellAlign: "left",
              contain: true,
              draggable: false,
              groupCells: true,
            }}
            height="34px"
            arrowPosition={0}
            data={tabs}
            showArrows
            render={tab => tab}
          />
        </RouteTabs>
      </Media>
      <Media at="xs">
        <RouteTabs>
          <Flex pr={2}>{tabs}</Flex>
        </RouteTabs>
      </Media>
    </Box>
  )
}

RouteTabs.displayName = "RouteTabs"
RouteTab.displayName = "RouteTab"

const TabArrowWrapper = styled.div<{
  left?: number
  right?: number
}>`
  height: 34px;
  width: 30px;
  top: -7px;
  z-index: 10;
  position: absolute;
  ${right};
  ${left};

  ${ArrowButton} {
    height: 34px;
    background-color: ${color("white100")};
    opacity: 1;
    box-shadow: 0 -9px 0 0 #fff, 12px 0 15px -4px #fff, -12px 0 15px -4px #fff;

    > svg {
      height: 18px;
    }
  }
`
