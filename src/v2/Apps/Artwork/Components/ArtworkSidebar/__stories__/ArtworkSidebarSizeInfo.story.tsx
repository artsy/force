import {
  ArtworkWithEditionOfOnly,
  ArtworkWithSizeAndEditionOf,
  ArtworkWithSizeOnly,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarSizeInfo"
import { ArtworkSidebarSizeInfo as SizeInfo } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarSizeInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Apps/Artwork/Components/Sidebar", module).add("SizeInfo", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with Size and Edition of presentt">
        <SizeInfo piece={ArtworkWithSizeAndEditionOf as any} />
      </Section>
      <Section title="Artwork with Size only">
        <SizeInfo piece={ArtworkWithSizeOnly as any} />
      </Section>
      <Section title="Artwork with Edition of only">
        <SizeInfo piece={ArtworkWithEditionOfOnly as any} />
      </Section>
    </React.Fragment>
  )
})
