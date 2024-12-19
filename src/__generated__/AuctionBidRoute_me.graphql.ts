/**
 * @generated SignedSource<<6bf6124e1d984dcfcc9b672a8e0a4542>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionBidRoute_me$data = {
  readonly hasQualifiedCreditCards: boolean | null | undefined;
  readonly internalID: string;
  readonly " $fragmentType": "AuctionBidRoute_me";
};
export type AuctionBidRoute_me$key = {
  readonly " $data"?: AuctionBidRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionBidRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionBidRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasQualifiedCreditCards",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "53ac79ba5f41a07f6fcdd7d08141470f";

export default node;
