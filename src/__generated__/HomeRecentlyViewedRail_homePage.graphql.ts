/**
 * @generated SignedSource<<d9e1c5ed612262e2b6fcdce032d96ae4>>
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
    } | null | undefined> | null | undefined;
  } | null | undefined;
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
              "args": null,
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

(node as any).hash = "5ca2f80b75469ad3c89c9b929518718b";

export default node;
