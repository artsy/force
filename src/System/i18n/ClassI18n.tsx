import * as React from "react"
import { TFunction, useTranslation } from "react-i18next"

interface ClassI18nProps {
  children:
    | React.ReactNode
    | (({ t }: { t: TFunction<"translation", undefined> }) => React.ReactNode)
}

export const ClassI18n = ({ children }: ClassI18nProps) => {
  const { t } = useTranslation()
  return <>{typeof children === "function" ? children({ t }) : children}</>
}
