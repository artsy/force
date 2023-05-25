import { FC } from "react"
import VisaIcon from "@artsy/icons/VisaIcon"
import MastercardIcon from "@artsy/icons/MastercardIcon"
import UnknownCardIcon from "@artsy/icons/UnknownCardIcon"
import AmexIcon from "@artsy/icons/AmexIcon"
import DiscoverIcon from "@artsy/icons/DiscoverIcon"
import { BoxProps } from "@artsy/palette"

export type Brand =
  | "Visa"
  | "MasterCard"
  | "American Express"
  | "Discover"
  | "Unknown"

export interface BrandCreditCardIconProps extends BoxProps {
  type: Brand
}

export const BrandCreditCardIcon: FC<BrandCreditCardIconProps> = ({
  type,
  ...rest
}) => {
  switch (type) {
    case "Visa":
      return <VisaIcon {...rest} />
    case "MasterCard":
      return <MastercardIcon {...rest} />
    case "American Express":
      return <AmexIcon {...rest} />
    case "Discover":
      return <DiscoverIcon {...rest} />
    default:
      return <UnknownCardIcon color="black30" {...rest} />
  }
}
