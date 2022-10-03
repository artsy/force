/**
 * @generated SignedSource<<e67c6c03254c8fd0ce53397e3bb96804>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionFAQRoute_viewer$data = {
  readonly bidding: {
    readonly content: string | null;
  } | null;
  readonly buyersPremiumTaxesAndFees: {
    readonly content: string | null;
  } | null;
  readonly paymentsAndShipping: {
    readonly content: string | null;
  } | null;
  readonly emailsAndAlerts: {
    readonly content: string | null;
  } | null;
  readonly conditionsOfSale: {
    readonly content: string | null;
  } | null;
  readonly " $fragmentType": "AuctionFAQRoute_viewer";
};
export type AuctionFAQRoute_viewer$key = {
  readonly " $data"?: AuctionFAQRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionFAQRoute_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "format",
        "value": "HTML"
      }
    ],
    "kind": "ScalarField",
    "name": "content",
    "storageKey": "content(format:\"HTML\")"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionFAQRoute_viewer",
  "selections": [
    {
      "alias": "bidding",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-bidding"
        }
      ],
      "concreteType": "StaticContent",
      "kind": "LinkedField",
      "name": "staticContent",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "staticContent(id:\"how-auctions-work-bidding\")"
    },
    {
      "alias": "buyersPremiumTaxesAndFees",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-buyers-premium-taxes-and-fees"
        }
      ],
      "concreteType": "StaticContent",
      "kind": "LinkedField",
      "name": "staticContent",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "staticContent(id:\"how-auctions-work-buyers-premium-taxes-and-fees\")"
    },
    {
      "alias": "paymentsAndShipping",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-payments-and-shipping"
        }
      ],
      "concreteType": "StaticContent",
      "kind": "LinkedField",
      "name": "staticContent",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "staticContent(id:\"how-auctions-work-payments-and-shipping\")"
    },
    {
      "alias": "emailsAndAlerts",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-emails-and-alerts"
        }
      ],
      "concreteType": "StaticContent",
      "kind": "LinkedField",
      "name": "staticContent",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "staticContent(id:\"how-auctions-work-emails-and-alerts\")"
    },
    {
      "alias": "conditionsOfSale",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-conditions-of-sale"
        }
      ],
      "concreteType": "StaticContent",
      "kind": "LinkedField",
      "name": "staticContent",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "staticContent(id:\"how-auctions-work-conditions-of-sale\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "d977f5690e8b2ad500f04fdb789740d3";

export default node;
