import React from "react"
import { BaseStickyContainer } from "./BaseStickyContainer"
import {
  SharedStickyContainerContextProps,
  StickyContainerContextProvider,
} from "./StickyContainerContext"

export const StickyContainer: React.FC<SharedStickyContainerContextProps> = ({
  ContainerComponent,
  ...rest
}) => {
  return (
    <StickyContainerContextProvider ContainerComponent={ContainerComponent}>
      <BaseStickyContainer {...rest} />
    </StickyContainerContextProvider>
  )
}
