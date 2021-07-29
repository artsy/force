import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { QueryRenderer } from "react-relay"
import { OperationType } from "relay-runtime"

type QueryRendererProps = React.ComponentProps<typeof QueryRenderer>

export type SystemQueryRendererProps<T extends OperationType> = Omit<
  QueryRendererProps,
  "render" | "environment" | "variables"
> & {
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
  placeholder,
  environment,
  variables = {},
  render,
  ...rest
}: SystemQueryRendererProps<T>): JSX.Element {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!environment) {
    return <></>
  }

  if (isMounted) {
    return (
      <QueryRenderer<T>
        environment={environment}
        variables={variables}
        render={render}
        {...rest}
      />
    )
  }

  return placeholder ? <>{placeholder}</> : <></>
}
