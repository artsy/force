import { mount } from "enzyme"
import { CountrySelect } from "../CountrySelect"

describe("CountrySelect", () => {
  // TODO: Chris, this test needs finishing.
  it.skip("triggers callback on change", done => {
    const wrapper = mount(
      <CountrySelect
        onSelect={() => {
          done()
        }}
      />
    )

    wrapper.find("select").simulate("change")
  })
})
