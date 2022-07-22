import { Spinner, SpinnerProps } from "@artsy/palette"
import * as React from "react"
import { QueryRenderer, Container as RelayContainer } from "react-relay"
import styled from "styled-components"
import createLogger from "Utils/logger"

type ReadyState = Parameters<
  React.ComponentProps<typeof QueryRenderer>["render"]
>[0]

/**
 * WARNING: Do _not_ change this element to something common like a div. If the
 * element of this container is the same as the element used in the RelayContainer
 * then rehydration can fail and cause the RelayContainer to receive styles
 * from the SpinnerContainer and Spinner.
 */
const SpinnerContainer = styled.figure`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`

const RouteSpinnerContainer = styled.figure`
  width: 100%;
  height: 100px;
  position: relative;
`

export const RouteSpinner = () => {
  return (
    <RouteSpinnerContainer className={LoadingClassName}>
      <Spinner />
    </RouteSpinnerContainer>
  )
}

export const LoadingClassName = "relay-loading"

const handleError = error => {
  // In tests we want errors to clearly bubble up.
  if (typeof jest !== "undefined") {
    throw error
  }

  const logger = createLogger("Artsy/Relay/renderWithLoadProgress")

  if (error.message) {
    logger.error(error.message)
  }

  const networkError = error as any
  if (networkError.response && networkError.response._bodyInit) {
    const body = networkError.response._bodyInit
    try {
      const data = JSON.parse(body)
      console.error(`Metaphysics Error data:`, data)
      logger.error(data)
    } catch (e) {
      logger.error("Metaphysics Error could not be parsed.", e)
    }
  }
}

export type LoadProgressRenderer<P> = (
  // FIXME: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37950
  readyState: ReadyState
) => React.ReactElement<RelayContainer<P>> | null

export function renderWithLoadProgress<P>(
  Container: RelayContainer<P>,
  initialProps: object = {},
  wrapperProps: object = {},
  spinnerProps: SpinnerProps = {
    delay: 1000,
  }
): LoadProgressRenderer<P> {
  // TODO: We need design for retrying or the approval to use the iOS design.
  // See also: https://artsyproduct.atlassian.net/browse/PLATFORM-1272
  return ({ error, props, retry }) => {
    if (error) {
      // TODO: Should we add a callback here so that containers can gracefully
      //       handle an error state?
      handleError(error)
      return null
    } else if (props) {
      return <Container {...initialProps} {...(props as any)} />
    } else {
      return (
        <SpinnerContainer className={LoadingClassName} {...wrapperProps}>
          <Spinner {...spinnerProps} />
        </SpinnerContainer>
      )
    }
  }
}
