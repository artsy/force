import { storiesOf } from "@storybook/react"
import React from "react"
import { Images } from "../Fixtures/Components"
import { Image } from "../Sections/Image"

storiesOf("Publishing/Image", module)
  .add("Image", () => {
    return (
      <div style={{ width: 400 }}>
        <Image image={Images[1]} />
      </div>
    )
  })
  .add("Long Caption", () => {
    return (
      <div style={{ width: 400 }}>
        <Image image={Images[2]} />
      </div>
    )
  })
  .add("Child caption", () => {
    return (
      <div style={{ width: 400 }}>
        <Image image={Images[2]}>
          <div>
            <p>A React child as caption.</p>
          </div>
        </Image>
      </div>
    )
  })
  .add("Fillwidth", () => {
    return (
      <div style={{ width: "100%" }}>
        <Image image={Images[2]} sectionLayout="fillwidth" />
      </div>
    )
  })
  .add("Classic", () => {
    return (
      <div style={{ width: 400 }}>
        <Image layout="classic" image={Images[2]} />
      </div>
    )
  })
