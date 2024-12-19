import {
  BrandCreditCardIcon,
  type BrandCreditCardIconProps,
} from "Components/BrandCreditCardIcon"
import { States } from "storybook-states"

export default {
  title: "Components/BrandCreditCardIcon",
}

export const Default = () => (
  <States<Partial<BrandCreditCardIconProps>>
    states={[
      { type: "Visa" },
      { type: "MasterCard" },
      { type: "American Express" },
      { type: "Discover" },
      { type: "Unknown" },
      { type: "Invalid" as any },
    ]}
  >
    <BrandCreditCardIcon type="Unknown" />
  </States>
)
