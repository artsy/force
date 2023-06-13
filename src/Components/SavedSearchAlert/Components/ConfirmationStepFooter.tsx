import { Button, Flex, SkeletonBox } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { graphql } from "react-relay"
import {
  ConfirmationStepFooterQuery,
  ConfirmationStepFooterQuery$data,
} from "__generated__/ConfirmationStepFooterQuery.graphql"
import { RouterLink } from "System/Router/RouterLink"

interface ConfirmationStepFooterProps {
  me: ConfirmationStepFooterQuery$data["me"]
}

const ConfirmationStepFooter: FC<ConfirmationStepFooterProps> = ({ me }) => {
  const savedSearch = me?.savedSearch

  return (
    <Flex flexDirection="row">
      <Button
        width="100%"
        mr={1}
        // @ts-ignore
        as={RouterLink}
        to={savedSearch?.href!}
      >
        See all matching works
      </Button>

      <Button
        width="100%"
        ml={1}
        variant="secondaryBlack"
        // @ts-ignore
        as={RouterLink}
        to="/settings/alerts"
      >
        Manage your alerts
      </Button>
    </Flex>
  )
}

interface ConfirmationStepFooterQueryRendererProps {
  searchCriteriaId: string
}

export const ConfirmationStepFooterQueryRenderer: FC<ConfirmationStepFooterQueryRendererProps> = props => {
  return (
    <SystemQueryRenderer<ConfirmationStepFooterQuery>
      placeholder={<ContentPlaceholder />}
      query={graphql`
        query ConfirmationStepFooterQuery($searchCriteriaId: ID!) {
          me {
            email
            savedSearch(id: $searchCriteriaId) {
              href
            }
          }
        }
      `}
      variables={{
        searchCriteriaId: props.searchCriteriaId,
      }}
      render={({ props: relayProps, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!relayProps?.me?.savedSearch) {
          console.log("[Debug] ???", relayProps?.me, props.searchCriteriaId)
          return <ContentPlaceholder />
        }

        return <ConfirmationStepFooter me={relayProps.me} {...props} />
      }}
    />
  )
}

const ContentPlaceholder: FC = () => {
  return (
    <Flex flexDirection="row">
      <SkeletonBox height={50} width="100%" mr={1} />
      <SkeletonBox height={50} width="100%" mr={1} />
    </Flex>
  )
}
