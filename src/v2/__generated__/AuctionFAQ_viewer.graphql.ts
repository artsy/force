/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionFAQ_viewer = {
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
    readonly " $refType": "AuctionFAQ_viewer";
};
export type AuctionFAQ_viewer$data = AuctionFAQ_viewer;
export type AuctionFAQ_viewer$key = {
    readonly " $data"?: AuctionFAQ_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionFAQ_viewer">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "content",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionFAQ_viewer",
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
  "type": "Viewer"
};
})();
(node as any).hash = 'e29df207450f132c887a37fde758a3ac';
export default node;
