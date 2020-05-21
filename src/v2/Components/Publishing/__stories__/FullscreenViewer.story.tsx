import { storiesOf } from "@storybook/react"
import React from "react"
import Button from "../../Buttons/Default"
import { Images } from "../Fixtures/Components"
import { FullScreenProvider } from "../Sections/FullscreenViewer/FullScreenProvider"
import { FullscreenViewer } from "../Sections/FullscreenViewer/FullscreenViewer"

class FullscreenViewerDemo extends React.Component<any, any> {
  render() {
    return (
      <FullScreenProvider>
        {({ openViewer, closeViewer, viewerIsOpen }) => {
          return (
            <div>
              <Button onClick={openViewer}>Open Fullscreen Viewer</Button>
              <FullscreenViewer
                onClose={closeViewer}
                show={viewerIsOpen}
                images={Images}
              />
            </div>
          )
        }}
      </FullScreenProvider>
    )
  }
}

storiesOf("Publishing/Fullscreen Viewer", module).add("Button", () => {
  return <FullscreenViewerDemo />
})
