import { AnalyticsSchema } from "v2/System/Analytics"
import { mount } from "enzyme"
import * as React from "react"
import { renderToString } from "react-dom/server"
import { track } from "../track"
import { useTracking } from "../useTracking"

jest.mock("../useTracking")

describe("useTracking", () => {
  it("throws error if tracking context not present", () => {
    ;(useTracking as jest.Mock).mockImplementationOnce(
      jest.requireActual("../useTracking").useTracking
    )

    const ThrowMissingContext = () => {
      useTracking()
      return <div>hi</div>
    }
    try {
      renderToString(<ThrowMissingContext />)
    } catch (error) {
      expect(error.message).toContain(
        "Error: Attempting to call `useTracking` without a ReactTrackingContext present"
      )
    }
  })

  it("returns a react-tracking trackEvent object, that tracks events", () => {
    const trackEventFn = jest.fn()
    ;(useTracking as jest.Mock).mockImplementationOnce(() => ({
      trackEvent: trackEventFn,
    }))

    const App: React.FC = track()(() => {
      const { trackEvent } = useTracking()
      return (
        <div
          onClick={() =>
            trackEvent({
              action_type: AnalyticsSchema.ActionType.Click,
            })
          }
        >
          hi
        </div>
      )
    })

    const wrapper = mount(<App />)
    wrapper.simulate("click")
    expect(trackEventFn).toHaveBeenCalledWith({
      action_type: AnalyticsSchema.ActionType.Click,
    })
  })
})
