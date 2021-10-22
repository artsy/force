import { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component"

const Ready = ({ onMount }) => {
  useEffect(onMount, [onMount])
  return null
}

interface LazyLoadComponentProps {
  threshold?: number
}

/**
 * Simple hooks wrapper around LazyLoadComponent.
 * Allows one to swap out components once the `Waypoint` appears on screen.
 */
export const useLazyLoadComponent = ({
  threshold = 1000,
}: LazyLoadComponentProps = {}) => {
  const [isEnteredView, setIsEnteredView] = useState(false)

  const Waypoint = () => (
    <>
      {/*
       * While although I have no reason to believe this client-side only check is necessary,
       * it was wrapping every instance of this library, so it's been copied here.
       * In the future we should replace this library with a simple intersection observer hook.
       */}
      {typeof window !== "undefined" && (
        <LazyLoadComponent threshold={threshold} style={{ display: "inline" }}>
          <Ready
            onMount={() => {
              setIsEnteredView(true)
            }}
          />
        </LazyLoadComponent>
      )}
    </>
  )

  return { isEnteredView, Waypoint }
}
