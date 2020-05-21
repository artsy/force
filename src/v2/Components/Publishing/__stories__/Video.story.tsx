import { storiesOf } from "@storybook/react"
import React from "react"
import { VideoArticle } from "../Fixtures/Articles"
import { Media } from "../Fixtures/Components"
import { EditableChild } from "../Fixtures/Helpers"
import { VideoPlayer } from "../Video/Player/VideoPlayer"
import { VideoAbout } from "../Video/VideoAbout"
import { VideoCover } from "../Video/VideoCover"

storiesOf("Publishing/Video/Player", module).add("Player", () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <VideoPlayer {...Media[0]} />
    </div>
  )
})

storiesOf("Publishing/Video/Cover", module)
  .add("Cover", () => {
    return <VideoCover article={VideoArticle} media={Media[0]} />
  })
  .add("In Series", () => {
    return (
      <VideoCover
        article={VideoArticle}
        media={Media[0]}
        seriesTitle="The Future of Art"
      />
    )
  })
  .add("With edit props", () => {
    return (
      <VideoCover
        article={VideoArticle}
        media={Media[0]}
        seriesTitle="The Future of Art"
        editDescription={EditableChild("description")}
        editTitle={EditableChild("media.title")}
      />
    )
  })

storiesOf("Publishing/Video/About", module)
  .add("About", () => {
    return <VideoAbout article={VideoArticle} />
  })
  .add("With edit props", () => {
    return (
      <VideoAbout
        article={VideoArticle}
        editDescription={EditableChild("media.description")}
        editCredits={EditableChild("media.credits")}
      />
    )
  })
