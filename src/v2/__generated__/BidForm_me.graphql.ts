/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BidForm_me = {
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $refType": "BidForm_me";
};
export type BidForm_me$data = BidForm_me;
export type BidForm_me$key = {
    readonly " $data"?: BidForm_me$data;
    readonly " $fragmentRefs": FragmentRefs<"BidForm_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "BidForm_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasQualifiedCreditCards",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '8ed9070855d2bf5bf240dd4b90da4955';
export default node;
