import { Box, Serif } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ImageLink } from "../ImageLink"

const imageSample =
  "https://d7hftxdivxxvm.cloudfront.net/?resize_to=fill&width=357&height=175&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FeF_qAORql7lSnD2BwbFOYg%2Flarge.jpg"

storiesOf("Components/ImageLink", module)
  .add("with specific dimensions", () => (
    <Box width={300}>
      <ImageLink
        to="http://example.com"
        src={imageSample}
        ratio={0.49}
        title={<Serif size="4t">Photography</Serif>}
      />
    </Box>
  ))
  .add("with variable dimensions", () => (
    <Box width="30%">
      <ImageLink
        to="http://example.com"
        src={imageSample}
        ratio={0.49}
        title={<Serif size="4t">Street Art</Serif>}
      />
    </Box>
  ))
  .add("with a long text", () => (
    <Box width={300}>
      <ImageLink
        to="http://example.com"
        src={imageSample}
        ratio={0.49}
        title={
          <Serif size="4t">
            Impressionist and Modern Art and Other Things People Like
          </Serif>
        }
      />
    </Box>
  ))
  .add("with title and subtitle", () => (
    <Box width="30%">
      <ImageLink
        to="http://example.com"
        src={imageSample}
        ratio={0.49}
        title={<Serif size="4t">Photography</Serif>}
        subtitle={
          <Serif size="2">Today’s leading artists and emerging talents</Serif>
        }
      />
    </Box>
  ))
