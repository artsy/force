import { ArtworkSidebarQueryRenderer } from "v2/Apps/Artwork/Components/ArtworkSidebar"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Apps/Artwork/Components", module).add("SidebarLive", () => {
  return (
    <React.Fragment>
      <Section title="Multiple artists andy-warhol-twenty-years-1977-signed-slash-inscribed-by-leo-exhibition-catalogue-leo-castelli-gallery-1st-edition">
        <ArtworkSidebarQueryRenderer artworkID="andy-warhol-twenty-years-1977-signed-slash-inscribed-by-leo-exhibition-catalogue-leo-castelli-gallery-1st-edition" />
      </Section>
      <Section title="Exact price in euro albert-gleizes-pascal-pensees-sur-lhomme-et-dieu-restrikes-of-22-etchings">
        <ArtworkSidebarQueryRenderer artworkID="albert-gleizes-pascal-pensees-sur-lhomme-et-dieu-restrikes-of-22-etchings" />
      </Section>
      <Section title="Buy now anni-albers-connections-1925-1983-untitled-1983">
        <ArtworkSidebarQueryRenderer artworkID="anni-albers-connections-1925-1983-untitled-1983" />
      </Section>
      <Section title="Contact for price from gellery andy-warhol-s-and-h-green-stamps-feldman-and-schellman-11-dot-9">
        <ArtworkSidebarQueryRenderer artworkID="andy-warhol-s-and-h-green-stamps-feldman-and-schellman-11-dot-9" />
      </Section>
      <Section title="Not for sale ai-weiwei-arch">
        <ArtworkSidebarQueryRenderer artworkID="ai-weiwei-arch" />
      </Section>
      <Section title="Sold from partner with multiple locations richard-prince-untitled-fashion">
        <ArtworkSidebarQueryRenderer artworkID="richard-prince-untitled-fashion" />
      </Section>
      <Section title="From past auction eduardo-arroyo-card-game-slash-poker-brelan">
        <ArtworkSidebarQueryRenderer artworkID="eduardo-arroyo-card-game-slash-poker-brelan" />
      </Section>
      <Section title="Permanent collection paul-gauguin-the-invocation">
        <ArtworkSidebarQueryRenderer artworkID="paul-gauguin-the-invocation" />
      </Section>
      <Section title="One edition marc-chagall-romeo-and-juliette-1">
        <ArtworkSidebarQueryRenderer artworkID="marc-chagall-romeo-and-juliette-1" />
      </Section>
      <Section title="Multiple editions nick-brandt-rangers-line-of-with-tusks-of-killed-elephants-amboseli-2011">
        <ArtworkSidebarQueryRenderer artworkID="nick-brandt-rangers-line-of-with-tusks-of-killed-elephants-amboseli-2011" />
      </Section>
      <Section title="Artwork with cultural maker american-18th-century-lady-wearing-a-large-white-cap">
        <ArtworkSidebarQueryRenderer artworkID="american-18th-century-lady-wearing-a-large-white-cap" />
      </Section>
    </React.Fragment>
  )
})
