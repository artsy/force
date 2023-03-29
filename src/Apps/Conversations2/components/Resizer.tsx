import { FC } from "react"
import { SplitPane, SplitPaneProps } from "react-multi-split-pane"
import { Box } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

export const Resizer: FC<SplitPaneProps> = ({ children, ...props }) => {
  return (
    <PaneWrapper>
      <SplitPane {...props}>{children}</SplitPane>
    </PaneWrapper>
  )
}

const PaneWrapper = styled(Box)`
  .Resizer {
    background: ${themeGet("color.black15")};
    z-index: 1;
    box-sizing: border-box;
    background-clip: padding-box;
  }

  .Resizer:hover {
    transition: all 0.2s ease;
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    cursor: row-resize;
  }

  .Resizer.vertical {
    width: 10px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  /* SplitPane has its height predefined to 100% which doesn't have into account
  the height of our header, so it pushes the layout below the viewport. Also note
  that SplitPane doesn't allow to override its predefined styling via props */
  .SplitPane.vertical {
    height: auto !important;
  }

  .DragLayer {
    z-index: 1;
    pointer-events: none;
  }

  .DragLayer.resizing {
    pointer-events: auto;
  }

  .DragLayer.horizontal {
    cursor: row-resize;
  }

  .DragLayer.vertical {
    cursor: col-resize;
  }
`
