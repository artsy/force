/**
 * @generated SignedSource<<ac3a96a73bc94e89789ee9626fb24e5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BidForm_me$data = {
  readonly hasQualifiedCreditCards: boolean | null;
  readonly " $fragmentType": "BidForm_me";
};
export type BidForm_me$key = {
  readonly " $data"?: BidForm_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"BidForm_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BidForm_me",
  "selections": [
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

(node as any).hash = "8ed9070855d2bf5bf240dd4b90da4955";

export default node;
