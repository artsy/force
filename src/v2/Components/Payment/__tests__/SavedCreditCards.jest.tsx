import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import {
  deletingCreditCardFailed,
  deletingCreditCardSuccess,
} from "v2/Components/Payment/__fixtures__/deleteCreditCard"
import {
  CreditCard,
  RemoveLink,
  SavedCreditCards,
} from "v2/Components/Payment/SavedCreditCards"
import { mount } from "enzyme"
import React from "react"
import { RelayProp, commitMutation } from "react-relay"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

const mutationMock = commitMutation as jest.Mock<any>

describe("SavedCreditCards", () => {
  let testProps

  beforeEach(() => {
    mutationMock.mockReset()
    console.error = jest.fn()

    testProps = {
      me: { id: "1234" },
      creditCards: [
        {
          internalID: "cc-db-id-1224",
          brand: "Visa",
          lastDigits: "1224",
          expirationYear: "2020",
          expirationMonth: "05",
        },
        {
          internalID: "cc-db-id-2345",
          brand: "Visa",
          lastDigits: "2345",
          expirationYear: "2024",
          expirationMonth: "07",
        },
      ],
      relay: { environment: {} } as RelayProp,
      stripe: jest.fn(),
    }
  })

  it("displays credit card details", () => {
    const creditCardsWrapper = mount(<SavedCreditCards {...testProps} />)
    expect(creditCardsWrapper.find(CreditCard).length).toBe(2)
    expect(
      creditCardsWrapper
        .find(CreditCard)
        .first()
        .text()
    ).toMatchInlineSnapshot(`"visa•••• 1224   Exp 05/20Remove"`)
    expect(
      creditCardsWrapper
        .find(CreditCard)
        .last()
        .text()
    ).toMatchInlineSnapshot(`"visa•••• 2345   Exp 07/24Remove"`)
  })

  it("lets you remove a credit card", () => {
    const creditCardsWrapper = mount(<SavedCreditCards {...testProps} />)

    mutationMock.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(deletingCreditCardSuccess)
    )

    creditCardsWrapper
      .find(CreditCard)
      .first()
      .find(RemoveLink)
      .simulate("click")

    expect(mutationMock).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        variables: {
          input: {
            id: "cc-db-id-1224",
          },
        },
      })
    )

    expect(
      creditCardsWrapper
        .find(ErrorModal)
        .first()
        .props().show
    ).toBe(false)
  })

  it("shows an error modal if there is an error deleting the credit card", () => {
    const creditCardsWrapper = mount(<SavedCreditCards {...testProps} />)

    mutationMock.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(deletingCreditCardFailed)
    )

    creditCardsWrapper
      .find(CreditCard)
      .first()
      .find(RemoveLink)
      .simulate("click")

    expect(
      creditCardsWrapper
        .find(ErrorModal)
        .first()
        .props().show
    ).toBe(true)
  })

  it("shows an error modal if there is a network error", () => {
    const creditCardsWrapper = mount(<SavedCreditCards {...testProps} />)

    mutationMock.mockImplementationOnce((_, { onError }) =>
      onError(new TypeError("Network request failed"))
    )

    creditCardsWrapper
      .find(CreditCard)
      .first()
      .find(RemoveLink)
      .simulate("click")

    expect(
      creditCardsWrapper
        .find(ErrorModal)
        .first()
        .props().show
    ).toBe(true)
  })
})
