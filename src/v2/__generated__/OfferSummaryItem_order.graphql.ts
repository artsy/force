/* tslint:disable */

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
  "kind": "Fragment",
  "name": "OfferSummaryItem_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": (v0/*: any*/),
      "storageKey": "totalListPrice(precision:2)"
    },
    {
      "kind": "InlineFragment",
      "type": "CommerceOfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amount",
              "args": (v0/*: any*/),
              "storageKey": "amount(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "note",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '0261dbe6d5bf78317ddcbcc13f207aa5';
export default node;
