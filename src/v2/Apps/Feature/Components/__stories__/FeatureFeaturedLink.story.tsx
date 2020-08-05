import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { FeatureFeaturedLink } from "../FeatureFeaturedLink"
import { FEATURED_LINK } from "../__tests__/fixtures"
import { CSSGrid } from "@artsy/palette"

storiesOf("Apps/Feature", module)
  .add("FeatureFeaturedLink (small)", () => (
    <CSSGrid gridTemplateColumns={`repeat(3, 1fr)`} gridGap={2}>
      <FeatureFeaturedLink size="small" featuredLink={FEATURED_LINK} />
      <FeatureFeaturedLink size="small" featuredLink={FEATURED_LINK} />
      <FeatureFeaturedLink size="small" featuredLink={FEATURED_LINK} />
    </CSSGrid>
  ))
  .add("FeatureFeaturedLink (medium)", () => (
    <CSSGrid gridTemplateColumns={`repeat(2, 1fr)`} gridGap={2}>
      <FeatureFeaturedLink size="medium" featuredLink={FEATURED_LINK} />
      <FeatureFeaturedLink size="medium" featuredLink={FEATURED_LINK} />
    </CSSGrid>
  ))
  .add("FeatureFeaturedLink (large)", () => (
    <FeatureFeaturedLink size="large" featuredLink={FEATURED_LINK} />
  ))
  .add("FeatureFeaturedLink (full)", () => (
    <FeatureFeaturedLink
      size="full"
      featuredLink={{
        ...FEATURED_LINK,
        description: `<p>Newly Emerging: First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname.</p>`,
      }}
    />
  ))
  .add("FeatureFeaturedLink (full, description)", () => (
    <FeatureFeaturedLink
      size="full"
      featuredLink={{
        ...FEATURED_LINK,
        image: null,
        title: null,
        subtitle: null,
        description: `<p>Newly Emerging: First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname, First Lastname.</p>`,
      }}
    />
  ))
  .add("FeatureFeaturedLink (full, description with blockquote)", () => (
    <FeatureFeaturedLink
      size="full"
      featuredLink={{
        ...FEATURED_LINK,
        image: null,
        title: null,
        subtitle: null,
        description: `<blockquote>The Artsy Vanguard 2019 features 50 artists, hailing from 27 countries and working in 27 cities around the world. Ranging in age from 28 to 93, they pursue painting, sculpture, photography, and filmmaking.</blockquote>`,
      }}
    />
  ))
