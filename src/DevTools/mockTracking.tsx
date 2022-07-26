import { Trackables } from "@artsy/cohesion/dist/DeprecatedSchema"
import track from "react-tracking"

export function mockTracking<P>(
  Subject: React.ComponentType<P>
): {
  Component: React.ComponentType<P>
  dispatch: jest.Mock<(trackedData: Trackables) => void>
} {
  const dispatch = jest.fn() as jest.Mock<() => void>
  const Component = track({}, { dispatch })(Subject)
  return { Component, dispatch }
}
