/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuyerGuaranteeIndex_buyerGuarantee = {
    readonly name: string | null;
    readonly " $refType": "BuyerGuaranteeIndex_buyerGuarantee";
};
export type BuyerGuaranteeIndex_buyerGuarantee$data = BuyerGuaranteeIndex_buyerGuarantee;
export type BuyerGuaranteeIndex_buyerGuarantee$key = {
    readonly " $data"?: BuyerGuaranteeIndex_buyerGuarantee$data;
    readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_buyerGuarantee">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyerGuaranteeIndex_buyerGuarantee",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = '04c40e368c6df57d9040d5c5d0a7a7a9';
export default node;
