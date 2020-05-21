import { selectProps } from "v2/Apps/__tests__/Fixtures/Select"
import { CountrySelect } from "v2/Components/CountrySelect"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Styleguide/Components", module).add("Country Select", () => {
  return (
    <React.Fragment>
      <Section title="Country Select">
        <CountrySelect {...selectProps} />
      </Section>
    </React.Fragment>
  )
})
