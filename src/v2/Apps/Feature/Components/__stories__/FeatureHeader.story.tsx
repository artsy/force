import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { FeatureHeaderDefault } from "../FeatureHeader/FeatureHeaderDefault"
import { FeatureHeaderFull } from "../FeatureHeader/FeatureHeaderFull"
import { FEATURE_HEADER } from "../__tests__/fixtures"
import { Box } from "@artsy/palette"

storiesOf("Apps/Feature", module)
  .add("FeatureHeader (default, with image)", () => (
    <Box height="100vh">
      <FeatureHeaderDefault feature={FEATURE_HEADER} />
    </Box>
  ))
  .add("FeatureHeader (default, without image)", () => (
    <Box height="100vh">
      <FeatureHeaderDefault
        feature={{ ...FEATURE_HEADER, defaultImage: null }}
      />
    </Box>
  ))
  .add("FeatureHeader (full, with image", () => (
    <Box height="100vh">
      <FeatureHeaderFull feature={FEATURE_HEADER} />
    </Box>
  ))
  .add("FeatureHeader (full, without image)", () => (
    <Box height="100vh">
      <FeatureHeaderFull feature={{ ...FEATURE_HEADER, fullImage: null }} />
    </Box>
  ))
