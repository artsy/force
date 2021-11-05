import { ThemeProviderV3 } from "@artsy/palette"
import * as React from "react"
import { AuthStatic } from "./AuthStatic"

export const FullPageAuthStatic: React.FC = (props: any) => {
  return (
    <ThemeProviderV3>
      <AuthStatic {...props} />
    </ThemeProviderV3>
  )
}
