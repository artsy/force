import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Breadcrumbs, Text, Image, Flex, ArrowLeftIcon } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { DedicatedArticlesBreadcrumbs_fairOrganizer } from "v2/__generated__/DedicatedArticlesBreadcrumbs_fairOrganizer.graphql"

interface DedicatedArticlesBreadcrumbsProps {
  fairOrganizer: DedicatedArticlesBreadcrumbs_fairOrganizer
}

export const DedicatedArticlesBreadcrumbs: React.FC<DedicatedArticlesBreadcrumbsProps> = ({
  fairOrganizer,
}) => {
  const { name, slug, fairsConnection } = fairOrganizer
  const fair = extractNodes(fairsConnection)[0]
  const { image } = fair

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
          <Image width={30} height={30} src={image?.resized?.url!} mx={1} />
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
        fairsConnection(first: 1) {
          edges {
            node {
              image {
                resized(width: 30, height: 30, version: "square") {
                  url
                }
              }
            }
          }
        }
      }
    `,
  }
)
