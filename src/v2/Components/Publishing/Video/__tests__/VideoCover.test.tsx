import { VideoArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { Media } from "v2/Components/Publishing/Fixtures/Components"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { VideoCover, VideoCoverAsset } from "../VideoCover"

describe("Video Cover", () => {
  it("matches the snapshot", () => {
    const videoCover = renderer
      .create(
        <VideoCover
          article={VideoArticle}
          media={Media[0]}
          seriesTitle="Future of Art"
        />
      )
      .toJSON()
    expect(videoCover).toMatchSnapshot()
  })

  it("matches the snapshot with edit props", () => {
    const videoInfo = renderer
      .create(
        <VideoCover
          article={VideoArticle}
          media={Media[0]}
          seriesTitle="Future of Art"
          editDescription={EditableChild("description")}
          editTitle={EditableChild("title")}
        />
      )
      .toJSON()
    expect(videoInfo).toMatchSnapshot()
  })

  it("renders video asset image", () => {
    const component = mount(
      <VideoCover
        article={VideoArticle}
        media={Media[0]}
        seriesTitle="Future of Art"
      />
    )
    expect(component.find(VideoCoverAsset).props().src).toEqual(
      "https://artsy-vanity-files-production.s3.amazonaws.com/images/galerie-ceysson-benetiere_abmb.jpg"
    )
  })

  it("renders video info", () => {
    const component = mount(
      <VideoCover
        article={VideoArticle}
        media={Media[0]}
        seriesTitle="Future of Art"
      />
    )
    expect(component.text()).toMatch("The elegant spiral of the Nautilus shell")
    expect(component.text()).toMatch("Trevor Paglan")
  })

  it("renders editable fields", () => {
    const component = mount(
      <VideoCover
        article={VideoArticle}
        media={Media[0]}
        seriesTitle="Future of Art"
        editDescription={EditableChild("description")}
        editTitle={EditableChild("title")}
      />
    )
    expect(component.text()).toMatch("Child description")
    expect(component.text()).toMatch("Child title")
  })
})
