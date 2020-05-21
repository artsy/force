import { Media } from "v2/Components/Publishing/Fixtures/Components"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { VideoInfoBlock } from "../VideoInfoBlock"

describe("Video Info Block", () => {
  it("matches the snapshot", () => {
    const videoInfo = renderer
      .create(
        <VideoInfoBlock
          media={Media[0]}
          subTitle="The Future of Art"
          title="Trevor Paglan"
        />
      )
      .toJSON()
    expect(videoInfo).toMatchSnapshot()
  })

  it("matches the snapshot with edit props", () => {
    const videoInfo = renderer
      .create(
        <VideoInfoBlock
          subTitle="The Future of Art"
          media={Media[0]}
          title="Trevor Paglan"
          editTitle={EditableChild("title")}
        />
      )
      .toJSON()
    expect(videoInfo).toMatchSnapshot()
  })

  it("renders titles and duration", () => {
    const component = mount(
      <VideoInfoBlock
        subTitle="The Future of Art"
        media={Media[0]}
        title="Trevor Paglan"
      />
    )
    expect(component.text()).toMatch("The Future of Art")
    expect(component.text()).toMatch("Trevor Paglan")
    expect(component.text()).toMatch("02:28")
  })

  it("renders editable title", () => {
    const component = mount(
      <VideoInfoBlock
        subTitle="The Future of Art"
        media={Media[0]}
        title="Trevor Paglan"
        editTitle={EditableChild("title")}
      />
    )
    expect(component.text()).toMatch("Child title")
  })
})
