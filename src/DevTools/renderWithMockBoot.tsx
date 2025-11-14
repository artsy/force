import { MockBoot } from "DevTools/MockBoot"
import { render as __render__ } from "@testing-library/react"
import type { ReactNode } from "react"

export const render = (children: ReactNode) => {
  return __render__(<MockBoot>{children}</MockBoot>)
}
