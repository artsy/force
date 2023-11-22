/**
 * @generated SignedSource<<ba65a07e02254dbe35cd3a5323e86731>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StandoutLotsRail_viewer$data = {
  readonly standoutLotsRailConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "StandoutLotsRail_viewer";
};
export type StandoutLotsRail_viewer$key = {
  readonly " $data"?: StandoutLotsRail_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"StandoutLotsRail_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StandoutLotsRail_viewer",
  "selections": [
    {
      "alias": "standoutLotsRailConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        },
        {
          "kind": "Literal",
          "name": "forSale",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "geneIDs",
          "value": [
            "our-top-auction-lots"
          ]
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:50,forSale:true,geneIDs:[\"our-top-auction-lots\"])"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "d8606d7cde2352137b087dc03c069e4a";

export default node;
