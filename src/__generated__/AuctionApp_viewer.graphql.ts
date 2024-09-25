/**
 * @generated SignedSource<<389ccb59af90dd116bcef5892c347093>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionApp_viewer$data = {
  readonly showFollowedArtistsTab?: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionArtworkFilter_viewer" | "AuctionCurrentAuctionsRail_viewer" | "AuctionWorksByFollowedArtistsRail_viewer">;
  readonly " $fragmentType": "AuctionApp_viewer";
};
export type AuctionApp_viewer$key = {
  readonly " $data"?: AuctionApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionApp_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "saleID",
  "variableName": "saleID"
};
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
      "name": "isLoggedIn"
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
        },
        {
          "kind": "Variable",
          "name": "isLoggedIn",
          "variableName": "isLoggedIn"
        },
        (v0/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "AuctionArtworkFilter_viewer"
    },
    {
      "condition": "isLoggedIn",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "args": [
            (v0/*: any*/)
          ],
          "kind": "FragmentSpread",
          "name": "AuctionWorksByFollowedArtistsRail_viewer"
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
      ]
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionCurrentAuctionsRail_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "a8b68200b1e9591b3f754ce0598565df";

export default node;
