import { States } from "storybook-states"
import { DateTime } from "luxon"
import { CountdownTimer, CountdownTimerProps } from "Components/CountdownTimer"

export default {
  title: "Components/CountdownTimer",
}

export const Default = () => (
  <States<Partial<CountdownTimerProps>> states={[{}]}>
    <CountdownTimer
      action="Submit new payment"
      note="Expiration will end negotiations on this offer."
      countdownStart={DateTime.local().toISO()}
      countdownEnd={DateTime.local().plus({ minutes: 5 }).toISO()}
    />
  </States>
)
