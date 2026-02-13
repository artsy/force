import { useBrazeSubscription } from "System/Hooks/useBrazeSubscription"

/**
 * Component that manages Braze subscription for logged-in users.
 * Must be rendered inside SystemContextProvider to access isLoggedIn state.
 */
export const BrazeSubscriptionManager: React.FC = () => {
  useBrazeSubscription()
  return null
}
