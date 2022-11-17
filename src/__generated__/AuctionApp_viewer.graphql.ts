/**
 * @generated SignedSource<<89c0b0654c9e598c9a9448fee0c478f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionApp_viewer$data = {
  readonly showFollowedArtistsTab: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionArtworkFilter_viewer" | "AuctionCurrentAuctionsRail_viewer" | "AuctionDetails_viewer" | "AuctionWorksByFollowedArtistsRail_viewer" | "CascadingEndTimesBanner_viewer">;
  readonly " $fragmentType": "AuctionApp_viewer";
};
export type AuctionApp_viewer$key = {
  readonly " $data"?: AuctionApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionApp_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "saleID",
    "variableName": "saleID"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "saleID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionApp_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "kind": "FragmentSpread",
      "name": "AuctionArtworkFilter_viewer"
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "AuctionWorksByFollowedArtistsRail_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionCurrentAuctionsRail_viewer"
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "CascadingEndTimesBanner_viewer"
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "AuctionDetails_viewer"
    },
    {
      "alias": "showFollowedArtistsTab",
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "includeArtworksByFollowedArtists",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "saleSlug",
          "variableName": "saleID"
        }
      ],
      "concreteType": "SaleArtworksConnection",
      "kind": "LinkedField",
      "name": "saleArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtwork",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "41f7fde12cca875b875017ab20e45231";

export default node;
