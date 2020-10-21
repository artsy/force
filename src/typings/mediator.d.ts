import { ModalOptions } from "v2/Components/Authentication/Types"

export type MediatorEventOptions =
  | ModalOptions
  | LogoutEventOptions
  | ArtworkEventOptions
  | ViewInRoomEventOptions
  | IntercomEventOptions
  | BuyerPremiumEventOptions

/**
 * Start an inquiry, or ask a specialist
 */
export interface ArtworkEventOptions {
  artworkId: string
}

/**
 *
 */
export interface BuyerPremiumEventOptions {
  auctionId: string
}

/**
 * Launch intercom from artwork
 */
export interface IntercomEventOptions {
  is_offerable: boolean
  is_acquireable: boolean
}

export type LogoutEventOptions = { redirectPath?: string }

/**
 * Open viewInRoom for artwork
 */
export interface ViewInRoomEventOptions {
  dimensions?: any
  image?: {
    url: string
    width: any
    height: any
  }
}
