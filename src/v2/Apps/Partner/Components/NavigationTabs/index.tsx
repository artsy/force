import { breakpoints, DROP_SHADOW } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { FullBleed } from "v2/Components/FullBleed"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { BaseContainer, StickyContainer } from "v2/Components/StickyContainer"
import { NavigationTabs_partner } from "v2/__generated__/NavigationTabs_partner.graphql"

interface NavigationTabsProps {
  partner: NavigationTabs_partner
}

export const Container = styled(BaseContainer)`
  ${({ stuck }) =>
    stuck
      ? css`
          & > div {
            box-shadow: ${DROP_SHADOW};
          }
        `
      : css`
          & > div {
            box-shadow: none;
          }
        `};
`

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ partner }) => {
  const renderTabs = () => {
    const { slug, locations, articles } = partner

    const route = (path?: string) => `/partner2/${slug}${path ? path : ""}`

    const routes = [
      {
        name: "Overview",
        href: route(),
        exact: true,
      },
      {
        name: "Shows",
        href: route("/shows"),
        exact: true,
      },
      {
        name: "Works",
        href: route("/works"),
        exact: true,
      },
      {
        name: "Artists",
        href: route("/artists"),
        exact: true,
      },
      {
        name: "Articles",
        href: route("/articles"),
        exact: true,
        hidden: !articles || !articles.totalCount,
      },
      {
        name: "Contact",
        href: route("/contact"),
        exact: true,
        hidden: !locations || !locations.totalCount,
      },
    ]

    return routes
      .filter(route => !route.hidden)
      .map(route => (
        <RouteTab to={route.href} exact={route.exact} key={route.href}>
          {route.name}
        </RouteTab>
      ))
  }

  return (
    <StickyContainer ContainerComponent={Container}>
      <FullBleed id="jumpto-PartnerNavBar" py={2}>
        <HorizontalPadding maxWidth={breakpoints.xl}>
          <RouteTabs fill>{renderTabs()}</RouteTabs>
        </HorizontalPadding>
      </FullBleed>
    </StickyContainer>
  )
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  NavigationTabs,
  {
    partner: graphql`
      fragment NavigationTabs_partner on Partner {
        slug
        locations: locationsConnection(first: 20) {
          totalCount
        }
        articles: articlesConnection(first: 20) {
          totalCount
        }
      }
    `,
  }
)
