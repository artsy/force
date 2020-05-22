import { Sans, Serif } from "@artsy/palette"
import { StepSummaryItem } from "v2/Components/StepSummaryItem"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Styleguide/Components", module).add("StepSummaryItem", () => {
  return (
    <>
      <Section title="Single StepSummaryItem">
        <StepSummaryItem
          title="Pick up (New York, NY)"
          onChange={() => console.warn("change")}
          width="100%"
          maxWidth={542}
        >
          <Sans size="2" color="black60" maxWidth={391}>
            After you place your order, you’ll be appointed an Artsy specialist
            within 2 business days to handle pickup logistics.
          </Sans>
        </StepSummaryItem>
      </Section>
      <Section title="Multiple StepSummaryItems">
        <StepSummaryItem
          title="Pick up (New York, NY)"
          onChange={() => console.warn("change")}
          width="100%"
          maxWidth={542}
        >
          <Sans size="2" color="black60" maxWidth={391}>
            After you place your order, you’ll be appointed an Artsy specialist
            within 2 business days to handle pickup logistics.
          </Sans>
        </StepSummaryItem>
        <StepSummaryItem
          title="Shipping Address"
          onChange={() => console.warn("change")}
          width="100%"
          maxWidth={542}
        >
          <Serif size={["2", "3"]} color="black100">
            Ebe Park
            <br />
            315 8th Ave, Apt 5C
            <br />
            New York, NY 10001
            <br />
            United States
          </Serif>
        </StepSummaryItem>
      </Section>
      <Section title="Multiple StepSummaryItems with locks">
        <StepSummaryItem
          title="Pick up (New York, NY)"
          locked
          width="100%"
          maxWidth={542}
        >
          <Sans size="2" color="black60" maxWidth={391}>
            After you place your order, you’ll be appointed an Artsy specialist
            within 2 business days to handle pickup logistics.
          </Sans>
        </StepSummaryItem>
        <StepSummaryItem
          title="Shipping Address"
          onChange={() => console.warn("change")}
          locked
          width="100%"
          maxWidth={542}
        >
          <Serif size={["2", "3"]} color="black100">
            Ebe Park
            <br />
            315 8th Ave, Apt 5C
            <br />
            New York, NY 10001
            <br />
            United States
          </Serif>
        </StepSummaryItem>
        <StepSummaryItem locked width="100%" maxWidth={542}>
          <Serif size={["2", "3"]} color="black100">
            This one doesn't have a title
          </Serif>
        </StepSummaryItem>
        <StepSummaryItem
          locked
          onChange={() => console.warn("change")}
          width="100%"
          maxWidth={542}
        >
          <Serif size={["2", "3"]} color="black100">
            This one doesn't have a title but does have onChange
          </Serif>
        </StepSummaryItem>
      </Section>
    </>
  )
})
