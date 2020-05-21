import { storiesOf } from "@storybook/react"
import React, { Fragment } from "react"
import {
  Embeds,
  SocialEmbedInstagram,
  SocialEmbedTwitter,
} from "../Fixtures/Components"
import { Videos } from "../Fixtures/Components"
import { Embed } from "../Sections/Embed"
import { SocialEmbed } from "../Sections/SocialEmbed"
import { Video } from "../Sections/Video"

storiesOf("Publishing/Sections/Embed", module).add("Embed", () => {
  return (
    <div style={{ width: "100%" }}>
      <Embed section={Embeds[0]} />
    </div>
  )
})

storiesOf("Publishing/Sections/Social Embed", module)
  .add("Twitter", () => {
    return (
      <Fragment>
        <div style={{ width: "100%" }}>
          <SocialEmbed section={SocialEmbedTwitter} />
        </div>
      </Fragment>
    )
  })
  .add("Instagram", () => {
    return (
      <Fragment>
        <div style={{ width: "100%" }}>
          <SocialEmbed section={SocialEmbedInstagram} />
        </div>
      </Fragment>
    )
  })

storiesOf("Publishing/Sections/Video", module)
  .add("Youtube", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[0]} layout="standard" />
      </div>
    )
  })
  .add("Vimeo", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[1]} layout="standard" />
      </div>
    )
  })
  .add("Coverless", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[2]} layout="classic" />
      </div>
    )
  })
  .add("With custom tracking", () => {
    const data = { entity_id: "1234", entity_type: "feature" }
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <Video section={Videos[0]} layout="standard" trackingData={data} />
      </div>
    )
  })
