import {
  CountdownTimer,
  type CountdownTimerProps,
} from "Components/CountdownTimer"
import { DateTime } from "luxon"
import { States } from "storybook-states"

export default {
  title: "Components/CountdownTimer",
}

export const Default = () => (
  <States<Partial<CountdownTimerProps>> states={[{}]}>
    <CountdownTimer
      action="Submit new payment"
      note="Once this offer expires, negotiations will end. Note that the artwork could be sold to another buyer in the meantime."
      countdownStart={DateTime.local().toISO()}
      countdownEnd={DateTime.local().plus({ minutes: 5 }).toISO()}
    />
  </States>
)
