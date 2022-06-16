import * as React from "react";
import { ReactElement } from "react"
import { Portal, Position, TransitionCallbacks } from "react-overlays"
import { TransitionProps } from "react-transition-group/Transition"

/**
 * As of writing the `Overlay.OverlayProps` interface is not exposed as a
 * public interface. In order to give the best possible DX for the user of this
 * component, the entire `Overlay.OverlayProps` has been copied to this file.
 * Once the interface is exposed upstream we should be able to replace it.
 *
 * Source: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/26b07e59/types/react-overlays/lib/Overlay.d.ts#L11-L34
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */
export interface OverlayTriggerProps
  extends TransitionCallbacks,
    Portal.PortalProps,
    Position.PositionProps {
  /**
   * Overlay component to show when the `show` prop is `true`.
   *
   * This is the only custom property that is not part of the original
   * `Overlay.OverlayProps` interface.
   */
  overlay: ReactElement<any>

  /**
   * Set the visibility of the Overlay
   */
  show?: boolean

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose?: boolean

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   */
  onHide?(props: Portal.PortalProps, ...args: any[]): any

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  transition?: React.ComponentType<TransitionProps>
}
