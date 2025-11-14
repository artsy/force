import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { PageHTML } from "Apps/Page/Components/PageHTML"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import type { PressApp_page$data } from "__generated__/PressApp_page.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface PressAppProps {
  page: PressApp_page$data
}

const PressApp: FC<React.PropsWithChildren<PressAppProps>> = ({ page }) => {
  if (!page.content) return null

  const {
    match: { location },
  } = useRouter()

  return (
    <>
      <MetaTags title={`${page.name} | Artsy`} pathname={location.pathname} />

      <Spacer y={4} />

      <Text as="h1" variant="xl">
        Artsy Press
      </Text>

      <Text variant="xl" color="mono60">
        Contact{" "}
        <RouterLink inline to="mailto:press@artsy.net" textDecoration={"none"}>
          press@artsy.net
        </RouterLink>
      </Text>

      <Spacer y={4} />

      <RouteTabs fill>
        <RouteTab to="/press/in-the-media">Artsy in the Media</RouteTab>

        <RouteTab to="/press/press-releases">
          News &amp; Press Releases
        </RouteTab>
      </RouteTabs>

      <Spacer y={4} />

      <GridColumns gridRowGap={4}>
        <Column span={8} start={3}>
          <PageHTML dangerouslySetInnerHTML={{ __html: page.content }} />
        </Column>
      </GridColumns>
    </>
  )
}

export const PressAppFragmentContainer = createFragmentContainer(PressApp, {
  page: graphql`
    fragment PressApp_page on Page {
      internalID
      name
      content(format: HTML)
    }
  `,
})
