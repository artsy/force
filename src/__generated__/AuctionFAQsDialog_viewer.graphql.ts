/**
 * @generated SignedSource<<9d6dc64d1b70d04f6faee9105acac014>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionFAQsDialog_viewer$data = {
  readonly bidding: {
    readonly content: string | null | undefined;
    readonly name: string;
  };
  readonly buyersPremium: {
    readonly content: string | null | undefined;
    readonly name: string;
  };
  readonly conditionsOfSale: {
    readonly content: string | null | undefined;
    readonly name: string;
  };
  readonly emailsAndAlerts: {
    readonly content: string | null | undefined;
    readonly name: string;
  };
  readonly paymentsAndShipping: {
    readonly content: string | null | undefined;
    readonly name: string;
  };
  readonly " $fragmentType": "AuctionFAQsDialog_viewer";
};
export type AuctionFAQsDialog_viewer$key = {
  readonly " $data"?: AuctionFAQsDialog_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionFAQsDialog_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
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
  "name": "AuctionFAQsDialog_viewer",
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
      "concreteType": "Page",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "page(id:\"how-auctions-work-bidding\")"
    },
    {
      "alias": "buyersPremium",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-buyers-premium-taxes-and-fees"
        }
      ],
      "concreteType": "Page",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "page(id:\"how-auctions-work-buyers-premium-taxes-and-fees\")"
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
      "concreteType": "Page",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "page(id:\"how-auctions-work-payments-and-shipping\")"
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
      "concreteType": "Page",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "page(id:\"how-auctions-work-emails-and-alerts\")"
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
      "concreteType": "Page",
      "kind": "LinkedField",
      "name": "page",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "page(id:\"how-auctions-work-conditions-of-sale\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "d29500dad97e12c65fe6e682ccb10344";

export default node;
