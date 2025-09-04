import { AboutNavExit, AboutNavProvider } from "Apps/About/Components/AboutNav"
import type { BaseLayoutProps } from "Apps/Components/Layouts"
import { LayoutFooter } from "Apps/Components/Layouts/Components/LayoutFooter"
import { LayoutDefault } from "Apps/Components/Layouts/LayoutDefault"
import type { FC } from "react"

export const AboutLayout: FC<React.PropsWithChildren<BaseLayoutProps>> = ({
  children,
}) => {
  return (
    <AboutNavProvider>
      <LayoutDefault
        footer={
          <AboutNavExit>
            <LayoutFooter />
          </AboutNavExit>
        }
      >
        {children}
      </LayoutDefault>
    </AboutNavProvider>
  )
}
