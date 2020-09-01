import { AuthContextModule, OwnerType } from "@artsy/cohesion"

export interface FollowTrackingData {
  contextModule: AuthContextModule
  contextOwnerId?: string
  contextOwnerSlug?: string
  contextOwnerType: OwnerType
}

export interface FollowDeprecatedTrackingData {
  contextModule?: string
  entity_id?: string
  entity_slug?: string
  entity_type?: string
}
