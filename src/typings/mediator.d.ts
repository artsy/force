import { ModalOptions } from "v2/Components/Authentication/Types"

/**
 * Start an inquiry, or ask a specialist
 */
export interface ArtworkEventOptions {
  artworkId: string
}

/**
 * Open auction BuyerPremium from artwork page
 */
export interface BuyerPremiumEventOptions {
  auctionId: string
}

/**
 * Launch intercom from artwork page
 */
export interface IntercomEventOptions {
  is_offerable: boolean
  is_acquireable: boolean
}

/**
 * Logout user and optionally redirect
 */
export type LogoutEventOptions = { redirectPath?: string }

/**
 * Open viewInRoom from artwork page
 */
export interface ViewInRoomEventOptions {
  dimensions?: any
  image?: {
    url: string
    width: any
    height: any
  }
}
