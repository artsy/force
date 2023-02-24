import {
  MediaQueryMatches,
  ResponsiveProviderProps as _ResponsiveProviderProps,
  createResponsiveComponents,
} from "@artsy/fresnel/dist/DynamicResponsive"
import { themeProps } from "@artsy/palette"
import * as React from "react"
import * as sharify from "sharify"

type MediaQuery = keyof typeof themeProps["mediaQueries"]

const ResponsiveComponents = createResponsiveComponents<MediaQuery>()

export class Responsive extends React.Component<
  React.ConsumerProps<MediaQueryMatches<MediaQuery>>
> {
  static displayName = "DeprecatedResponsive"

  componentDidMount() {
    // TODO: We should look into making React’s __DEV__ available and have
    //       webpack completely compile these away.
    if (sharify.data.NODE_ENV !== "production" && typeof jest === "undefined") {
      let ownerName
      try {
        const owner = (this as any)._reactInternalFiber._debugOwner.type
        ownerName = owner.displayName || owner.name
      } catch (err) {
        // no-op
      }
      console.warn(
        `[Responsive] The Responsive component has been deprecated in ` +
          `favour of the Media component.${
            ownerName ? ` It is being used in the ${ownerName} component.` : ""
          }`
      )
    }
  }

  render() {
    return <ResponsiveComponents.Consumer {...this.props} />
  }
}

// TODO Once we consider the deprecation period of the previous ‘beakpoint’
//      centric API to be over, we can replace the wrapper with just this line.
//
// export const ResponsiveProvider = Responsive.Provider

export type Breakpoint = keyof typeof themeProps["grid"]["breakpoints"]

interface DeprecatedResponsiveProviderProps {
  initialBreakpoint?: Breakpoint
  breakpoints: { [K in Breakpoint]: string }
  children: React.ReactNode
}

type NewResponsiveProviderProps = _ResponsiveProviderProps<MediaQuery>
export type MatchingMediaQueries = NewResponsiveProviderProps["initialMatchingMediaQueries"]

// Using a union here means that the component can either be used using the new
// API or the deprecated one.
type ResponsiveProviderProps =
  | NewResponsiveProviderProps
  | DeprecatedResponsiveProviderProps

export const ResponsiveProvider: React.SFC<ResponsiveProviderProps> = props => {
  const {
    initialMatchingMediaQueries,
    mediaQueries,
  } = props as NewResponsiveProviderProps
  const {
    initialBreakpoint,
    breakpoints,
  } = props as DeprecatedResponsiveProviderProps

  if (initialBreakpoint) {
    console.warn(
      "[Responsive] The usage of `initialBreakpoint` is deprecated, use " +
        "`initialMatchingMediaQueries` instead."
    )
  }

  if (breakpoints) {
    console.warn(
      "[Responsive] The usage of `breakpoints` is deprecated, use " +
        "`mediaQueries` instead."
    )
  } else if (!mediaQueries) {
    throw new Error(
      "[Responsive] If no `breakpoints` are specified, then `mediaQueries` " +
        "is required."
    )
  }

  return (
    <ResponsiveComponents.Provider
      mediaQueries={
        mediaQueries ||
        (breakpoints as NewResponsiveProviderProps["mediaQueries"])
      }
      initialMatchingMediaQueries={
        initialMatchingMediaQueries ||
        (initialBreakpoint && [initialBreakpoint])
      }
    >
      {props.children}
    </ResponsiveComponents.Provider>
  )
}
