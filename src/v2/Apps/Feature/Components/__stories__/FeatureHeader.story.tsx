import React from "react"
import { omit } from "lodash"
import { storiesOf } from "storybook/storiesOf"
import { FeatureHeader } from "../FeatureHeader"
import { FEATURE_HEADER } from "../__tests__/fixtures"
import { Box } from "@artsy/palette"

storiesOf("Apps/Feature", module)
  .add("FeatureHeader", () => (
    <Box height="100vh">
      <FeatureHeader feature={FEATURE_HEADER} />
    </Box>
  ))
  .add("FeatureHeader (without image)", () => (
    <Box height="100vh">
      <FeatureHeader feature={omit(FEATURE_HEADER, "image")} />
    </Box>
  ))
