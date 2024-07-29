import {
  Box,
  Button,
  Flex,
  Separator,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { FC, useState } from "react"
import { MetaTags } from "Components/MetaTags"
import { useMode } from "Utils/Hooks/useMode"

export const AdminCacheManagementRoute: FC = () => {
  const { sendToast } = useToasts()

  const [mode, setMode] = useMode<"Pending" | "Loading" | "Error">("Pending")

  const [cacheKeys, setCacheKeys] = useState<string[]>([])

  const handleClearCacheClick = async () => {
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

  const handleLoadAllCacheKeys = async () => {
    setMode("Loading")

    try {
      const response = await fetch("/admin/cache-keys", { method: "GET" })
      const data = await response.json()

      if (!response.ok) {
        throw Error(data.message ?? response.statusText)
      }

      setCacheKeys(data)

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

  console.log(cacheKeys)

  return (
    <>
      <MetaTags title="Cache Manaagement | Artsy" />

      <Spacer y={4} />

      <Button onClick={handleClearCacheClick} loading={mode === "Loading"}>
        Clear Force cache
      </Button>

      <Text variant="xs" mt={2}>
        Please keep in mind this could make the site slower and is best to avoid
        doing during high traffic times.
      </Text>

      <Spacer y={2} />

      <Button onClick={handleLoadAllCacheKeys} loading={mode === "Loading"}>
        Load all cache keys to manage
      </Button>

      {cacheKeys.keys.length && (
        <Box
          height={400}
          overflowY="scroll"
          width="100%"
          my={2}
          p={2}
          border="1px solid"
          borderColor="black30"
        >
          {cacheKeys.keys.map((key, index) => {
            return (
              <Flex
                key={index}
                py={2}
                borderBottom="1px solid"
                borderColor="black30"
                alignItems="center"
              >
                <Box width="80%">
                  <Text variant="xs">QueryName</Text>
                  <Text>{key.queryId}</Text>

                  <Spacer y={1} />

                  <Text variant="xs">Cache Key</Text>
                  <Text>{JSON.stringify(key)}</Text>
                </Box>
                <Box width="20%">
                  <Button
                    size="small"
                    variant="secondaryBlack"
                    loading={mode === "Loading"}
                  >
                    Delete Cache Key
                  </Button>
                </Box>
              </Flex>
            )
          })}
        </Box>
      )}
    </>
  )
}
