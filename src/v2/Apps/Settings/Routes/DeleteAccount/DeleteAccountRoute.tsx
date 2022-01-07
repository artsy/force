import { Button, Checkbox, Separator, Text, TextArea, Toast, useToasts
} from "@artsy/palette"
import * as React from "react"
import { useState } from "react"
import { RouterLink } from "v2/System/Router/RouterLink"
import { deleteMyAccount } from "../../Mutations/DeleteMyAccount"
import { useSystemContext } from "v2/System/SystemContext"

export const DeleteAccountRoute = () => {
  const { relayEnvironment } = useSystemContext()

  const [isConfirmed, setConfirmed] = useState(false)
  const [enteredReason, setEnteredReason] = useState("")
  const isDisabled = !isConfirmed || !enteredReason
  const { sendToast } = useToasts()

  const handleDeleteMyAccount = async () => {
    const url = window.location.href
    try{
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
        description: parsedError.error
        ,
      })
    }
  }

  return (
    <>
        <Text 
          color="black100" 
          variant="lg"
          mb={4}
        >
          Delete My Account
        </Text>
        <Checkbox 
          onSelect={(result) => {
            setConfirmed(result)
          }}  
          selected={isConfirmed}
          mb={4}
        >
          I understand that this will permanently delete my account and cannot be undone.
        </Checkbox>
        <TextArea
          width="50%"
          name="required-text-area"
          title="Please Tell Us Why"
          onChange={(result) => {
            setEnteredReason(result.value)
          }}
          required={true}
          mb={4}
        />
        <Button
          width="50%" 
          size="medium" 
          m={0.5} 
          disabled={isDisabled}
          onClick={() => handleDeleteMyAccount()}
        >
          Submit
        </Button>
        <Separator mt={12} width="50%"/>

        <RouterLink to="edit-settings" textDecoration="none">
          <Text color="black60" mt={4}>
            Cancel
          </Text>
        </RouterLink>
    </>
  )
}