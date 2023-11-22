/**
 * @generated SignedSource<<95f1b3de199128e9b1264f890edd8db6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MarketingFeaturedArtworksRail_viewer$data = {
  readonly marketingCollections: ReadonlyArray<{
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
          readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "MarketingFeaturedArtworksRail_viewer";
};
export type MarketingFeaturedArtworksRail_viewer$key = {
  readonly " $data"?: MarketingFeaturedArtworksRail_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"MarketingFeaturedArtworksRail_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MarketingFeaturedArtworksRail_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "slugs",
          "value": [
            "new-this-week"
          ]
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 25
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
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ShelfArtwork_artwork"
                    },
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
          "storageKey": "artworksConnection(first:25)"
        }
      ],
      "storageKey": "marketingCollections(slugs:[\"new-this-week\"])"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "861e3bdb621b69eec65a847ee8ef67d0";

export default node;
