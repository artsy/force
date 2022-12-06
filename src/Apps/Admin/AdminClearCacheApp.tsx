import { Button, Spacer, Text, useToasts } from "@artsy/palette"
import { FC } from "react"
import { MetaTags } from "Components/MetaTags"
import { useMode } from "Utils/Hooks/useMode"

export const AdminClearCacheApp: FC = () => {
  const { sendToast } = useToasts()

  const [mode, setMode] = useMode<"Pending" | "Loading" | "Error">("Pending")

  const handleClick = async () => {
    setMode("Loading")

    try {
      const response = await fetch("/admin/clear-cache", { method: "POST" })
      const data = await response.json()

      if (!response.ok) {
        throw Error(data.message ?? response.statusText)
      }

      sendToast({
        variant: "success",
        message: data.message,
      })

      setMode("Pending")
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: err.message ?? "Something went wrong.",
      })

      setMode("Error")
    }
  }

  return (
    <>
      <MetaTags title="Clear Cache | Artsy" />

      <Spacer y={4} />

      <Button onClick={handleClick} loading={mode === "Loading"}>
        Clear Force cache
      </Button>

      <Text variant="xs" mt={2}>
        Please keep in mind this could make the site slower and is best to avoid
        doing during high traffic times.
      </Text>
    </>
  )
}
