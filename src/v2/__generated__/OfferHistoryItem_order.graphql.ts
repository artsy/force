/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type OfferHistoryItem_order = {
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly saleMessage: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v2 = {
  "alias": null,
  "args": (v1/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferHistoryItem_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceLineItemConnection",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "artwork",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "saleMessage",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOfferConnection",
          "kind": "LinkedField",
          "name": "offers",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceOfferEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CommerceOffer",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    (v2/*: any*/),
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "MMM D"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "createdAt",
                      "storageKey": "createdAt(format:\"MMM D\")"
                    },
                    (v3/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "lastOffer",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v3/*: any*/),
            (v2/*: any*/),
            {
              "alias": null,
              "args": (v1/*: any*/),
              "kind": "ScalarField",
              "name": "shippingTotal",
              "storageKey": "shippingTotal(precision:2)"
            },
            {
              "alias": null,
              "args": (v1/*: any*/),
              "kind": "ScalarField",
              "name": "taxTotal",
              "storageKey": "taxTotal(precision:2)"
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
(node as any).hash = '6548e4815a3025731236f8e53c62893d';
export default node;
