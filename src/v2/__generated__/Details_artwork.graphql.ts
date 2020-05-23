/* tslint:disable */

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
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
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
  "name": "Details_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "sale_message",
      "name": "saleMessage",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "cultural_maker",
      "name": "culturalMaker",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": "artists(shallow:true)",
      "args": (v1/*: any*/),
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
        (v2/*: any*/)
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "collecting_institution",
      "name": "collectingInstitution",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": "partner(shallow:true)",
      "args": (v1/*: any*/),
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v0/*: any*/)
      ]
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
          "alias": "is_closed",
          "name": "isClosed",
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
        },
        {
          "kind": "LinkedField",
          "alias": "highest_bid",
          "name": "highestBid",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkHighestBid",
          "plural": false,
          "selections": (v3/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": "opening_bid",
          "name": "openingBid",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkOpeningBid",
          "plural": false,
          "selections": (v3/*: any*/)
        }
      ]
    }
  ]
};
})();
(node as any).hash = '3e0359262ece717c5498c7372cc8416b';
export default node;
