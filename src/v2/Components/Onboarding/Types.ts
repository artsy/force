import Artists from "./Steps/Artists"
import { BudgetComponent as Budget } from "./Steps/Budget"
import { CollectorIntentComponent as CollectorIntent } from "./Steps/CollectorIntent"
import Genes from "./Steps/Genes"

/**
 * The props interface that the step needs to implement for the wizard.
 */
export interface StepProps {
  onNextButtonPressed: (increaseBy?) => void
}

export interface StepComponent extends React.ComponentClass<StepProps> {
  slug?: string
}

export interface FollowProps {
  updateFollowCount: (count: number) => void
}

export type StepSlugs =
  | typeof Budget.slug
  | typeof Artists.slug
  | typeof Genes.slug
  | typeof CollectorIntent.slug
  | null
