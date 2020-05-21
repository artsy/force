import { SectionData, SectionLayout } from "v2/Components/Publishing/Typings"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  getSectionMobilePadding,
  getSectionWidth,
  SectionContainer,
} from "../SectionContainer"
import { Text } from "../Text"

describe("SectionContainer", () => {
  let section: SectionData

  beforeEach(() => {
    section = {
      layout: "overflow_fillwidth" as SectionLayout,
      body: "<p>Hello, world!</p>",
      type: "text",
    }
  })

  describe("#getSectionWidth", () => {
    it("returns column_width by default", () => {
      expect(getSectionWidth()).toBe("680px")
    })

    it("returns a custom width if prop provided", () => {
      expect(getSectionWidth(section, "feature", 900)).toBe("900px")
    })

    describe("classic layout", () => {
      const articleLayout = "classic"

      it("returns correct width for overflow_fillwidth", () => {
        expect(getSectionWidth(section, articleLayout)).toBe("1100px")
      })

      it("returns correct width for column_width", () => {
        section.layout = "column_width"
        expect(getSectionWidth(section, articleLayout)).toBe("580px")
      })
    })

    describe("standard layout", () => {
      const articleLayout = "standard"

      it("returns correct width for overflow_fillwidth", () => {
        expect(getSectionWidth(section, articleLayout)).toBe("780px")
      })

      it("returns correct width for column_width", () => {
        section.layout = "column_width"
        expect(getSectionWidth(section, articleLayout)).toBe("680px")
      })

      it("returns correct width for blockquotes", () => {
        section.body = "<blockquote>Hello, world!</blockquote>"
        expect(getSectionWidth(section, articleLayout)).toBe("780px")
      })
    })

    describe("feature layout", () => {
      const articleLayout = "feature"

      it("returns correct width for overflow_fillwidth", () => {
        expect(getSectionWidth(section, articleLayout)).toBe("780px")
      })

      it("returns correct width for column_width", () => {
        section.layout = "column_width"
        expect(getSectionWidth(section, articleLayout)).toBe("680px")
      })

      it("returns correct width for fillwidth", () => {
        section.layout = "fillwidth"
        expect(getSectionWidth(section, articleLayout)).toBe("100%")
      })

      it("returns correct width for blockquotes", () => {
        section.body = "<blockquote>Hello, world!</blockquote>"
        expect(getSectionWidth(section, articleLayout)).toBe("900px")
      })
    })
  })

  describe("#getSectionMobilePadding", () => {
    it("returns with padding by default", () => {
      expect(getSectionMobilePadding()).toBe("0 20px")
    })

    it("returns correct padding for video", () => {
      section.type = "video"
      expect(getSectionMobilePadding(section)).toBe(0)
    })

    it("returns correct padding for image_collection", () => {
      section.type = "image_collection"
      expect(getSectionMobilePadding(section)).toBe(0)
    })

    it("returns correct padding for image_set", () => {
      section.type = "image_set"
      expect(getSectionMobilePadding(section)).toBe(0)
    })

    it("returns correct padding for mini image_set", () => {
      section.type = "image_set"
      section.layout = "mini"
      expect(getSectionMobilePadding(section)).toBe("0 20px")
    })
  })

  describe("Snapshots", () => {
    it("renders overflow_fillwidth properly", () => {
      const sectionContainer = renderer
        .create(
          <SectionContainer section={section} articleLayout="standard">
            <Text html={section.body} layout="standard" />
          </SectionContainer>
        )
        .toJSON()
      expect(sectionContainer).toMatchSnapshot()
    })

    it("renders fillwidth properly", () => {
      section.layout = "fillwidth"
      const sectionContainer = renderer
        .create(
          <SectionContainer section={section} articleLayout="standard">
            <Text html={section.body} layout="standard" />
          </SectionContainer>
        )
        .toJSON()
      expect(sectionContainer).toMatchSnapshot()
    })

    it("renders column_width properly", () => {
      section.layout = "column_width"
      const sectionContainer = renderer
        .create(
          <SectionContainer section={section} articleLayout="standard">
            <Text html={section.body} layout="standard" />
          </SectionContainer>
        )
        .toJSON()
      expect(sectionContainer).toMatchSnapshot()
    })
  })
})
