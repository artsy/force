import { ProgressDots, Spacer } from "@artsy/palette"
import React from "react"
import { Children } from "react"
import { useState } from "react"
import { HomeSwiper } from "../HomeSwiper"

export const HomeHeroUnitsSmall: React.FC = ({ children }) => {
  const length = Children.count(children)

  const [index, setIndex] = useState(0)

  return (
    <>
      <HomeSwiper onChange={setIndex}>{children}</HomeSwiper>

      <Spacer mt={4} />

      <ProgressDots variant="dash" amount={length} activeIndex={index} />
    </>
  )
}
