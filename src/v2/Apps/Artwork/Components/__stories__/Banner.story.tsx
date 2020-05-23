import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { Banner, LargeBanner, SmallBanner } from "../ArtworkBanner/Banner"

storiesOf("Apps/Artwork/Components", module).add("ResponsiveBanner", () => {
  return (
    <React.Fragment>
      <Section title="Responsive banner with image">
        <Banner
          imageUrl="https://picsum.photos/110/110/?random"
          initials="S9"
          meta="In show"
          name="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
      <Section title="Large Banner no image with initials">
        <LargeBanner
          imageUrl={null}
          initials="S9"
          meta="In show"
          name="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
      <Section title="Small Banner">
        <SmallBanner
          imageUrl="https://picsum.photos/110/110/?random"
          initials="S9"
          meta="In show"
          name="Francesca DiMattio: Boucherouite"
          subHeadline="Salon 94"
        />
      </Section>
    </React.Fragment>
  )
})
