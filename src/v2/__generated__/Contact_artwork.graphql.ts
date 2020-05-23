/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Contact_artwork = {
    readonly href: string | null;
    readonly is_inquireable: boolean | null;
    readonly sale: {
        readonly is_auction: boolean | null;
        readonly is_live_open: boolean | null;
        readonly is_open: boolean | null;
        readonly is_closed: boolean | null;
    } | null;
    readonly partner: {
        readonly type: string | null;
    } | null;
    readonly sale_artwork: {
        readonly highest_bid: {
            readonly display: string | null;
        } | null;
        readonly opening_bid: {
            readonly display: string | null;
        } | null;
        readonly counts: {
            readonly bidder_positions: number | null;
        } | null;
    } | null;
    readonly " $refType": "Contact_artwork";
};
export type Contact_artwork$data = Contact_artwork;
export type Contact_artwork$key = {
    readonly " $data"?: Contact_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"Contact_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "Contact_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_inquireable",
      "name": "isInquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "is_auction",
          "name": "isAuction",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "is_live_open",
          "name": "isLiveOpen",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "is_open",
          "name": "isOpen",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "is_closed",
          "name": "isClosed",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": "partner(shallow:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "sale_artwork",
      "name": "saleArtwork",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtwork",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "highest_bid",
          "name": "highestBid",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkHighestBid",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": "opening_bid",
          "name": "openingBid",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkOpeningBid",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "counts",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkCounts",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": "bidder_positions",
              "name": "bidderPositions",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '9f34c3389ae10d7ea1db682424201582';
export default node;
