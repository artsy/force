import { Button, useToasts } from "@artsy/palette"
import { t } from "i18next"
import { FC, useState } from "react"
import { graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"

// This button can be used for any email campaign that is triggered by a button click.
export const TriggerCampaignButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSystemContext()
  const { sendToast } = useToasts()

  const { submitMutation } = useMutation({
    mutation: graphql`
      mutation TriggerCampaignButtonMutation($input: TriggerCampaignInput!) {
        triggerCampaign(input: $input) {
          clientMutationId
        }
      }
    `,
  })

  const handleClick = async () => {
    try {
      setIsLoading(true)

      await submitMutation({
        variables: {
          input: {
            campaignID: "ART_QUIZ",
          },
        },
      })
      sendToast({
        variant: "success",
        message: t("artQuizPage.results.emailSuccess", { email: user?.email }),
      })

      setIsLoading(false)
    } catch (error) {
      sendToast({
        variant: "error",
        message: t("common.errors.somethingWentWrong"),
      })

      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="secondaryBlack"
      size={["small", "large"]}
      onClick={handleClick}
      loading={isLoading}
    >
      {t("artQuizPage.results.emailButton")}
    </Button>
  )
}
