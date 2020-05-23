import { AllAdditionalDetailsPresent } from "v2/Apps/__tests__/Fixtures/Artworks"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import {
  ArtworkDetailsFragmentContainer,
  ArtworkDetailsQueryRenderer,
} from "../ArtworkDetails"

const MockArtworkDetails = ({ artwork }) => {
  return (
    <MockRelayRenderer
      Component={ArtworkDetailsFragmentContainer}
      mockData={{ artwork }}
      query={graphql`
        query ArtworkDetailsStoryQuery {
          artwork(id: "unused") {
            ...ArtworkDetails_artwork
          }
        }
      `}
    />
  )
}

storiesOf("Apps/Artwork/Components", module).add("ArtworkDetails", () => {
  return (
    <React.Fragment>
      <Section title="Fixture artwork with every additional details available">
        <MockArtworkDetails artwork={AllAdditionalDetailsPresent} />
      </Section>
      <Section title="ArtworkDetailsQueryRenderer containing Provanance tab">
        <ArtworkDetailsQueryRenderer artworkID="andy-warhol-s-and-h-green-stamps-feldman-and-schellman-11-dot-9" />
      </Section>
      <Section title="ArtworkDetailsQueryRenderer for one tab">
        <ArtworkDetailsQueryRenderer artworkID="ai-weiwei-arch" />
      </Section>
      <Section title="ArtworkDetailsQueryRenderer for 2 tabs">
        <ArtworkDetailsQueryRenderer artworkID="richard-prince-untitled-fashion" />
      </Section>
      <Section title="Info from partner only">
        <ArtworkDetailsQueryRenderer artworkID="eduardo-arroyo-card-game-slash-poker-brelan" />
      </Section>
      <Section title="Info from partner plus one additional box">
        <ArtworkDetailsQueryRenderer artworkID="invader-rubik-ohh-dot-dot-dot-alright-dot-dot-dot-1" />
      </Section>
      <Section title="Info from partner plus other 2 types of data">
        <ArtworkDetailsQueryRenderer artworkID="allan-bruce-zee-lily-pads-balboa-park-san-diego-california-two-photographs-1" />
      </Section>
      <Section title="Articles tab only with news article">
        <ArtworkDetailsQueryRenderer artworkID="kevin-beasley-untitled-stub" />
      </Section>
      <Section title="Artwork from benefit auction">
        <ArtworkDetailsQueryRenderer artworkID="nicolas-saint-gregoire-wesselmann-visage" />
      </Section>
    </React.Fragment>
  )
})
