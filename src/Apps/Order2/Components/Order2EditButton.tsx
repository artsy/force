import { Clickable, Text } from "@artsy/palette"

interface Order2EditButtonProps {
  onClick: () => void
  "aria-label": string
  label?: string
}

export const Order2EditButton: React.FC<Order2EditButtonProps> = ({
  onClick,
  "aria-label": ariaLabel,
  label = "Edit",
}) => {
  return (
    <Clickable
      textDecoration="underline"
      cursor="pointer"
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <Text variant="sm" fontWeight="normal" color="mono100">
        {label}
      </Text>
    </Clickable>
  )
}
