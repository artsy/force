/**
 * @generated SignedSource<<9b813b3add881acc57525872e59cf295>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type FromParticipantEnum = "BUYER" | "SELLER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2OfferHistory_order$data = {
  readonly submittedOffers: ReadonlyArray<{
    readonly amount: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly buyerTotal: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly createdAt: string | null | undefined;
    readonly fromParticipant: FromParticipantEnum;
    readonly internalID: string;
  }>;
  readonly " $fragmentType": "Order2OfferHistory_order";
};
export type Order2OfferHistory_order$key = {
  readonly " $data"?: Order2OfferHistory_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OfferHistory_order">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2OfferHistory_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "submittedOffers",
      "plural": true,
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
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMMM D, YYYY"
            }
          ],
          "kind": "ScalarField",
          "name": "createdAt",
          "storageKey": "createdAt(format:\"MMMM D, YYYY\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fromParticipant",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "amount",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "buyerTotal",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "11143a85ed0421ef17cdbe210c8c99ae";

export default node;
