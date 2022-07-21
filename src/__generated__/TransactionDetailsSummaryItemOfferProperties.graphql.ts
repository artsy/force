/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type TransactionDetailsSummaryItemOfferProperties = {
    readonly internalID: string;
    readonly amount: string | null;
    readonly amountCents: number;
    readonly shippingTotal: string | null;
    readonly shippingTotalCents: number | null;
    readonly taxTotal: string | null;
    readonly taxTotalCents: number | null;
    readonly buyerTotal: string | null;
    readonly buyerTotalCents: number | null;
    readonly fromParticipant: CommerceOrderParticipantEnum | null;
    readonly note: string | null;
    readonly " $refType": "TransactionDetailsSummaryItemOfferProperties";
};
export type TransactionDetailsSummaryItemOfferProperties$data = TransactionDetailsSummaryItemOfferProperties;
export type TransactionDetailsSummaryItemOfferProperties$key = {
    readonly " $data"?: TransactionDetailsSummaryItemOfferProperties$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"TransactionDetailsSummaryItemOfferProperties">;
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
  "name": "TransactionDetailsSummaryItemOfferProperties",
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
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": "amount(precision:2)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amountCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "shippingTotal",
      "storageKey": "shippingTotal(precision:2)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingTotalCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "taxTotal",
      "storageKey": "taxTotal(precision:2)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "taxTotalCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v0/*: any*/),
      "kind": "ScalarField",
      "name": "buyerTotal",
      "storageKey": "buyerTotal(precision:2)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "buyerTotalCents",
      "storageKey": null
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
      "kind": "ScalarField",
      "name": "note",
      "storageKey": null
    }
  ],
  "type": "CommerceOffer",
  "abstractKey": null
};
})();
(node as any).hash = '7bd6db26a9439bff847c104aa299279d';
export default node;
