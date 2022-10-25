import React from "react"
import { render, screen } from "@testing-library/react"
import {
  ArtQuizResultsLoader,
  waitTime,
} from "Apps/ArtQuiz/Components/ArtQuizResultsLoader"
import { act } from "react-dom/test-utils"

describe("Art Quiz Results Loader", () => {
  it("displays title text", () => {
    render(<ArtQuizResultsLoader />)
    expect(screen.queryByText("Art Taste Quiz")).toBeInTheDocument()
  })

  it("displays 'Calculating Results...' while results are loading", () => {
    render(<ArtQuizResultsLoader />)
    expect(screen.getByText("Calculating Results...")).toBeInTheDocument()
  })

  it("displays 'Results Complete' after 2 seconds", () => {
    jest.useFakeTimers()
    render(<ArtQuizResultsLoader />)
    act(() => {
      jest.advanceTimersByTime(waitTime)
    })
    expect(screen.getByText("Results Complete")).toBeInTheDocument()
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
})
