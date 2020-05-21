import { storiesOf } from "@storybook/react"
import React from "react"
import { Artworks } from "../Fixtures/Components"
import { Artwork } from "../Sections/Artwork"

storiesOf("Publishing/Artwork", module)
  .add("Single artist", () => {
    return (
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[0]} />
      </div>
    )
  })
  .add("Multiple artists", () => {
    return (
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[1]} />
      </div>
    )
  })
  .add("Unlinked", () => {
    return (
      <div style={{ width: 800 }}>
        <Artwork linked={false} artwork={Artworks[1]} />
      </div>
    )
  })
  .add("Missing info", () => {
    return (
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[2]} />
      </div>
    )
  })
  .add("Long info", () => {
    return (
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[3]} />
      </div>
    )
  })
  .add("Small", () => {
    return (
      <div style={{ width: 400 }}>
        <Artwork artwork={Artworks[1]} />
      </div>
    )
  })
  .add("Fillwidth", () => {
    return (
      <div style={{ width: "100%" }}>
        <Artwork artwork={Artworks[1]} sectionLayout="fillwidth" />
      </div>
    )
  })
  .add("Classic", () => {
    return (
      <div style={{ width: 800 }}>
        <Artwork artwork={Artworks[0]} layout="classic" />
      </div>
    )
  })
