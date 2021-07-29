import React from "react"
import { Text } from "@artsy/palette"
import { Timer } from "v2/Components/Timer"

export const FairOrganizerTiming: React.FC<any> = ({ fairOrganizer }) => {
  const { status, startAt, endAt, period } = fairOrganizer

  const TimingInfo = () => {
    switch (status) {
      case "upcoming": {
        return <Timer size="lg" label="Opens in:" endDate={startAt} />
      }
      case "live": {
        return <Timer size="lg" label="Closes in:" endDate={endAt} />
      }
      default: {
        return null
      }
    }
  }

  return (
    <>
      <Text variant="xl" color="black60" mb={1}>
        {period}
      </Text>

      <TimingInfo />
    </>
  )
}
