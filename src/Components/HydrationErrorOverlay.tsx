import {
  Box,
  Button,
  Expandable,
  Flex,
  Message,
  ModalDialog,
  Stack,
} from "@artsy/palette"
import { useEffect, useState } from "react"

const HYDRATION_ERROR_EVENT = "artsy:hydration-error"

interface HydrationErrorDetail {
  message: string
  componentStack?: string
}

export const dispatchHydrationError = (
  error: unknown,
  componentStack?: string,
): void => {
  const errorMessage = error instanceof Error ? error.message : String(error)
  const event = new CustomEvent<HydrationErrorDetail>(HYDRATION_ERROR_EVENT, {
    detail: { message: errorMessage, componentStack },
  })
  window.dispatchEvent(event)
}

export const HydrationErrorOverlay: React.FC = () => {
  const [errors, setErrors] = useState<HydrationErrorDetail[]>([])
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleError = (event: Event) => {
      const detail = (event as CustomEvent<HydrationErrorDetail>).detail
      setErrors(prev => [...prev, detail])
      setDismissed(false)
    }

    window.addEventListener(HYDRATION_ERROR_EVENT, handleError)
    return () => window.removeEventListener(HYDRATION_ERROR_EVENT, handleError)
  }, [])

  if (dismissed || errors.length === 0) return null

  const latestError = errors[errors.length - 1]
  const extraCount = errors.length - 1

  return (
    <ModalDialog
      title="Hydration Mismatch"
      dialogProps={{ width: ["100%", 800] }}
      onClose={() => setDismissed(true)}
      footer={
        <Flex gap={1} justifyContent="flex-end">
          <Button variant="secondaryBlack" onClick={() => setDismissed(true)}>
            Dismiss
          </Button>

          <Button
            variant="primaryBlack"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Flex>
      }
    >
      <Stack gap={1}>
        <Message variant="error">{latestError.message}</Message>

        {extraCount > 0 && (
          <Message variant="info">
            +{extraCount} more hydration error{extraCount !== 1 ? "s" : ""} —
            check the browser console for full details.
          </Message>
        )}

        {latestError.componentStack && (
          <div>
            <Expandable label="Stack Trace">
              <Box
                as="pre"
                borderLeft="2px solid"
                borderColor="mono10"
                m={0}
                pl={2}
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowX: "auto",
                }}
              >
                {latestError.componentStack.split("\n").map((l, index) => {
                  const line = l.trim()
                  if (line === "") return null
                  return <div key={index}>{line}</div>
                })}
              </Box>
            </Expandable>
          </div>
        )}
      </Stack>
    </ModalDialog>
  )
}
