/**
 * @generated SignedSource<<39e29f79f8e8df8ad23436358feb360b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizTrendingCollections_viewer$data = {
  readonly marketingCollections: ReadonlyArray<{
    readonly internalID: string;
    readonly " $fragmentSpreads": FragmentRefs<"ArtQuizTrendingCollection_collection">;
  }>;
  readonly " $fragmentType": "ArtQuizTrendingCollections_viewer";
};
export type ArtQuizTrendingCollections_viewer$key = {
  readonly " $data"?: ArtQuizTrendingCollections_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizTrendingCollections_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizTrendingCollections_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "slugs",
          "value": [
            "trending-this-week",
            "iconic-prints",
            "street-art-highlights",
            "artists-on-the-rise",
            "finds-under-1000-dollars",
            "top-auction-lots",
            "curators-picks-emerging",
            "contemporary-now"
          ]
        }
      ],
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "marketingCollections",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtQuizTrendingCollection_collection"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": "marketingCollections(slugs:[\"trending-this-week\",\"iconic-prints\",\"street-art-highlights\",\"artists-on-the-rise\",\"finds-under-1000-dollars\",\"top-auction-lots\",\"curators-picks-emerging\",\"contemporary-now\"])"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "89b2f4a912db522c591ca1651b5ec978";

export default node;
