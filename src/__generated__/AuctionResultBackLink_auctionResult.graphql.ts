/**
 * @generated SignedSource<<1fcb6d4614082cb4ceea571067e45b0d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResultBackLink_auctionResult$data = {
  readonly artist: {
    readonly name: string | null;
    readonly slug: string;
  } | null;
  readonly " $fragmentType": "AuctionResultBackLink_auctionResult";
};
export type AuctionResultBackLink_auctionResult$key = {
  readonly " $data"?: AuctionResultBackLink_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultBackLink_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionResultBackLink_auctionResult",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "2f89a2616ffb9e09b7da86f17009f40d";

export default node;
