import {
  ArtworkWithTitlAndDate,
  ArtworkWithTitleAndMedium,
  ArtworkWithTitleDateAndMedium,
  ArtworkWithTitleOnly,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarTitleInfo"
import { ArtworkSidebarTitleInfo as TitleInfo } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarTitleInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Apps/Artwork/Components/Sidebar", module).add("TitleInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with Title Date and Medium present">
        <TitleInfo artwork={ArtworkWithTitleDateAndMedium as any} />
      </Section>
      <Section title="Artwork with Title only">
        <TitleInfo artwork={ArtworkWithTitleOnly as any} />
      </Section>
      <Section title="Artwork with Title and Date">
        <TitleInfo artwork={ArtworkWithTitlAndDate as any} />
      </Section>
      <Section title="Artwork with Title and Medium">
        <TitleInfo artwork={ArtworkWithTitleAndMedium as any} />
      </Section>
    </React.Fragment>
  )
})
