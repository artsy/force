import * as React from "react";
import { useState } from "react"

export interface UseDialogProps {
  Dialog: React.ComponentType<any>
  onShow?(): void
  onHide?(): void
}

export const useDialog = ({ Dialog, onShow, onHide }: UseDialogProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const showDialog = () => {
    setIsVisible(true)
    onShow?.()
  }

  const hideDialog = () => {
    setIsVisible(false)
    onHide?.()
  }

  const dialogComponent = <>{isVisible && <Dialog />}</>

  return { isVisible, showDialog, hideDialog, dialogComponent }
}
