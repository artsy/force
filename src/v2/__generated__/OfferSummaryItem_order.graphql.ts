/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OfferSummaryItem_order = {
    readonly totalListPrice: string | null;
    readonly myLastOffer?: {
        readonly amount: string | null;
        readonly note: string | null;
    } | null;
    readonly " $refType": "OfferSummaryItem_order";
};
export type OfferSummaryItem_order$data = OfferSummaryItem_order;
export type OfferSummaryItem_order$key = {
    readonly " $data"?: OfferSummaryItem_order$data;
    readonly " $fragmentRefs": FragmentRefs<"OfferSummaryItem_order">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferSummaryItem_order",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "totalListPrice",
      "storageKey": "totalListPrice(precision:2)"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "myLastOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": (v0/*: any*/),
              "kind": "ScalarField",
              "name": "amount",
              "storageKey": "amount(precision:2)"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "note",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder"
    }
  ],
  "type": "CommerceOrder"
};
})();
(node as any).hash = '0261dbe6d5bf78317ddcbcc13f207aa5';
export default node;
