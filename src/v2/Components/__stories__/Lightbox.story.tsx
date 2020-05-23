import { Lightbox } from "v2/Components/Lightbox"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

const image = size =>
  `https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/${size}.jpg`
const deepZoom = {
  Image: {
    xmlns: "http://schemas.microsoft.com/deepzoom/2008",
    Url:
      "https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/dztiles/",
    Format: "jpg",
    Overlap: 0,
    TileSize: 512,
    Size: {
      Width: 912,
      Height: 608,
    },
  },
}

storiesOf("Styleguide/Components", module).add("Lightbox", () => {
  return (
    <React.Fragment>
      <Section title="Lightbox">
        <Lightbox
          src={image("large")}
          imageAlt="Arya Stark, Untitled, 1984"
          deepZoom={deepZoom}
        />
      </Section>
      <div id="lightbox-container" />
    </React.Fragment>
  )
})
