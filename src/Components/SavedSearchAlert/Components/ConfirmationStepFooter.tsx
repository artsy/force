import { Button, Flex, SkeletonBox } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { graphql } from "react-relay"
import {
  ConfirmationStepFooterQuery,
  ConfirmationStepFooterQuery$data,
} from "__generated__/ConfirmationStepFooterQuery.graphql"
import { useTranslation } from "react-i18next"
import { useRouter } from "System/Router/useRouter"

interface ConfirmationStepFooterProps {
  me: ConfirmationStepFooterQuery$data["me"]
  onClose: () => void
}

const ConfirmationStepFooter: FC<ConfirmationStepFooterProps> = ({
  me,
  onClose,
}) => {
  const { t } = useTranslation()
  const { router } = useRouter()
  const savedSearch = me?.savedSearch

  const redirect = (to: string) => {
    onClose()
    router.push(to)
  }

  return (
    <Flex flexDirection={["column", "row"]}>
      <Button
        width="100%"
        mr={[0, 1]}
        mb={[1, 0]}
        onClick={() => redirect(savedSearch?.href!)}
      >
        {t("createAlertModal.confirmationStep.seeAllMatchingWorks")}
      </Button>

      <Button
        width="100%"
        ml={[0, 1]}
        variant="secondaryBlack"
        onClick={() => redirect("/settings/alerts")}
      >
        {t("createAlertModal.confirmationStep.manageYourAlerts")}
      </Button>
    </Flex>
  )
}

interface ConfirmationStepFooterQueryRendererProps {
  searchCriteriaId: string
  onClose: () => void
}

export const ConfirmationStepFooterQueryRenderer: FC<ConfirmationStepFooterQueryRendererProps> = props => {
  return (
    <SystemQueryRenderer<ConfirmationStepFooterQuery>
      placeholder={<ContentPlaceholder />}
      // Temporary workaround internalID is requested because there is a bug in Metaphysics. If a user's field is not requested, the
      // query returns null for savedSearch.
      query={graphql`
        query ConfirmationStepFooterQuery($searchCriteriaId: ID!) {
          me {
            internalID
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
          return <ContentPlaceholder />
        }

        return <ConfirmationStepFooter me={relayProps.me} {...props} />
      }}
    />
  )
}

const ContentPlaceholder: FC = () => {
  return (
    <Flex flexDirection={["column", "row"]}>
      <SkeletonBox height={50} width="100%" mr={[0, 1]} />
      <SkeletonBox height={50} width="100%" ml={[0, 1]} />
    </Flex>
  )
}
