/**
 * @generated SignedSource<<32e70c21ad495fbb08fcd17737111975>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionApp_sale$data = {
  readonly cascadingEndTimeIntervalMinutes: number | null;
  readonly coverImage: {
    readonly url: string | null;
  } | null;
  readonly eligibleSaleArtworksCount: number | null;
  readonly extendedBiddingIntervalMinutes: number | null;
  readonly internalID: string;
  readonly isClosed: boolean | null;
  readonly showAssociatedSale: {
    readonly internalID: string;
  } | null;
  readonly showBuyNowTab: {
    readonly internalID: string;
  } | null;
  readonly slug: string;
  readonly status: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionAssociatedSale_sale" | "AuctionBuyNowRail_sale" | "AuctionDetails_sale" | "AuctionMeta_sale" | "CascadingEndTimesBanner_sale">;
  readonly " $fragmentType": "AuctionApp_sale";
};
export type AuctionApp_sale$key = {
  readonly " $data"?: AuctionApp_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionApp_sale">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionApp_sale",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionMeta_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionAssociatedSale_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionBuyNowRail_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionDetails_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CascadingEndTimesBanner_sale"
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isClosed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eligibleSaleArtworksCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "wide",
                "source",
                "large_rectangle"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"wide\",\"source\",\"large_rectangle\"])"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "showAssociatedSale",
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "associatedSale",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": "showBuyNowTab",
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "promotedSale",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cascadingEndTimeIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extendedBiddingIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
})();

(node as any).hash = "2548ffc42b777c1adf49ec5cc14644f3";

export default node;
