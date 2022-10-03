/**
 * @generated SignedSource<<67decb3589baadafdad29b9df8f3f09a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeRecentlyViewedRail_homePage$data = {
  readonly artworkModule: {
    readonly results: ReadonlyArray<{
      readonly internalID: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "HomeRecentlyViewedRail_homePage";
};
export type HomeRecentlyViewedRail_homePage$key = {
  readonly " $data"?: HomeRecentlyViewedRail_homePage$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeRecentlyViewedRail_homePage">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeRecentlyViewedRail_homePage",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "key",
          "value": "RECENTLY_VIEWED_WORKS"
        }
      ],
      "concreteType": "HomePageArtworkModule",
      "kind": "LinkedField",
      "name": "artworkModule",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "results",
          "plural": true,
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
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 210
                }
              ],
              "kind": "FragmentSpread",
              "name": "ShelfArtwork_artwork"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworkModule(key:\"RECENTLY_VIEWED_WORKS\")"
    }
  ],
  "type": "HomePage",
  "abstractKey": null
};

(node as any).hash = "d634f76b1ad38b0e9b9a866f101dd741";

export default node;
