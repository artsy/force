import { LabeledInput, Text } from "@artsy/palette"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import { ProvenanceModal } from "Apps/MyCollection/Routes/EditArtwork/Components/ProvenanceModal"
import { ReactWrapper } from "enzyme"
import { Formik } from "formik"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
  SubmissionType,
} from "Apps/Consign/Routes/SubmissionFlow/ArtworkDetails/Components/ArtworkDetailsForm"
import { mount } from "DevTools/mountWithMockBoot"

const renderArtworkForm = (values: ArtworkDetailsFormModel) =>
  mount(
    <Formik initialValues={values} onSubmit={jest.fn()}>
      <ArtworkDetailsForm />
    </Formik>
  )

describe("ArtworkDetailsForm", () => {
  let wrapper: ReactWrapper
  beforeAll(() => {
    wrapper = renderArtworkForm(
      getArtworkDetailsFormInitialValues({ type: SubmissionType.default })
    )
  })

  it("renders correctly initial fields", () => {
    expect(
      wrapper.find("input[data-test-id='autocomplete-input']").length
    ).toBe(1)
    expect(wrapper.find("input[name='year']").length).toBe(1)
    expect(wrapper.find("input[name='title']").length).toBe(1)
    expect(wrapper.find("input[name='materials']").length).toBe(1)
    expect(wrapper.find("select[name='rarity']").length).toBe(1)
    expect(wrapper.find("input[name='height']").length).toBe(1)
    expect(wrapper.find("input[name='width']").length).toBe(1)
    expect(wrapper.find("input[name='depth']").length).toBe(1)
    expect(wrapper.find("Radio[value='in']").length).toBe(1)
    expect(wrapper.find("Radio[value='cm']").length).toBe(1)
    expect(wrapper.find("input[name='provenance']").length).toBe(1)
    expect(wrapper.find("input[name='location']").length).toBe(1)
  })

  describe("Rarity", () => {
    it("if not 'Limited Edition' doesn't render Edition fields", () => {
      expect(wrapper.find("input[name='editionNumber']").length).toBe(0)
      expect(wrapper.find("input[name='editionSize']").length).toBe(0)

      wrapper.find("select[name='rarity']").simulate("change", {
        target: { name: "rarity", value: "unique" },
      })

      expect(wrapper.find("input[name='editionNumber']").length).toBe(0)
      expect(wrapper.find("input[name='editionSize']").length).toBe(0)

      wrapper.find("select[name='rarity']").simulate("change", {
        target: { name: "rarity", value: "open edition" },
      })

      expect(wrapper.find("input[name='editionNumber']").length).toBe(0)
      expect(wrapper.find("input[name='editionSize']").length).toBe(0)

      wrapper.find("select[name='rarity']").simulate("change", {
        target: { name: "rarity", value: "unknown edition" },
      })

      expect(wrapper.find("input[name='editionNumber']").length).toBe(0)
      expect(wrapper.find("input[name='editionSize']").length).toBe(0)
    })

    it("if 'Limited Edition' renders Edition fields", () => {
      wrapper.find("select[name='rarity']").simulate("change", {
        target: { name: "rarity", value: "limited edition" },
      })

      expect(wrapper.find("input[name='editionNumber']")).toBeTruthy()
      expect(wrapper.find("input[name='editionSize']")).toBeTruthy()
    })

    it("classifications modal", () => {
      expect(
        wrapper
          .find(ArtworkSidebarClassificationsModalQueryRenderer)
          .prop("show")
      ).toBe(false)

      wrapper
        .find("[data-test-id='open-rarity-modal']")
        .find(Text)
        .simulate("click")

      expect(
        wrapper
          .find(ArtworkSidebarClassificationsModalQueryRenderer)
          .prop("show")
      ).toBe(true)
    })
  })

  it("provenance modal", () => {
    expect(wrapper.find(ProvenanceModal).prop("show")).toBe(false)

    wrapper
      .find("[data-test-id='open-provenance-modal']")
      .find(Text)
      .simulate("click")

    expect(wrapper.find(ProvenanceModal).prop("show")).toBe(true)
  })

  it("if units are 'in' renders size fields correctly", () => {
    const sizeFields = wrapper
      .find(LabeledInput)
      .filterWhere(
        n => n.prop("title") !== "Artist" && n.prop("title") !== "City"
      )

    sizeFields.forEach((node: ReactWrapper) => {
      expect(node.text()).toContain("in")
    })
  })

  it("if units are 'cm' renders size fields correctly", () => {
    wrapper.find("Radio[value='cm']").simulate("click")
    const sizeFields = wrapper
      .find(LabeledInput)
      .filterWhere(
        n => n.prop("title") !== "Artist" && n.prop("title") !== "City"
      )

    sizeFields.forEach((node: ReactWrapper) => {
      expect(node.text()).toContain("cm")
    })
  })
})
