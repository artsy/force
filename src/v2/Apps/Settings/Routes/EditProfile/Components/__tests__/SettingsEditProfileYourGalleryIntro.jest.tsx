import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SettingsEditProfileYourGalleryIntroFragmentContainer } from "../SettingsEditProfileYourGalleryIntro"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditProfileYourGalleryIntroFragmentContainer,
  query: graphql`
    query SettingsEditProfileYourGalleryIntro_Test_Query @relay_test_operation {
      me {
        ...SettingsEditProfileYourGalleryIntro_me
      }
    }
  `,
})

describe("SettingsEditProfileYourGalleryIntro", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Me: () => ({
        inquiryIntroduction: "To whom it may concern.",
      }),
    })

    expect(screen.getByText("Your Gallery Intro")).toBeInTheDocument()
    expect(screen.getByText("Preview")).toBeInTheDocument()
    expect(screen.getByText("To whom it may concern.")).toBeInTheDocument()
  })
})
