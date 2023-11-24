import { isRelevantEvent } from "Apps/Conversations2/hooks/useGroupedMessages"

describe("isRelevantEvent", () => {
  it("should return true for relevant events", () => {
    const relevantEvent = {
      __typename: "CommerceOrderStateChangedEvent",
    }
    expect(isRelevantEvent(relevantEvent)).toBe(true)
  })

  it("should return false for irrelevant events", () => {
    const irrelevantEvent = {
      __typename: "SomeOtherEvent",
    }
    expect(isRelevantEvent(irrelevantEvent)).toBe(false)
  })

  it("should return false for messages", () => {
    const message = {
      __typename: "Message",
    }
    expect(isRelevantEvent(message)).toBe(false)
  })

  it("should return false for undefined input", () => {
    expect(isRelevantEvent(undefined)).toBe(false)
  })
})
