/**
 * @generated SignedSource<<fc0b4fcc8824d183554fcd91dabc9451>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBiddingClosedMessage_artwork$data = {
  readonly isEligibleToCreateAlert: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkCreateAlertButton_artwork">;
  readonly " $fragmentType": "ArtworkSidebarBiddingClosedMessage_artwork";
};
export type ArtworkSidebarBiddingClosedMessage_artwork$key = {
  readonly " $data"?: ArtworkSidebarBiddingClosedMessage_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarBiddingClosedMessage_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarBiddingClosedMessage_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkCreateAlertButton_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEligibleToCreateAlert",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "453e2bdd38cdc1aad372f2a6c56b61a2";

export default node;
