import { MockBoot } from "DevTools/MockBoot"
import { mount as __mount__ } from "enzyme"
import type { ReactNode } from "react"

export const mount = (children: ReactNode) => {
  return __mount__(<MockBoot>{children}</MockBoot>)
}
