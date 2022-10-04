/**
 * @generated SignedSource<<770c032ab24e571d7755a9463e34d771>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2BiddingClosedMessage_artwork$data = {
  readonly artists: ReadonlyArray<{
    readonly internalID: string;
  } | null> | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCreateAlertButton_artwork">;
  readonly " $fragmentType": "ArtworkSidebar2BiddingClosedMessage_artwork";
};
export type ArtworkSidebar2BiddingClosedMessage_artwork$key = {
  readonly " $data"?: ArtworkSidebar2BiddingClosedMessage_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2BiddingClosedMessage_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2BiddingClosedMessage_artwork",
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

(node as any).hash = "7140619b5751b530f177975064f33fb9";

export default node;
