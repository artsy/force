import { render, screen } from "@testing-library/react"
import { ArtQuizResultsLoader } from "Apps/ArtQuiz/Components/ArtQuizResultsLoader"

// const translationObjectMock = {
//   artQuizPage: {
//     title: "Art Quiz",
//     loadingScreen: {
//       calculatingResults: "foo",
//       resultsComplete: "bar",
//     }

//   }
// }

// jest.mock("react-i18next", () => ({
//   useTranslation: () => ({
//   t: jest.fn((key: string) => {
//     return translationObjectMock[key]
//   })})
// }))

describe("Art Quiz Results Loader", () => {
  it("displays correct copy text when whatever", () => {
    //this correct copy text is in the document based on
    render(<ArtQuizResultsLoader />)
    expect(screen.getByText("artQuizPage.title")).toBeInTheDocument()
  })

  // it("displays correct copy text when whatever", () => {
  //   //this correct copy text is in the document based on
  // })
})
