import { useContext, useState } from "react";
import * as React from "react";
import { usePrevious } from "v2/Utils/Hooks/usePrevious"

export interface PartnerShowBannersContextProps {
  currentPage?: number
  previousPage?: number
  setCurrentPage?: (val: number) => void
}

export type SharedPartnerShowBannersContextProps = PartnerShowBannersContextProps

export const PartnerShowBannersContext = React.createContext<
  PartnerShowBannersContextProps
>({})

export const PartnerShowBannersContextProvider: React.FC<SharedPartnerShowBannersContextProps> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const previousPage = usePrevious(currentPage)

  const partnerShowBannersContext: PartnerShowBannersContextProps = {
    currentPage,
    previousPage,
    setCurrentPage,
  }

  return (
    <PartnerShowBannersContext.Provider value={partnerShowBannersContext}>
      {children}
    </PartnerShowBannersContext.Provider>
  )
}

export const usePartnerShowBannersContext = () => {
  const partnerShowBannersContext = useContext(PartnerShowBannersContext)
  return partnerShowBannersContext
}
