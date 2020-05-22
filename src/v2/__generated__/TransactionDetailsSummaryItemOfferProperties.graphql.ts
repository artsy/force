/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
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
    readonly " $data"?: TransactionDetailsSummaryItemOfferProperties$data;
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
  "kind": "Fragment",
  "name": "TransactionDetailsSummaryItemOfferProperties",
  "type": "CommerceOffer",
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
      "name": "amount",
      "args": (v0/*: any*/),
      "storageKey": "amount(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "amountCents",
      "args": null,
      "storageKey": null
    },
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
      "name": "shippingTotalCents",
      "args": null,
      "storageKey": null
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
      "name": "taxTotalCents",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "buyerTotal",
      "args": (v0/*: any*/),
      "storageKey": "buyerTotal(precision:2)"
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "buyerTotalCents",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "fromParticipant",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "note",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
(node as any).hash = '7bd6db26a9439bff847c104aa299279d';
export default node;
