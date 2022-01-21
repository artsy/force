import {
  Button,
  Checkbox,
  Column,
  GridColumns,
  Separator,
  Text,
  TextArea,
  useToasts,
} from "@artsy/palette"
import { FC, useState } from "react"
import { RouterLink } from "v2/System/Router/RouterLink"
import { deleteMyAccount } from "../../Mutations/DeleteMyAccount"
import { useSystemContext } from "v2/System/SystemContext"

export const DeleteAccountRoute: FC = () => {
  const { relayEnvironment } = useSystemContext()
  const { sendToast } = useToasts()

  const [isConfirmed, setConfirmed] = useState(false)
  const [enteredReason, setEnteredReason] = useState("")

  const isDisabled = !isConfirmed || !enteredReason

  const handleDeleteMyAccount = async () => {
    const url = window.location.href

    try {
      await deleteMyAccount(relayEnvironment!, enteredReason, url)

      window.location.href = "/"

      sendToast({
        variant: "success",
        message: "Profile deleted successfully",
      })
    } catch (error) {
      const parsedError = JSON.parse(error.message)

      sendToast({
        variant: "error",
        message: "There was a problem",
        description: parsedError.error,
      })
    }
  }

  return (
    <GridColumns>
      <Column span={8}>
        <Text variant="lg" mb={4}>
          Delete My Account
        </Text>

        <Checkbox onSelect={setConfirmed} selected={isConfirmed}>
          I understand that this will permanently delete my account and cannot
          be undone.
        </Checkbox>

        <TextArea
          mt={2}
          title="Please Tell Us Why"
          onChange={({ value }) => {
            setEnteredReason(value)
          }}
          required
        />

        <Button mt={4} disabled={isDisabled} onClick={handleDeleteMyAccount}>
          Submit
        </Button>

        <Separator my={4} />

        <Text variant="md" color="black60">
          <RouterLink to="edit-settings" textDecoration="none">
            Cancel
          </RouterLink>
        </Text>
      </Column>
    </GridColumns>
  )
}
