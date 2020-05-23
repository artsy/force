import {
  ArtworkBuyNow,
  ArtworkBuyNowMakeOffer,
  ArtworkBuyNowSoldWithMultipleEditions,
  ArtworkBuyNowWithMultipleEditions,
  ArtworkMakeOffer,
  ArtworkSold,
  ContactForPriceWork,
  ForSaleArtworkNoEditions,
  ForSaleArtworkWithMultipleEditions,
  ForSaleArtworkWithOneEdition,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCommercial"
import { ArtworkSidebarCommercialFragmentContainer as Commercial } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

const MockArtworkSidebarCommercial = ({ artwork }) => {
  return (
    <MockRelayRenderer
      Component={Commercial}
      mockData={{ artwork }}
      query={graphql`
        query ArtworkSidebarCommercialStoryQuery {
          artwork(id: "unused") {
            ...ArtworkSidebarCommercial_artwork
          }
        }
      `}
    />
  )
}

storiesOf("Apps/Artwork/Components/Sidebar", module).add("Commercial", () => {
  return (
    <>
      <Section title="For sale artwork with no editions">
        <MockArtworkSidebarCommercial
          artwork={ForSaleArtworkNoEditions as any}
        />
      </Section>
      <Section title="For sale artwork with one edition set">
        <MockArtworkSidebarCommercial
          artwork={ForSaleArtworkWithOneEdition as any}
        />
      </Section>
      <Section title="For sale artwork with multiple edition sets">
        <MockArtworkSidebarCommercial
          artwork={ForSaleArtworkWithMultipleEditions as any}
        />
      </Section>
      <Section title="Contact for price work">
        <MockArtworkSidebarCommercial artwork={ContactForPriceWork as any} />
      </Section>
      <Section title="Buy Now / Work available for sale">
        <MockArtworkSidebarCommercial artwork={ArtworkBuyNow as any} />
      </Section>
      <Section title="Buy Now / Work sold">
        <MockArtworkSidebarCommercial artwork={ArtworkSold as any} />
      </Section>
      <Section title="Make Offer / Work available for sale">
        <MockArtworkSidebarCommercial artwork={ArtworkMakeOffer as any} />
      </Section>
      <Section title="Buy Now &amp; Make Offer / Work available for sale">
        <MockArtworkSidebarCommercial artwork={ArtworkBuyNowMakeOffer as any} />
      </Section>
      <Section title="Buy Now &amp; Make Offer / Work available for sale">
        <MockArtworkSidebarCommercial artwork={ArtworkBuyNowMakeOffer as any} />
      </Section>
      <Section title="Buy Now &amp; Make Offer / Work available for sale">
        <MockArtworkSidebarCommercial artwork={ArtworkBuyNowMakeOffer as any} />
      </Section>
      <Section title="Buy Now &amp; Make Offer / Work available for sale">
        <MockArtworkSidebarCommercial artwork={ArtworkBuyNowMakeOffer as any} />
      </Section>
      <Section title="Buy Now artwork with multiple edition sets">
        <MockArtworkSidebarCommercial
          artwork={ArtworkBuyNowWithMultipleEditions as any}
        />
      </Section>
      <Section title="Buy Now artwork sold with multiple edition sets">
        <MockArtworkSidebarCommercial
          artwork={ArtworkBuyNowSoldWithMultipleEditions as any}
        />
      </Section>
    </>
  )
})
