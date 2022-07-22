/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBiddingClosedMessage_artwork = {
    readonly artists: ReadonlyArray<{
        readonly internalID: string;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarCreateAlertButton_artwork">;
    readonly " $refType": "ArtworkSidebarBiddingClosedMessage_artwork";
};
export type ArtworkSidebarBiddingClosedMessage_artwork$data = ArtworkSidebarBiddingClosedMessage_artwork;
export type ArtworkSidebarBiddingClosedMessage_artwork$key = {
    readonly " $data"?: ArtworkSidebarBiddingClosedMessage_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarBiddingClosedMessage_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarBiddingClosedMessage_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCreateAlertButton_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '41d2b728262cda860e0937a3a9efb9aa';
export default node;
