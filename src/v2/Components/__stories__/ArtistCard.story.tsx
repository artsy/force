import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

import { MockRelayRenderer } from "v2/DevTools"
import { graphql } from "react-relay"
import {
  ArtistCardFragmentContainer,
  LargeArtistCard,
  SmallArtistCard,
} from "../ArtistCard"

const artistFixture = {
  image: {
    cropped: {
      url: "https://picsum.photos/110/110/?random",
    },
  },
  href: "/artist/francesca-dimattio",
  name: "Francesca DiMattio",
  formatted_nationality_and_birthday: "American, b. 1979",
  id: "percy",
  counts: null,
  related: null,
  is_followed: false,
}

const MockArtistCard = ({ artist, Component }) => {
  return (
    <MockRelayRenderer
      Component={Component}
      mockData={{ artist }}
      query={graphql`
        query ArtistCardStoryQuery {
          artist(id: "unused") {
            ...ArtistCard_artist
          }
        }
      `}
    />
  )
}

storiesOf("Styleguide/Components", module).add("ArtistCard", () => {
  const props = {
    artist: artistFixture as any,
    user: null,
  }

  return (
    <React.Fragment>
      <Section title="Responsive Artist Card">
        <MockArtistCard {...props} Component={ArtistCardFragmentContainer} />
      </Section>
      <Section title="Large Artist Card">
        <MockArtistCard {...props} Component={LargeArtistCard} />
      </Section>
      <Section title="Small Artist Card">
        <MockArtistCard {...props} Component={SmallArtistCard} />
      </Section>
    </React.Fragment>
  )
})
