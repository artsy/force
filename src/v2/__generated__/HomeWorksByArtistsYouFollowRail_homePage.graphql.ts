/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeWorksByArtistsYouFollowRail_homePage = {
    readonly artworkModule: {
        readonly results: ReadonlyArray<{
            readonly internalID: string;
            readonly slug: string;
            readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
        } | null> | null;
    } | null;
    readonly " $refType": "HomeWorksByArtistsYouFollowRail_homePage";
};
export type HomeWorksByArtistsYouFollowRail_homePage$data = HomeWorksByArtistsYouFollowRail_homePage;
export type HomeWorksByArtistsYouFollowRail_homePage$key = {
    readonly " $data"?: HomeWorksByArtistsYouFollowRail_homePage$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"HomeWorksByArtistsYouFollowRail_homePage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeWorksByArtistsYouFollowRail_homePage",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "key",
          "value": "FOLLOWED_ARTISTS"
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
      "storageKey": "artworkModule(key:\"FOLLOWED_ARTISTS\")"
    }
  ],
  "type": "HomePage",
  "abstractKey": null
};
(node as any).hash = '67ebfff4507a1f299a511c8f6493e370';
export default node;
