/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeRecentlyViewedRail_homePage = {
    readonly artworkModule: {
        readonly results: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
        } | null> | null;
    } | null;
    readonly " $refType": "HomeRecentlyViewedRail_homePage";
};
export type HomeRecentlyViewedRail_homePage$data = HomeRecentlyViewedRail_homePage;
export type HomeRecentlyViewedRail_homePage$key = {
    readonly " $data"?: HomeRecentlyViewedRail_homePage$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeRecentlyViewedRail_homePage">;
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
  "type": "HomePage"
};
(node as any).hash = 'ef6b4f1af93e390d1d11a383535c73d6';
export default node;
