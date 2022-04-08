import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Text, Image, ArrowLeftIcon } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { DedicatedArticlesBreadcrumbs_fairOrganizer } from "v2/__generated__/DedicatedArticlesBreadcrumbs_fairOrganizer.graphql"
import { TopContextBar } from "v2/Components/TopContextBar"

interface DedicatedArticlesBreadcrumbsProps {
  fairOrganizer: DedicatedArticlesBreadcrumbs_fairOrganizer
}

export const DedicatedArticlesBreadcrumbs: React.FC<DedicatedArticlesBreadcrumbsProps> = ({
  fairOrganizer,
}) => {
  const { name, slug, profile } = fairOrganizer

  return (
    <TopContextBar>
      <RouterLink
        to={`/fair-organizer/${slug}`}
        textDecoration="none"
        display="flex"
        alignItems="center"
      >
        <ArrowLeftIcon />

        <Image
          width={30}
          height={30}
          src={profile?.image?.resized?.src!}
          srcSet={profile?.image?.resized?.srcSet!}
          mx={1}
          lazyLoad
        />

        <Text variant="xs">Explore {name} on Artsy</Text>
      </RouterLink>
    </TopContextBar>
  )
}

export const DedicatedArticlesBreadcrumbsFragmentContainer = createFragmentContainer(
  DedicatedArticlesBreadcrumbs,
  {
    fairOrganizer: graphql`
      fragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {
        slug
        name
        profile {
          image {
            resized(width: 30, height: 30, version: "square") {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
