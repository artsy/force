import { AppDownloadBanner } from "Components/AppDownloadBanner"
import { Input, Stack } from "@artsy/palette"
import { useState } from "react"

export default {
  title: "Components/AppDownloadBanner",
}

export const Default = () => {
  const [transitionDuration, setTransitionDuration] = useState(1000)
  const [idleDuration, setIdleDuration] = useState(3000)

  return (
    <Stack gap={2}>
      <Stack gap={1} flexDirection="row" maxWidth={400}>
        <Input
          title="Transition duration"
          type="number"
          value={transitionDuration}
          onChange={event => {
            setTransitionDuration(parseInt(event.target.value))
          }}
        />

        <Input
          title="Idle duration"
          type="number"
          value={idleDuration}
          onChange={event => {
            setIdleDuration(parseInt(event.target.value))
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
