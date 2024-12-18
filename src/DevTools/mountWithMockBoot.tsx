import { mount as __mount__ } from "enzyme"
import { MockBoot } from "DevTools/MockBoot"
import type { ReactNode } from "react"

export const mount = (children: ReactNode) => {
  return __mount__(<MockBoot>{children}</MockBoot>)
}
