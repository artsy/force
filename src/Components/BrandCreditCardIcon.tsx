import { FC } from "react"
import VisaIcon from "@artsy/icons/VisaIcon"
import MastercardIcon from "@artsy/icons/MastercardIcon"
import UnknownCardIcon from "@artsy/icons/UnknownCardIcon"
import AmexIcon from "@artsy/icons/AmexIcon"
import DiscoverIcon from "@artsy/icons/DiscoverIcon"
import CartesBancairesIcon from "@artsy/icons/CartesBancairesIcon"
import DinersClubIcon from "@artsy/icons/DinersClubIcon"
import JcbIcon from "@artsy/icons/JcbIcon"
import UnionPayIcon from "@artsy/icons/UnionPayIcon"
import { BoxProps } from "@artsy/palette"

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
      return <UnknownCardIcon color="black30" {...rest} />
  }
}
