import React from "react"
import { mount } from "enzyme"
import { FairEditorialShare } from "../FairEditorial/FairEditorialShare"

describe("FariEditorialShare", () => {
  it("renders the share buttons", () => {
    const wrapper = mount(
      <FairEditorialShare
        subject="Example subject"
        url="https://www.example.com/"
      />
    )

    const html = wrapper.html()

    expect(html).toContain(
      "https://www.facebook.com/sharer/sharer.php?u=https://www.example.com/"
    )
    expect(html).toContain(
      "mailto:?subject=Example subject&amp;amp;body=Check out Example subject on Artsy: https://www.example.com/"
    )
    expect(html).toContain(
      "https://www.facebook.com/sharer/sharer.php?u=https://www.example.com/"
    )
  })
})
