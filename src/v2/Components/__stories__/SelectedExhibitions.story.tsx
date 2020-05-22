import { exhibitions } from "v2/Apps/__tests__/Fixtures/SelectedExhibitions"
import { MockRouter } from "v2/DevTools/MockRouter"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import {
  SelectedExhibitions,
  SelectedExhibitionsContainer,
} from "../SelectedExhibitions"

const props = {
  exhibitions: exhibitions as any,
  artistID: "andy-warhol",
  totalExhibitions: 100,
}

storiesOf("Styleguide/Components", module).add("SelectedExhibitions", () => {
  return (
    <MockRouter
      routes={[
        {
          path: "*",
          Component: () => {
            return (
              <React.Fragment>
                <Section title="3 exhibitions responsive">
                  <SelectedExhibitions {...props} />
                </Section>
                <Section title="2 exhibitions responsive">
                  <SelectedExhibitions
                    exhibitions={exhibitions.slice(1) as any}
                    artistID="andy-warhol"
                    totalExhibitions={100}
                  />
                </Section>
                <Section title="3 exhibitions full">
                  <SelectedExhibitionsContainer {...props} />
                </Section>
                <Section title="2 exhibitions full">
                  <SelectedExhibitionsContainer
                    exhibitions={exhibitions.slice(1) as any}
                    artistID="andy-warhol"
                    totalExhibitions={100}
                  />
                </Section>
                <Section title="3 exhibitions collapsed (xs)">
                  <SelectedExhibitionsContainer
                    collapsible
                    exhibitions={exhibitions as any}
                    artistID="andy-warhol"
                    totalExhibitions={100}
                  />
                </Section>
                <Section title="2 exhibitions collapsed (xs)">
                  <SelectedExhibitionsContainer
                    collapsible
                    exhibitions={exhibitions.slice(1) as any}
                    artistID="andy-warhol"
                    totalExhibitions={100}
                  />
                </Section>
                <Section title="1 exhibition">
                  <SelectedExhibitions
                    exhibitions={exhibitions.slice(2) as any}
                    artistID="andy-warhol"
                    totalExhibitions={100}
                  />
                </Section>
              </React.Fragment>
            )
          },
        },
      ]}
    />
  )
})
