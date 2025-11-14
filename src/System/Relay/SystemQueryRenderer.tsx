import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import createLogger from "Utils/logger"
import type * as React from "react"
import {
  type JSXElementConstructor,
  type ReactElement,
  cloneElement,
  useState,
} from "react"
import { isForwardRef } from "react-is"
import {
  type Environment,
  type FetchPolicy,
  QueryRenderer,
  type QueryRendererProps,
} from "react-relay"
import type { CacheConfig, OperationType } from "relay-runtime"

export type SystemQueryRendererProps<T extends OperationType> = Omit<
  QueryRendererProps<T>,
  "render" | "environment" | "variables"
> & {
  debugPlaceholder?: boolean
  lazyLoad?: boolean
  lazyLoadThreshold?: number
  placeholder?: ReactElement<any, string | JSXElementConstructor<any>>
  fetchPolicy?: FetchPolicy
  cacheConfig?: CacheConfig
  environment?: Environment
  variables?: QueryRendererProps<any>["variables"]
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
  environment: _environment,
  variables = {},
  render,
  ...rest
}: SystemQueryRendererProps<T>) {
  const isMounted = useDidMount()

  const [isEnteredView, setIsEnteredView] = useState(false)

  const { ref } = useIntersectionObserver({
    once: true,
    options: {
      threshold: 0,
      rootMargin: `${lazyLoadThreshold}px`,
    },
    onIntersection: () => {
      setIsEnteredView(true)
    },
  })

  const showPlaceholder =
    debugPlaceholder || !isMounted || (lazyLoad && !isEnteredView)

  const { relayEnvironment } = useSystemContext()

  const environment = _environment ?? relayEnvironment

  if (!environment) {
    logger.warn("Requires an environment")
    return <></>
  }

  if (lazyLoad && showPlaceholder && isForwardRef(placeholder)) {
    return cloneElement(placeholder, { ref: ref as any })
  }

  if (showPlaceholder) {
    // NOTE: If your placeholder does not forwardRef we have to insert a span.
    // It's possible that this alters the layout slightly. For instance in certain flex or grid contexts.
    return (
      <>
        {lazyLoad && <span ref={ref as any} />}
        {placeholder}
      </>
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

const logger = createLogger("System/Relay/SystemQueryRenderer.tsx")
