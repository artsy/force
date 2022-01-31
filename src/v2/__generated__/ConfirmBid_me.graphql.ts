/**
 * @generated SignedSource<<c55cdb45dbaaaba1fee839c03050370c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConfirmBid_me$data = {
  readonly internalID: string;
  readonly hasQualifiedCreditCards: boolean | null;
  readonly " $fragmentSpreads": FragmentRefs<"BidForm_me">;
  readonly " $fragmentType": "ConfirmBid_me";
};
export type ConfirmBid_me$key = {
  readonly " $data"?: ConfirmBid_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConfirmBid_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConfirmBid_me",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BidForm_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "bb8ac1b1d0c2ddcd9f84e73755eb4a7e";

export default node;
