/**
 * @generated SignedSource<<26da431c2d392f913af7f43deed4facb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TransactionDetailsSummaryItemOfferProperties$data = {
  readonly amount: string | null | undefined;
  readonly amountCents: number;
  readonly buyerTotal: string | null | undefined;
  readonly buyerTotalCents: number | null | undefined;
  readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
  readonly internalID: string;
  readonly note: string | null | undefined;
  readonly shippingTotal: string | null | undefined;
  readonly shippingTotalCents: number | null | undefined;
  readonly taxTotal: string | null | undefined;
  readonly taxTotalCents: number | null | undefined;
  readonly " $fragmentType": "TransactionDetailsSummaryItemOfferProperties";
};
export type TransactionDetailsSummaryItemOfferProperties$key = {
  readonly " $data"?: TransactionDetailsSummaryItemOfferProperties$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionDetailsSummaryItemOfferProperties">;
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

(node as any).hash = "7bd6db26a9439bff847c104aa299279d";

export default node;
