import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { FeatureFeaturedLink } from "../FeatureFeaturedLink"
import { FEATURED_LINK } from "../__tests__/fixtures"
import { CSSGrid } from "@artsy/palette"

storiesOf("Apps/Feature", module)
  .add("FeatureFeaturedLink", () => (
    <CSSGrid gridTemplateColumns={`repeat(2, 1fr)`} gridGap={2}>
      <FeatureFeaturedLink size="medium" featuredLink={FEATURED_LINK} />
      <FeatureFeaturedLink size="medium" featuredLink={FEATURED_LINK} />
    </CSSGrid>
  ))
  .add("FeatureFeaturedLink (large)", () => (
    <FeatureFeaturedLink size="large" featuredLink={FEATURED_LINK} />
  ))
