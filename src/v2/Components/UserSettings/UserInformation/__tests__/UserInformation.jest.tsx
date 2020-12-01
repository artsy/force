import React from "react"
import { graphql } from "react-relay"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { UserInformationQueryResponse } from "v2/__generated__/UserInformationQuery.graphql"
import { UserInformationRefetchContainer } from ".."
import { UserInformationTestPage } from "./UserInformationTestPage"

jest.unmock("react-relay")

const setupTestEnv = () => {
  return createTestEnv({
    Component: (props: UserInformationQueryResponse) => (
      <UserInformationRefetchContainer {...props} />
    ),
    TestPage: UserInformationTestPage,
    defaultData: {
      me: {
        email: "foo@email.com",
        internalID: "1234ABCD",
        name: "Foo Bar",
        paddleNumber: "12345",
        phone: "555-123-4567",
      },
    },
    defaultMutationResults: {
      updateMyUserProfile: {},
    },
    query: graphql`
      query UserInformationQuery {
        me {
          ...UserInformation_me
        }
      }
    `,
  })
}

describe("UserInformation", () => {
  it("diplays expected fields", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    expect(page.submitButton.exists).toBeTruthy
    expect(page.nameInput.exists).toBeTruthy
    expect(page.emailInput.exists).toBeTruthy
    expect(page.phoneInput.exists).toBeTruthy
    expect(page.paddleNumberInput.exists).toBeTruthy
    expect(page.passwordInput.exists).toBeFalsy
  })

  it("diplays password field if email address has changed", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.changeEmailInput()
    expect(page.passwordInput.exists).toBeTruthy
  })

  it("does not show password when changing non-email fields", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.changeNameInput()
    expect(page.passwordInput.exists).toBeFalsy
  })

  it("displays client validation errors", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.changeNameInput("")
    expect(page.html()).toMatch("Name is required.")
  })

  xit("displays fieldErrors returned by gravity", async () => {
    const env = setupTestEnv()
    env.mutations.useResultsOnce({
      updateMyUserProfile: {
        userOrError: {
          __typename: "UpdateMyProfileMutationFailure",
          mutationError: {
            detail: null,
            error: null,
            fieldErrors: null,
            message: "Password Invalid",
            type: "error",
          },
        },
      },
    })
    const page = await env.buildPage()
    await page.clickSubmitButton()
  })

  it("displays generic returned by gravity", () => {})
})
