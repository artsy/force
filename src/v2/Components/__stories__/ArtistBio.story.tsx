import { bio } from "v2/Apps/__tests__/Fixtures/ArtistBio"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { ArtistBio } from "../ArtistBio"

storiesOf("Styleguide/Components", module).add("ArtistBio", () => {
  return (
    <React.Fragment>
      <Section title="Responsive Artist Bio">
        <ArtistBio
          bio={{ biographyBlurb: { text: bio, credit: "Gagosian" } } as any}
        />
      </Section>
      <Section title="Small bio">
        <ArtistBio
          bio={
            {
              biographyBlurb: {
                text: "Hello how are you",
                credit: "Gagosian",
              },
            } as any
          }
        />
      </Section>
    </React.Fragment>
  )
})
