import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { CCPARequest } from "../CCPARequest"

storiesOf("Styleguide/Components", module).add("CCPARequest", () => {
  return (
    <React.Fragment>
      <Section title="Logged out">
        <CCPARequest />
      </Section>
      <Section title="Logged in">
        <CCPARequest user={{ email: "percy@cat.com" }} />
      </Section>
    </React.Fragment>
  )
})
