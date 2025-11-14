import { Button, useToasts } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { type FC, useState } from "react"
import { graphql } from "react-relay"

// This button can be used for any email campaign that is triggered by a button click.
export const TriggerCampaignButton: FC<
  React.PropsWithChildren<unknown>
> = () => {
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
        message: `Results sent to ${user?.email}`,
      })

      setIsLoading(false)
    } catch (error) {
      sendToast({
        variant: "error",
        message: "Something went wrong. Please try again.",
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
      Email My Results
    </Button>
  )
}
