import {
  ArtworkFromPartnerWithLocations,
  ArtworkFromPartnerWithoutLocations,
  ArtworkWithCollectingInstitution,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { ArtworkSidebarPartnerInfo as PartnerInfo } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Apps/Artwork/Components/Sidebar", module).add("PartnerInfo", () => {
  return (
    <React.Fragment>
      <Section title="Rartner with locations">
        <PartnerInfo artwork={ArtworkFromPartnerWithLocations as any} />
      </Section>
      <Section title="Partner without locations">
        <PartnerInfo artwork={ArtworkFromPartnerWithoutLocations as any} />
      </Section>
      <Section title="Institutional seller">
        <PartnerInfo artwork={ArtworkWithCollectingInstitution as any} />
      </Section>
    </React.Fragment>
  )
})
