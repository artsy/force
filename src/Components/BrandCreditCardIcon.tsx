import AmexIcon from "@artsy/icons/AmexIcon"
import CartesBancairesIcon from "@artsy/icons/CartesBancairesIcon"
import DinersClubIcon from "@artsy/icons/DinersClubIcon"
import DiscoverIcon from "@artsy/icons/DiscoverIcon"
import JcbIcon from "@artsy/icons/JcbIcon"
import MastercardIcon from "@artsy/icons/MastercardIcon"
import UnionPayIcon from "@artsy/icons/UnionPayIcon"
import UnknownCardIcon from "@artsy/icons/UnknownCardIcon"
import VisaIcon from "@artsy/icons/VisaIcon"
import type { BoxProps } from "@artsy/palette"
import type { FC } from "react"

export type Brand =
  | "Visa"
  | "MasterCard"
  | "American Express"
  | "Discover"
  | "Cartes Bancaires"
  | "Diners Club"
  | "JCB"
  | "UnionPay"
  | "Unknown"

export interface BrandCreditCardIconProps extends BoxProps {
  type: Brand
}

export const BrandCreditCardIcon: FC<
  React.PropsWithChildren<BrandCreditCardIconProps>
> = ({ type, ...rest }) => {
  switch (type) {
    case "Visa":
      return <VisaIcon {...rest} />
    case "MasterCard":
      return <MastercardIcon {...rest} />
    case "American Express":
      return <AmexIcon {...rest} />
    case "Discover":
      return <DiscoverIcon {...rest} />
    case "Cartes Bancaires":
      return <CartesBancairesIcon {...rest} />
    case "Diners Club":
      return <DinersClubIcon {...rest} />
    case "JCB":
      return <JcbIcon {...rest} />
    case "UnionPay":
      return <UnionPayIcon {...rest} />
    default:
      return <UnknownCardIcon color="mono30" {...rest} />
  }
}
