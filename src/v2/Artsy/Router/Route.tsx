/**
 * Taken from @taion as per example of how they actually use found-relay and
 * have default setup for each route.
 */

import { RouteSpinner } from "v2/Artsy/Relay/renderWithLoadProgress"
import { HttpError } from "found"
import BaseRoute from "found/Route"
import React from "react"

type FetchIndicator = "spinner" | "overlay"

interface CreateRenderProps {
  fetchIndicator?: FetchIndicator
  render?: (props) => React.ReactNode
}

interface RenderArgProps {
  Component: React.ComponentType
  props?: object
  error?: Error
}

function createRender({
  fetchIndicator = "overlay",
  render,
}: CreateRenderProps) {
  return (renderArgs: RenderArgProps) => {
    const { Component, props, error } = renderArgs
    if (error) {
      if (error instanceof HttpError) {
        throw error
      }
      console.error(
        "[Artsy/Router/Route] Non HttpError rendering route:",
        error
      )
      return null
    }

    if (render) {
      return render(renderArgs)
    }

    if (Component === undefined) {
      return undefined
    }

    // This should only ever show when doing client-side routing.
    if (!props) {
      if (fetchIndicator === "spinner") {
        return <RouteSpinner />

        // TODO: At some point  we might want to make this a little fancier. If
        // undefined  is returned here, then we defer to `RenderStatus` component.
      } else if (fetchIndicator === "overlay") {
        /*
          In attempting to avoid the use of <StaticContainer> in RenderStatus.tsx,
          which freezes the component tree with `shouldComponentUpdate = false`,
          we stored the previously-rendered component and props in a variable and
          instead of returning undefined here, we returned <PrevComponent {...prevProps} />.

          However, when the component is rendered by react, it errors out because
          the data in prevProps has seemingly been garbage collected.

          Relay has the ability to `retain` data in the store. We should investigate,
          which would give us greater control over our component tree when top-level
          route transitions occur.

          See: https://graphql.slack.com/archives/C0BEXJLKG/p1561741782163900

          export const setLocal = (query: GraphQLTaggedNode, localData: object) => {
            const request = getRequest(query);
            const operation = createOperationDescriptor(request, {});

            env.commitPayload(operation, localData);
            env.retain(operation.root);  // <== here @en_js magic :wink:
          };
        */

        /**
         * Its an odd requirement, but the way in which one triggers RenderStatus
         * component updates is to return undefined.
         */
        return undefined

        // If for some reason something else is passed, fall back to the spinner
      } else {
        return <RouteSpinner />
      }
    }

    return <Component {...props} />
  }
}

export class Route extends BaseRoute {
  constructor(props) {
    if (!(props.query || props.getQuery)) {
      super(props)
      return
    }

    super({
      ...props,
      render: createRender(props),
    })
  }
}
