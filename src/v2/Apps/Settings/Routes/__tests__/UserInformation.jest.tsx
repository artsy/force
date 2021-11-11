// import { graphql } from "react-relay"
// import { createTestEnv } from "v2/DevTools/createTestEnv"
// import { UserInformationQueryResponse } from "v2/__generated__/UserInformationQuery.graphql"
// import { UserInformationRefetchContainer } from ".."
// import { UserInformationTestPage } from "./UserInformationTestPage"

// jest.unmock("react-relay")

// const defaultData = {
//   me: {
//     email: "foo@email.com",
//     internalID: "1234ABCD",
//     name: "Foo Bar",
//     paddleNumber: "12345",
//     phone: "555-123-4567",
//   },
// }

// const setupTestEnv = () => {
//   return createTestEnv({
//     Component: (props: UserInformationQueryResponse) => (
//       // @ts-expect-error STRICT_NULL_CHECK
//       <UserInformationRefetchContainer {...props} />
//     ),
//     TestPage: UserInformationTestPage,
//     defaultData,
//     defaultMutationResults: {
//       updateMyUserProfile: {
//         userOrError: {
//           __typename: "UpdateMyProfileMutationSuccess",
//           user: {
//             internalID: "foo",
//           },
//         },
//       },
//     },
//     query: graphql`
//       query UserInformationTestQuery {
//         me {
//           ...UserInformation_me
//         }
//       }
//     `,
//   })
// }

// describe("UserInformation", () => {
//   it("diplays expected fields", async () => {
//     const env = setupTestEnv()
//     const page = await env.buildPage()

//     expect(page.find("button[type='submit']").length).toBe(1)
//     expect(page.find("QuickInput[name='email']").props().value).toEqual(
//       defaultData.me.email
//     )
//     expect(page.find("QuickInput[name='name']").props().value).toEqual(
//       defaultData.me.name
//     )
//     expect(page.find("QuickInput[name='phone']").props().value).toEqual(
//       defaultData.me.phone
//     )
//     expect(page.find("QuickInput[name='paddleNumber']").props().value).toEqual(
//       defaultData.me.paddleNumber
//     )
//     expect(page.find("PasswordInput").length).toBe(0)
//   })

//   it("diplays password field if email address has changed", async () => {
//     const env = setupTestEnv()
//     const page = await env.buildPage()
//     await page.changeEmailInput()
//     expect(page.find("PasswordInput").length).toBe(1)
//     expect(page.html()).toMatch("Password is required to change email.")
//   })

//   it("does not show password when changing non-email fields", async () => {
//     const env = setupTestEnv()
//     const page = await env.buildPage()
//     await page.changeNameInput()
//     expect(page.find("PasswordInput").length).toBe(0)
//   })

//   it("displays client validation errors", async () => {
//     const env = setupTestEnv()
//     const page = await env.buildPage()
//     await page.changeNameInput("")
//     expect(page.html()).toMatch("Name is required.")
//   })

//   it("displays fieldErrors returned by gravity", async () => {
//     const env = setupTestEnv()
//     env.mutations.useResultsOnce({
//       updateMyUserProfile: {
//         userOrError: {
//           __typename: "UpdateMyProfileMutationFailure",
//           mutationError: {
//             detail: null,
//             error: null,
//             fieldErrors: [
//               {
//                 message: "Email address already exists",
//                 name: "email",
//               },
//             ],
//             message: "foo",
//             type: "error",
//           },
//         },
//       },
//     })
//     const page = await env.buildPage()
//     await page.clickSubmitButton()
//     expect(page.html()).toMatch("Email address already exists")
//   })

//   it("displays a generic error message returned by gravity", async () => {
//     const env = setupTestEnv()
//     env.mutations.useResultsOnce({
//       updateMyUserProfile: {
//         userOrError: {
//           __typename: "UpdateMyProfileMutationFailure",
//           mutationError: {
//             detail: null,
//             error: null,
//             fieldErrors: null,
//             message: "Password Invalid",
//             type: "error",
//           },
//         },
//       },
//     })
//     const page = await env.buildPage()
//     await page.clickSubmitButton()
//     expect(page.html()).toMatch("Password Invalid")
//   })
// })
