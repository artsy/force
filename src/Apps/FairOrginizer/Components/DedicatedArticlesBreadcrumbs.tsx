import { TopContextBar } from "Components/TopContextBar"
import type { DedicatedArticlesBreadcrumbs_fairOrganizer$data } from "__generated__/DedicatedArticlesBreadcrumbs_fairOrganizer.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface DedicatedArticlesBreadcrumbsProps {
  fairOrganizer: DedicatedArticlesBreadcrumbs_fairOrganizer$data
}

export const DedicatedArticlesBreadcrumbs: React.FC<
  React.PropsWithChildren<DedicatedArticlesBreadcrumbsProps>
> = ({ fairOrganizer }) => {
  const { name, slug, profile } = fairOrganizer

  return (
    <TopContextBar
      displayBackArrow
      href={`/fair-organizer/${slug}`}
      src={profile?.image?.url}
    >
      Explore {name} on Artsy
    </TopContextBar>
  )
}

export const DedicatedArticlesBreadcrumbsFragmentContainer =
  createFragmentContainer(DedicatedArticlesBreadcrumbs, {
    fairOrganizer: graphql`
      fragment DedicatedArticlesBreadcrumbs_fairOrganizer on FairOrganizer {
        slug
        name
        profile {
          image {
            url
          }
        }
      }
    `,
  })
