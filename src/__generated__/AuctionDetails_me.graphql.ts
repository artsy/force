/**
 * @generated SignedSource<<ff2876f28202d2731ef253d0118c4217>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionDetails_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RegisterButton_me">;
  readonly " $fragmentType": "AuctionDetails_me";
};
export type AuctionDetails_me$key = {
  readonly " $data"?: AuctionDetails_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionDetails_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionDetails_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RegisterButton_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "99e7922d777e0d474ee72139b799bd9f";

export default node;
