import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Breadcrumbs, Text, Image, Flex, ArrowLeftIcon } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { DedicatedArticlesBreadcrumbs_fairOrganizer$data } from "v2/__generated__/DedicatedArticlesBreadcrumbs_fairOrganizer.graphql"

interface DedicatedArticlesBreadcrumbsProps {
  fairOrganizer: DedicatedArticlesBreadcrumbs_fairOrganizer$data
}

export const DedicatedArticlesBreadcrumbs: React.FC<DedicatedArticlesBreadcrumbsProps> = ({
  fairOrganizer,
}) => {
  const { name, slug, profile } = fairOrganizer

  return (
    <Breadcrumbs
      borderBottom="solid"
      borderBottomColor="black10"
      borderBottomWidth={1}
      py={1}
    >
      <RouterLink to={`/fair-organizer/${slug}`}>
        <Flex alignItems="center">
          <ArrowLeftIcon />
          <Image
            width={30}
            height={30}
            src={profile?.image?.resized?.src!}
            srcSet={profile?.image?.resized?.srcSet!}
            mx={1}
          />
          <Text variant="xs">Explore {name} on Artsy</Text>
        </Flex>
      </RouterLink>
    </Breadcrumbs>
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
