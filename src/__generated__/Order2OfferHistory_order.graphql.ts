/**
 * @generated SignedSource<<21089772ab0c80d1ee71d3ddbac66bbe>>
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
  readonly lastSubmittedOffer: {
    readonly internalID: string;
  } | null | undefined;
  readonly submittedOffers: ReadonlyArray<{
    readonly amount: {
      readonly amount: string | null | undefined;
      readonly currencySymbol: string | null | undefined;
    } | null | undefined;
    readonly buyerTotal: {
      readonly amount: string | null | undefined;
      readonly currencySymbol: string | null | undefined;
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencySymbol",
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
      "name": "lastSubmittedOffer",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "submittedOffers",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "buyerTotal",
          "plural": false,
          "selections": (v1/*: any*/),
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

(node as any).hash = "735bba09e94d7a55734c5335288e2130";

export default node;
