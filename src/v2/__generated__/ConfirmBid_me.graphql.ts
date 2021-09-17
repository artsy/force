/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConfirmBid_me = {
    readonly internalID: string;
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $fragmentRefs": FragmentRefs<"BidForm_me">;
    readonly " $refType": "ConfirmBid_me";
};
export type ConfirmBid_me$data = ConfirmBid_me;
export type ConfirmBid_me$key = {
    readonly " $data"?: ConfirmBid_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ConfirmBid_me">;
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
(node as any).hash = 'bb8ac1b1d0c2ddcd9f84e73755eb4a7e';
export default node;
