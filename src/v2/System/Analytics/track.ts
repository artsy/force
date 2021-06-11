// tslint:disable:array-type

import _track, { Decorator, Options } from "react-tracking"
import { Trackables } from "./Schema"

/**
 * Use this interface to augment the `track` function with props or state.  The
 * data recorded with this interface should match any of the entries in the
 * `Trackables` union.
 *
 * It can be used for either one-off uses:
 *
 * @example
 *
 *      ```ts
 *      import { track } from "v2/Artsy/Analytics"
 *
 *      interface Props {
 *        artist: {
 *          id: string
 *          slug: string
 *        }
 *      }
 *
 *      interface State {
 *        following: boolean
 *      }
 *
 *      @track<Props>(props => ({
 *        context_page: Schema.
 *        context_page_owner_id: props.artist._id,
 *        context_page_owner_type: Schema.OwnerType.Artist,
 *        context_page_owner_slug: props.artist.id,
 *      }))
 *      class Artist extends React.Component<Props, State> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track<Props, State>((props, state) => ({
 *          action_type: Schema.ActionType.Click,
 *          action_name: state.following ? Schema.ActionName.ArtistUnfollow : Schema.ActionName.ArtistFollow,
 *          subject: state.following ? "Unfollow Artist" : "Follow Artist"
 *        }))
 *        handleFollow(event) {
 *          // ...
 *        }
 *      }
 *
 *      ```
 *
 * … or stored for usage throughout a module:
 *
 * @example
 *
 *      ```ts
 *      import { track as _track, Track } from "v2/Artsy/Analytics"
 *
 *      interface Props {
 *        artist: {
 *          id: string
 *          slug: string
 *        }
 *      }
 *
 *      interface State {
 *        following: boolean
 *      }
 *
 *      const track: Track<Props, State> = _track
 *
 *      @track(props => ({
 *        context_page: Schema.
 *        context_page_owner_id: props.artist._id,
 *        context_page_owner_type: Schema.OwnerType.Artist,
 *        context_page_owner_slug: props.artist.id,
 *      }))
 *      class Artist extends React.Component<Props, State> {
 *        render() {
 *          return (
 *            <div onClick={this.handleFollow.bind(this)}>
 *              ...
 *            </div>
 *          )
 *        }
 *
 *        @track((props, state) => ({
 *          action_type: Schema.ActionType.Click,
 *          action_name: state.following ? Schema.ActionName.ArtistUnfollow : Schema.ActionName.ArtistFollow,
 *          subject: state.following ? "Unfollow Artist" : "Follow Artist"
 *        }))
 *        handleFollow(event) {
 *          // ...
 *        }
 *      }
 *
 *      ```
 */
export interface Track<PP = {}, SS = null, AA extends Array<any> = Array<any>> {
  // tslint:disable-next-line:callable-types
  <P = PP, S = SS, A extends any[] = AA>(
    trackingInfo?: Trackables | ((props: P, state: S, args: A) => Trackables),
    options?: Options<Trackables>
  ): Decorator
}

/**
 * This is the regular `track` function, but pre-typed using our schema.
 *
 * For its normal usage see the docs https://github.com/NYTimes/react-tracking
 *
 * One important gotcha that is easily overlooked is that you always need to
 * ‘enable’ tracking on a component before you can use it inside a component.
 *
 * @example
 *
 *     ```ts
 *     import React from "react"
 *     import { track } from "v2/Artsy/Analytics"
 *
 *     // This is what enables tracking for further use inside the component.
 *     @track()
 *     class Artist extends React.Component {
 *       // This only works with the above line that enables tracking.
 *       @track({ … })
 *       handleClick() { … }
 *     }
 */
export const track: Track = _track

/**
 * ## Writing tests for your tracked code
 *
 * By default we mock `react-tracking`, so it's not possible to test the code
 * easily.
 *
 * A good pattern for testing analytics code is to have a completely separate
 * file for the tests. For example: `__tests__/DateSource-analytics-tests.tsx`.
 * Jest has each test file run in a unique environment, so in that file we can
 * unmock `react-tracking`.
 *
 * Here's a full example:
 *
 * @example
 *
 *     ```ts
 *     import { mount } from "enzyme"
 *     import React from "react"
 *     import { mockTracking } from "v2/Artsy/Analytics"
 *     import { DateSource } from "../DateSource"
 *
 *     jest.unmock("react-tracking")
 *
 *     const NewsArticle = { news_source: { url: "http://nytimes.com" }}
 *
 *     describe("DateSource analytics", () => {
 *       it("tracks news source link", () => {
 *         const { Component, dispatch } = mockTracking(DateSource)
 *         const component = mount(<Component article={NewsArticle} />)
 *         component
 *           .find("a")
 *           .at(0)
 *           .simulate("click")
 *         expect(dispatch).toBeCalledWith({
 *           action: "Click",
 *           type: "external link",
 *           label: "news source",
 *           destination_path: "http://nytimes.com",
 *         })
 *       })
 *     })
 *     ```
 */
export function mockTracking<P>(
  Subject: React.ComponentType<P>
): {
  Component: React.ComponentType<P>
  dispatch: jest.Mock<(trackedData: Trackables) => void>
} {
  const dispatch = jest.fn() as jest.Mock<() => void>
  const Component = _track({}, { dispatch })(Subject)
  return { Component, dispatch }
}
