import React from "react"
import { QueryRenderer } from "react-relay"
import { OperationType } from "relay-runtime"
import { useDidMount } from "v2/Utils/Hooks/useDidMount"
import { useLazyLoadComponent } from "v2/Utils/Hooks/useLazyLoadComponent"

type QueryRendererProps = React.ComponentProps<typeof QueryRenderer>

export type SystemQueryRendererProps<T extends OperationType> = Omit<
  QueryRendererProps,
  "render" | "environment" | "variables"
> & {
  debugPlaceholder?: boolean
  lazyLoad?: boolean
  lazyLoadThreshold?: number
  placeholder?: React.ReactNode
  environment?: QueryRendererProps["environment"]
  variables?: QueryRendererProps["variables"]
  render(renderProps: {
    error: Error | null
    props: T["response"] | null
    retry: (() => void) | null
  }): React.ReactNode
}

export function SystemQueryRenderer<T extends OperationType>({
  debugPlaceholder = false,
  lazyLoad = false,
  lazyLoadThreshold = 1500,
  placeholder,
  environment,
  variables = {},
  render,
  ...rest
}: SystemQueryRendererProps<T>): JSX.Element {
  const isMounted = useDidMount()
  const { isEnteredView, Waypoint } = useLazyLoadComponent({
    threshold: lazyLoadThreshold,
  })
  const showPlaceholder =
    debugPlaceholder || !isMounted || (lazyLoad && !isEnteredView)

  if (!environment) {
    return <></>
  }

  if (showPlaceholder) {
    return (
      <>
        {lazyLoad && <Waypoint />}
        {placeholder ? <>{placeholder}</> : <></>}
      </>
    )
  }

  if (lazyLoad && isEnteredView) {
    return (
      <QueryRenderer<T>
        environment={environment}
        variables={variables}
        render={render}
        {...rest}
      />
    )
  }

  return (
    <QueryRenderer<T>
      environment={environment}
      variables={variables}
      render={render}
      {...rest}
    />
  )
}
