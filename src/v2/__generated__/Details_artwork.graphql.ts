/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Details_artwork = {
    readonly href: string | null;
    readonly title: string | null;
    readonly date: string | null;
    readonly sale_message: string | null;
    readonly cultural_maker: string | null;
    readonly artists: ReadonlyArray<{
        readonly id: string;
        readonly href: string | null;
        readonly name: string | null;
    } | null> | null;
    readonly collecting_institution: string | null;
    readonly partner: {
        readonly name: string | null;
        readonly href: string | null;
    } | null;
    readonly sale: {
        readonly is_auction: boolean | null;
        readonly is_closed: boolean | null;
    } | null;
    readonly sale_artwork: {
        readonly counts: {
            readonly bidder_positions: number | null;
        } | null;
        readonly highest_bid: {
            readonly display: string | null;
        } | null;
        readonly opening_bid: {
            readonly display: string | null;
        } | null;
    } | null;
    readonly " $refType": "Details_artwork";
};
export type Details_artwork$data = Details_artwork;
export type Details_artwork$key = {
    readonly " $data"?: Details_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"Details_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
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
  "name": "Details_artwork",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "alias": "sale_message",
      "args": null,
      "kind": "ScalarField",
      "name": "saleMessage",
      "storageKey": null
    },
    {
      "alias": "cultural_maker",
      "args": null,
      "kind": "ScalarField",
      "name": "culturalMaker",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": "artists(shallow:true)"
    },
    {
      "alias": "collecting_institution",
      "args": null,
      "kind": "ScalarField",
      "name": "collectingInstitution",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v0/*: any*/)
      ],
      "storageKey": "partner(shallow:true)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
        {
          "alias": "is_auction",
          "args": null,
          "kind": "ScalarField",
          "name": "isAuction",
          "storageKey": null
        },
        {
          "alias": "is_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "sale_artwork",
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtworkCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": "bidder_positions",
              "args": null,
              "kind": "ScalarField",
              "name": "bidderPositions",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": "highest_bid",
          "args": null,
          "concreteType": "SaleArtworkHighestBid",
          "kind": "LinkedField",
          "name": "highestBid",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": "opening_bid",
          "args": null,
          "concreteType": "SaleArtworkOpeningBid",
          "kind": "LinkedField",
          "name": "openingBid",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '3e0359262ece717c5498c7372cc8416b';
export default node;
