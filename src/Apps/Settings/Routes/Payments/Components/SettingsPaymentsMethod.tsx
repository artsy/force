import { Clickable, Flex, Text, useToasts } from "@artsy/palette"
import { useMode } from "Utils/Hooks/useMode"

interface SettingsPaymentsMethodProps {
  onDelete: () => Promise<void>
  successDeleteMessage: string
}

type Mode = "Pending" | "Deleting"

export const SettingsPaymentsMethod: React.FC<SettingsPaymentsMethodProps> = ({
  children,
  successDeleteMessage,
  onDelete,
}) => {
  const [mode, setMode] = useMode<Mode>("Pending")

  const { sendToast } = useToasts()

  const handleClick = async () => {
    setMode("Deleting")

    try {
      await onDelete()

      sendToast({
        variant: "success",
        message: successDeleteMessage,
      })
    } catch (err) {
      setMode("Pending")

      console.error(err)

      const error = Array.isArray(err) ? err[0] : err

      sendToast({
        variant: "error",
        message: "Something went wrong.",
        description: error.message,
      })
    }
  }

  return (
    <Flex p={2} justifyContent="space-between" alignItems="center">
      <Flex alignItems="center">{children}</Flex>

      <Clickable onClick={handleClick} disabled={mode === "Deleting"}>
        <Text variant="sm-display" color="red100">
          {mode === "Deleting" ? "Removing" : "Remove"}
        </Text>
      </Clickable>
    </Flex>
  )
}
