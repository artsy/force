import { Button } from "@artsy/palette"
import { SendFeedback } from "v2/Apps/Search/Components/SendFeedback"
import { MockBoot } from "v2/DevTools"
import { ReactWrapper, mount } from "enzyme"
import { commitMutation as _commitMutation } from "react-relay"
import { Environment } from "relay-runtime"

const commitMutation = _commitMutation as jest.Mock<any>
const message = "cats are cool"
const successResponse = {
  sendFeedback: { feedbackOrError: { feedback: { message } } },
}

const simulateTypingMessage = (component, value) => {
  const textArea = component.find("textarea")
  // @ts-ignore
  textArea.getDOMNode().value = value
  textArea.simulate("change")
}

const simulateTypingNameAndEmail = (
  component: ReactWrapper,
  { name, email }
) => {
  const nameInput = component.find("input[name='name']")
  // @ts-ignore
  nameInput.getDOMNode().value = name
  nameInput.simulate("change")
  const emailInput = component.find("input[name='email']")
  // @ts-ignore
  emailInput.getDOMNode().value = email
  emailInput.simulate("change")
}

describe("SendFeedback", () => {
  const getWrapper = (opts = { user: { id: "blah" } }) => {
    const { user } = opts
    return mount(
      <MockBoot>
        <SendFeedback user={user} relayEnvironment={{} as Environment} />
      </MockBoot>
    )
  }

  beforeEach(() => {
    commitMutation.mockReset()
  })

  it("prompts for feedback", () => {
    const component = getWrapper()
    expect(component.text()).toContain("Tell us how we can improve")
    expect(component.find("textarea")).toHaveLength(1)
  })

  it("does not call the mutation without a message", () => {
    const component = getWrapper()
    component.find(Button).simulate("click")
    component.update()

    expect(commitMutation).not.toHaveBeenCalled()
  })

  describe("logged out", () => {
    it("does not call the mutation without a valid email", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const component = getWrapper({ user: null })
      simulateTypingNameAndEmail(component, {
        name: "Percy Z",
        email: "percy cant read",
      })
      simulateTypingMessage(component, message)
      component.find(Button).simulate("click")
      component.update()

      expect(commitMutation).not.toHaveBeenCalled()
    })

    it("calls the mutation with a valid email and name", () => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const component = getWrapper({ user: null })
      commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
        onCompleted(successResponse)
      })

      simulateTypingNameAndEmail(component, {
        name: "Percy Z",
        email: "percy@example.com",
      })
      simulateTypingMessage(component, message)

      component.find(Button).simulate("click")
      component.update()

      expect(commitMutation).toHaveBeenCalled()
    })
  })

  it("displays a thank-you after feedback is submitted", () => {
    const component = getWrapper()
    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(successResponse)
    })

    simulateTypingMessage(component, message)
    component.find(Button).simulate("click")
    component.update()

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(component.text()).toContain("Your message has been sent")
  })
})
