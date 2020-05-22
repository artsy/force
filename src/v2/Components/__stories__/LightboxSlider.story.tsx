import { Slider } from "v2/Components/Lightbox/LightboxSlider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Styleguide/Components", module).add("LightboxSlider", () => {
  return (
    <React.Fragment>
      <Section title="Lightbox Slider">
        <Slider min={0} max={100} step={1} value={50} />
      </Section>
    </React.Fragment>
  )
})
