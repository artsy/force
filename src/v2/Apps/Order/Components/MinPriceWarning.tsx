import { Clickable, Message } from "@artsy/palette"

interface MinPriceWarningProps {
  isPriceRange: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  minPrice: string
}

export const MinPriceWarning: React.FC<MinPriceWarningProps> = ({
  onClick,
  isPriceRange,
  minPrice,
}) => (
  <Message variant="default" p={2} mt={2}>
    Galleries usually accept offers within
    {isPriceRange ? " the displayed price range" : " 20% of the listed price"}
    ; any lower is likely to be rejected.
    <br />
    <Clickable textDecoration="underline" cursor="pointer" onClick={onClick}>
      {`We recommend changing your offer to ${minPrice}.`}
    </Clickable>
  </Message>
)
