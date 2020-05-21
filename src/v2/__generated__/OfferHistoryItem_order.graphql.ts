/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OfferHistoryItem_order = {
    readonly totalListPrice: string | null;
    readonly offers?: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly amount: string | null;
                readonly createdAt: string;
                readonly fromParticipant: CommerceOrderParticipantEnum | null;
            } | null;
        } | null> | null;
    } | null;
    readonly lastOffer?: {
        readonly internalID: string;
        readonly fromParticipant: CommerceOrderParticipantEnum | null;
        readonly amount: string | null;
        readonly shippingTotal: string | null;
        readonly taxTotal: string | null;
        readonly note: string | null;
    } | null;
    readonly " $refType": "OfferHistoryItem_order";
};
export type OfferHistoryItem_order$data = OfferHistoryItem_order;
export type OfferHistoryItem_order$key = {
    readonly " $data"?: OfferHistoryItem_order$data;
    readonly " $fragmentRefs": FragmentRefs<"OfferHistoryItem_order">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": (v0/*: any*/),
  "storageKey": "amount(precision:2)"
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fromParticipant",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "OfferHistoryItem_order",
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
          "name": "offers",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOfferConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "CommerceOfferEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "CommerceOffer",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v2/*: any*/),
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "createdAt",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "MMM D"
                        }
                      ],
                      "storageKey": "createdAt(format:\"MMM D\")"
                    },
                    (v3/*: any*/)
                  ]
                }
              ]
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "lastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v3/*: any*/),
            (v2/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "shippingTotal",
              "args": (v0/*: any*/),
              "storageKey": "shippingTotal(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "taxTotal",
              "args": (v0/*: any*/),
              "storageKey": "taxTotal(precision:2)"
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
(node as any).hash = '6209a00aa1b92262f730863b082250c1';
export default node;
