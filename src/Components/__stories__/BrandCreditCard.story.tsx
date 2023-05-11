import { States } from "storybook-states"
import {
  BrandCreditCardIcon,
  BrandCreditCardIconProps,
} from "Components/BrandCreditCardIcon"

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
