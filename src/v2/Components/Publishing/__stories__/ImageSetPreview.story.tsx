import { storiesOf } from "@storybook/react"
import { FullScreenProvider } from "v2/Components/Publishing/Sections/FullscreenViewer/FullScreenProvider"
import { ImageSetPreview } from "v2/Components/Publishing/Sections/ImageSetPreview"
import { ImageSetLabel } from "v2/Components/Publishing/Sections/ImageSetPreview/ImageSetLabel"
import { ImageSetPreviewClassic } from "v2/Components/Publishing/Sections/ImageSetPreview/ImageSetPreviewClassic"
import React from "react"

import {
  Images,
  ImageSetFull,
  ImageSetFullSansTitle,
  ImageSetMini,
  ImageSetMiniSansTitle,
} from "../Fixtures/Components"

storiesOf("Publishing/Sections/Image Set/Classic", module).add(
  "Preview",
  () => {
    return <ImageSetPreviewClassic images={Images} />
  }
)

storiesOf("Publishing/Sections/Image Set/Editorial/Full", module)
  .add("Full", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetFull} />
        </div>
      </FullScreenProvider>
    )
  })
  .add("No title", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetFullSansTitle} />
        </div>
      </FullScreenProvider>
    )
  })

storiesOf("Publishing/Sections/Image Set/Editorial/Mini", module)
  .add("Mini", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetMini} />
        </div>
      </FullScreenProvider>
    )
  })
  .add("No title", () => {
    return (
      <FullScreenProvider>
        <div style={{ maxWidth: 680, width: "100%" }}>
          <ImageSetPreview section={ImageSetMiniSansTitle} />
        </div>
      </FullScreenProvider>
    )
  })
storiesOf("Publishing/Sections/Image Set/Editorial/Label", module)
  .add("Label", () => {
    return (
      <div style={{ maxWidth: 680, width: "100%" }}>
        <ImageSetLabel section={ImageSetFull} />
      </div>
    )
  })
  .add("No title", () => {
    return (
      <div style={{ maxWidth: 680, width: "100%" }}>
        <ImageSetLabel section={ImageSetFullSansTitle} />
      </div>
    )
  })
