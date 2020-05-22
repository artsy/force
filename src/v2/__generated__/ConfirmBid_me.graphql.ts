/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ConfirmBid_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasQualifiedCreditCards",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "BidForm_me",
      "args": null
    }
  ]
};
(node as any).hash = 'bb8ac1b1d0c2ddcd9f84e73755eb4a7e';
export default node;
