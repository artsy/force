import { Button, Flex } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FC } from "react"
import { graphql } from "react-relay"
import {
  ConfirmationStepFooterQuery,
  ConfirmationStepFooterQuery$data,
} from "__generated__/ConfirmationStepFooterQuery.graphql"
import { useTranslation } from "react-i18next"
import { RouterLink } from "System/Components/RouterLink"
import { NUMBER_OF_ARTWORKS_TO_SHOW } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"

interface ConfirmationStepFooterProps {
  artworksCount: number
  me: ConfirmationStepFooterQuery$data["me"]
  onClose: () => void
}

export const ConfirmationStepFooter: FC<ConfirmationStepFooterProps> = ({
  artworksCount,
  me,
  onClose,
}) => {
  const { t } = useTranslation()
  const savedSearch = me?.alert

  return (
    <Flex flexDirection={["column", "row"]} gap={1}>
      {artworksCount > NUMBER_OF_ARTWORKS_TO_SHOW && (
        <Button
          width="100%"
          // @ts-ignore
          as={RouterLink}
          to={savedSearch?.href}
          onClick={() => {
            onClose()
          }}
          data-testid="seeAllMatchingWorksButton"
        >
          {t("createAlertModal.confirmationStep.seeAllMatchingWorks")}
        </Button>
      )}

      <Button
        width="100%"
        variant="secondaryBlack"
        // @ts-ignore
        as={RouterLink}
        to={"/favorites/alerts"}
        onClick={() => {
          onClose()
        }}
        data-testid="manageYourAlertsButton"
      >
        {t("createAlertModal.confirmationStep.manageYourAlerts")}
      </Button>
    </Flex>
  )
}

interface ConfirmationStepFooterQueryRendererProps {
  artworksCount: number
  alertID: string
  onClose: () => void
}

export const ConfirmationStepFooterQueryRenderer: FC<ConfirmationStepFooterQueryRendererProps> = props => {
  return (
    <SystemQueryRenderer<ConfirmationStepFooterQuery>
      placeholder={<ConfirmationStepFooterContentPlaceholder />}
      // Temporary workaround internalID is requested because there is a bug in Metaphysics. If a user's field is not requested, the
      // query returns null for savedSearch.
      query={graphql`
        query ConfirmationStepFooterQuery($alertID: String!) {
          me {
            internalID
            alert(id: $alertID) {
              href
            }
          }
        }
      `}
      variables={{
        alertID: props.alertID,
      }}
      render={({ props: relayProps, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!relayProps?.me?.alert) {
          return <ConfirmationStepFooterContentPlaceholder />
        }

        return <ConfirmationStepFooter me={relayProps.me} {...props} />
      }}
    />
  )
}

export const ConfirmationStepFooterContentPlaceholder: FC = () => {
  const { t } = useTranslation()

  return (
    <Flex flexDirection={["column", "row"]} gap={1}>
      <Button width="100%" disabled>
        {t("createAlertModal.confirmationStep.seeAllMatchingWorks")}
      </Button>

      <Button width="100%" variant="secondaryBlack" disabled>
        {t("createAlertModal.confirmationStep.manageYourAlerts")}
      </Button>
    </Flex>
  )
}
