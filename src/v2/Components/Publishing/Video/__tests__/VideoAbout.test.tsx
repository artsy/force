import { VideoArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { VideoAbout } from "../VideoAbout"

describe("Video About", () => {
  it("matches the snapshot", () => {
    const videoAbout = renderer
      .create(<VideoAbout article={VideoArticle} />)
      .toJSON()
    expect(videoAbout).toMatchSnapshot()
  })

  it("matches the snapshot with editable props", () => {
    const videoAbout = renderer
      .create(
        <VideoAbout
          article={VideoArticle}
          editDescription={EditableChild("media.description")}
          editCredits={EditableChild("media.credit")}
        />
      )
      .toJSON()
    expect(videoAbout).toMatchSnapshot()
  })

  it("renders the credits section", () => {
    const component = mount(<VideoAbout article={VideoArticle} />)
    expect(component.text()).toMatch("Marina Cashdan")
    expect(component.text()).toMatch("Trevor Paglan")
  })

  it("renders the about section", () => {
    const component = mount(<VideoAbout article={VideoArticle} />)
    expect(component.text()).toMatch("Lorem ipsum dolor")
  })

  it("renders editable fields", () => {
    const component = mount(
      <VideoAbout
        article={VideoArticle}
        editDescription={EditableChild("media.description")}
        editCredits={EditableChild("media.credit")}
      />
    )
    expect(component.text()).toMatch("Child media.description")
    expect(component.text()).toMatch("Child media.credit")
  })
})
