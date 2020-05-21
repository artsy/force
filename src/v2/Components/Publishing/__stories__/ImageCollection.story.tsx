import { storiesOf } from "@storybook/react"
import React from "react"
import { Images, ImagesNarrow } from "../Fixtures/Components"
import { FullScreenProvider } from "../Sections/FullscreenViewer/FullScreenProvider"
import { FullscreenViewer } from "../Sections/FullscreenViewer/FullscreenViewer"
import { ImageCollection } from "../Sections/ImageCollection"

class ImageCollectionDemo extends React.Component<any, any> {
  render() {
    return (
      <FullScreenProvider>
        {({ openViewer, closeViewer, slideIndex, viewerIsOpen }) => {
          return (
            <div>
              <div style={{ width: 780, margin: "0 auto" }}>
                <ImageCollection
                  images={Images}
                  targetHeight={400}
                  gutter={10}
                />
                <br />
                <ImageCollection
                  images={ImagesNarrow}
                  targetHeight={400}
                  gutter={10}
                />
              </div>
              <FullscreenViewer
                onClose={closeViewer}
                show={viewerIsOpen}
                slideIndex={slideIndex}
                images={Images}
              />
            </div>
          )
        }}
      </FullScreenProvider>
    )
  }
}

class MultipleArtistsImageCollection extends React.Component<any, any> {
  render() {
    return (
      <FullScreenProvider>
        {({ openViewer, closeViewer, slideIndex, viewerIsOpen }) => {
          return (
            <div>
              <div style={{ width: "100%" }}>
                <ImageCollection
                  images={[workWithThreeArtists, workWithThreeArtists]}
                  targetHeight={400}
                  gutter={10}
                />
              </div>
              <FullscreenViewer
                onClose={closeViewer}
                show={viewerIsOpen}
                slideIndex={slideIndex}
                images={Images}
              />
            </div>
          )
        }}
      </FullScreenProvider>
    )
  }
}

const workWithThreeArtists = {
  type: "artwork",
  id: "589a6291275b2410d1beb6a5",
  slug: "fernando-botero-nude-on-the-beach",
  date: "2000",
  title: "Nude on the Beach",
  image:
    "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
  partner: {
    name: "Gary Nader",
    slug: "gary-nader",
  },
  artists: [
    {
      name: "Fernando Botero",
      slug: "fernando-botero",
    },
    {
      name: "Frida Kahlo",
      slug: "frida-kahlo",
    },
    {
      name: "Frida Kahlo",
      slug: "frida-kahlo",
    },
  ],
  width: 1152,
  height: 826,
  credit: "Courtesy of Gary Nader",
}

storiesOf("Publishing/Sections/Image Collection", module)
  .add("Image Collection", () => {
    return <ImageCollectionDemo />
  })
  .add("Artworks: > 2 artists", () => {
    return <MultipleArtistsImageCollection />
  })
