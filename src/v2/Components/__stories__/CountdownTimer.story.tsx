import { Flex } from "@artsy/palette"
import { CountdownTimer } from "v2/Components/CountdownTimer"
import { StepSummaryItem } from "v2/Components/StepSummaryItem"
import { DateTime } from "luxon"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Styleguide/Components", module).add("CountdownTimer", () => {
  return (
    <Flex m="30px auto" flexDirection="column" width="100%" maxWidth="542px">
      <StepSummaryItem title="Just started" width="100%" maxWidth="542px">
        <CountdownTimer
          action="Respond"
          note="Expired offers end the negotiation process permanently."
          countdownEnd={DateTime.local()
            .plus({ days: 2 })
            .toString()}
          countdownStart={DateTime.local().toString()}
        />
      </StepSummaryItem>
      <StepSummaryItem title="Half way there">
        <CountdownTimer
          action="Respond"
          note="Expired offers end the negotiation process permanently."
          countdownEnd={DateTime.local()
            .plus({ days: 1 })
            .toString()}
          countdownStart={DateTime.local()
            .minus({ days: 1 })
            .toString()}
        />
      </StepSummaryItem>
      <StepSummaryItem title="Moves fast!" width="100%" maxWidth="542px">
        <CountdownTimer
          action="Respond"
          note="Expired offers end the negotiation process permanently."
          countdownEnd={DateTime.local()
            .plus({ seconds: 10 })
            .toString()}
          countdownStart={DateTime.local().toString()}
        />
      </StepSummaryItem>
      <StepSummaryItem
        title="Only an hour left to go!"
        width="100%"
        maxWidth="542px"
      >
        <CountdownTimer
          action="Respond"
          note="Expired offers end the negotiation process permanently."
          countdownEnd={DateTime.local()
            .plus({ hours: 1 })
            .toString()}
          countdownStart={DateTime.local()
            .minus({ days: 2 })
            .toString()}
        />
      </StepSummaryItem>
      <StepSummaryItem title="Out of time!!" width="100%" maxWidth="542px">
        <CountdownTimer
          action="You forgot to do the thing 😵"
          note="And now it's too late."
          countdownEnd={DateTime.local()
            .minus({ seconds: 10 })
            .toString()}
          countdownStart={DateTime.local()
            .minus({ days: 2 })
            .toString()}
        />
      </StepSummaryItem>
    </Flex>
  )
})
