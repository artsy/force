import { DateTime } from "luxon"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { Timer } from "../Timer"

storiesOf("Styleguide/Components", module).add("Timer", () => {
  return (
    <React.Fragment>
      <Section title="Timer (5 days from now)">
        <Timer
          endDate={DateTime.local()
            .plus({ days: 5 })
            .toString()}
        />
      </Section>

      <Section title="Timer (5 hours from now)">
        <Timer
          endDate={DateTime.local()
            .plus({ hours: 5 })
            .toString()}
        />
      </Section>

      <Section title="Timer (30 seconds from now)">
        <Timer
          labelWithoutTimeRemaining="Oh no, out of time!"
          labelWithTimeRemaining="There is still time left."
          endDate={DateTime.local()
            .plus({ seconds: 30 })
            .toString()}
        />
      </Section>

      <Section title="Timer (in the past)">
        <Timer
          endDate={DateTime.local()
            .minus({ days: 5 })
            .toString()}
        />
      </Section>
    </React.Fragment>
  )
})
