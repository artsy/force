import React, { useContext, useState } from "react"
import { BaseContainer, BaseContainerProps } from "./BaseContainer"

export interface StickyContainerContextProps {
  stuck?: boolean
  setStuck?: (value: boolean) => void
  ContainerComponent?: React.ComponentType<BaseContainerProps>
}

export const StickyContainerContext = React.createContext<
  StickyContainerContextProps
>({
  ContainerComponent: BaseContainer,
})

export type SharedStickyContainerContextProps = Pick<
  StickyContainerContextProps,
  "ContainerComponent"
>

export const StickyContainerContextProvider: React.FC<SharedStickyContainerContextProps> = ({
  children,
  ContainerComponent,
}) => {
  const [stuckVal, setStuck] = useState(false)

  const stickyContainerContext: StickyContainerContextProps = {
    stuck: stuckVal,
    setStuck,
    ContainerComponent: ContainerComponent || BaseContainer,
  }

  return (
    <StickyContainerContext.Provider value={stickyContainerContext}>
      {children}
    </StickyContainerContext.Provider>
  )
}

export const useStickyContainerContext = () => {
  const stickyContainerContext = useContext(StickyContainerContext)
  return stickyContainerContext
}
