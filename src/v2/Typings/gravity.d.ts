type User =
  | {
      roles?: UserRole[]
      accessToken?: string
      appToken?: string
      email?: string
      has_partner_access?: string
      id?: string
      lab_features?: string[]
      type?: string
      name?: string
      phone?: string
    }
  | null
  | undefined

/**
 * Determinies permissions/access granted to CurrentUser.
 * See https://github.com/artsy/gravity/blob/master/config/initializers/_user_roles.rb
 */
type UserRole =
  | "admin"
  | "billing_admin"
  | "customer_support"
  | "genomer"
  | "metadata_admin"
  | "partner_support"
  | "role_manager"
  | "sales_admin"
  | "sales_observer"
  | "team"
  | "user"
  | "verification_admin"
