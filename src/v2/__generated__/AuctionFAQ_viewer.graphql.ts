/* tslint:disable */

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
    "kind": "ScalarField",
    "alias": null,
    "name": "content",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "AuctionFAQ_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "bidding",
      "name": "staticContent",
      "storageKey": "staticContent(id:\"how-auctions-work-bidding\")",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-bidding"
        }
      ],
      "concreteType": "StaticContent",
      "plural": false,
      "selections": (v0/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": "buyersPremiumTaxesAndFees",
      "name": "staticContent",
      "storageKey": "staticContent(id:\"how-auctions-work-buyers-premium-taxes-and-fees\")",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-buyers-premium-taxes-and-fees"
        }
      ],
      "concreteType": "StaticContent",
      "plural": false,
      "selections": (v0/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": "paymentsAndShipping",
      "name": "staticContent",
      "storageKey": "staticContent(id:\"how-auctions-work-payments-and-shipping\")",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-payments-and-shipping"
        }
      ],
      "concreteType": "StaticContent",
      "plural": false,
      "selections": (v0/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": "emailsAndAlerts",
      "name": "staticContent",
      "storageKey": "staticContent(id:\"how-auctions-work-emails-and-alerts\")",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-emails-and-alerts"
        }
      ],
      "concreteType": "StaticContent",
      "plural": false,
      "selections": (v0/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": "conditionsOfSale",
      "name": "staticContent",
      "storageKey": "staticContent(id:\"how-auctions-work-conditions-of-sale\")",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "how-auctions-work-conditions-of-sale"
        }
      ],
      "concreteType": "StaticContent",
      "plural": false,
      "selections": (v0/*: any*/)
    }
  ]
};
})();
(node as any).hash = 'e29df207450f132c887a37fde758a3ac';
export default node;
