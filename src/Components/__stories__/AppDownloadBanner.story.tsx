import { AppDownloadBanner } from "Components/AppDownloadBanner"
import { Input, Stack } from "@artsy/palette"
import { useState } from "react"

export default {
  title: "Components/AppDownloadBanner",
}

export const Default = () => {
  const [transitionDuration, setTransitionDuration] = useState(1500)
  const [idleDuration, setIdleDuration] = useState(4000)

  return (
    <Stack gap={2}>
      <Stack gap={1} flexDirection="row" maxWidth={400}>
        <Input
          title="Transition duration"
          type="number"
          value={transitionDuration}
          onChange={event => {
            setTransitionDuration(Number.parseInt(event.target.value, 10))
          }}
        />

        <Input
          title="Idle duration"
          type="number"
          value={idleDuration}
          onChange={event => {
            setIdleDuration(Number.parseInt(event.target.value, 10))
          }}
        />
      </Stack>

      <AppDownloadBanner
        transitionDuration={transitionDuration}
        idleDuration={idleDuration}
      />
    </Stack>
  )
}
