import React, { useEffect, useState } from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"

const Ready = ({ onMount }) => {
  useEffect(onMount, [onMount])
  return null
}

/**
 * Simple hooks wrapper around LazyLoadComponent.
 * Allows one to swap out components once the `Waypoint` appears on screen.
 */
export const useLazyLoadComponent = () => {
  const [isEnteredView, setIsEnteredView] = useState(false)

  const Waypoint = () => (
    <LazyLoadComponent style={{ display: "inline" }}>
      <Ready
        onMount={() => {
          setIsEnteredView(true)
        }}
      />
    </LazyLoadComponent>
  )

  return { isEnteredView, Waypoint }
}
