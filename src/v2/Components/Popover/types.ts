export interface PopoverArrowPositionProps {
  arrowOffsetTop?: string
  arrowOffsetLeft?: string
}

export interface PopoverProps
  extends React.HTMLProps<HTMLDivElement>,
    PopoverArrowPositionProps {
  placement?: "top" | "right" | "bottom" | "left"
}
