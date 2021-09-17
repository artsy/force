/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeArtworkModules_homePage = {
    readonly artworkModules: ReadonlyArray<{
        readonly title: string | null;
        readonly key: string | null;
        readonly params: {
            readonly internalID: string | null;
            readonly relatedArtistID: string | null;
            readonly followedArtistID: string | null;
        } | null;
    } | null> | null;
    readonly " $refType": "HomeArtworkModules_homePage";
};
export type HomeArtworkModules_homePage$data = HomeArtworkModules_homePage;
export type HomeArtworkModules_homePage$key = {
    readonly " $data"?: HomeArtworkModules_homePage$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeArtworkModules_homePage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeArtworkModules_homePage",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "exclude",
          "value": [
            "POPULAR_ARTISTS",
            "GENERIC_GENES"
          ]
        },
        {
          "kind": "Literal",
          "name": "maxFollowedGeneRails",
          "value": -1
        },
        {
          "kind": "Literal",
          "name": "maxRails",
          "value": -1
        },
        {
          "kind": "Literal",
          "name": "order",
          "value": [
            "ACTIVE_BIDS",
            "RECENTLY_VIEWED_WORKS",
            "SIMILAR_TO_RECENTLY_VIEWED",
            "SAVED_WORKS",
            "SIMILAR_TO_SAVED_WORKS",
            "FOLLOWED_ARTISTS",
            "FOLLOWED_GALLERIES",
            "RECOMMENDED_WORKS",
            "RELATED_ARTISTS",
            "LIVE_AUCTIONS",
            "CURRENT_FAIRS",
            "FOLLOWED_GENES",
            "GENERIC_GENES"
          ]
        }
      ],
      "concreteType": "HomePageArtworkModule",
      "kind": "LinkedField",
      "name": "artworkModules",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "key",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "HomePageModulesParams",
          "kind": "LinkedField",
          "name": "params",
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
              "name": "relatedArtistID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "followedArtistID",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworkModules(exclude:[\"POPULAR_ARTISTS\",\"GENERIC_GENES\"],maxFollowedGeneRails:-1,maxRails:-1,order:[\"ACTIVE_BIDS\",\"RECENTLY_VIEWED_WORKS\",\"SIMILAR_TO_RECENTLY_VIEWED\",\"SAVED_WORKS\",\"SIMILAR_TO_SAVED_WORKS\",\"FOLLOWED_ARTISTS\",\"FOLLOWED_GALLERIES\",\"RECOMMENDED_WORKS\",\"RELATED_ARTISTS\",\"LIVE_AUCTIONS\",\"CURRENT_FAIRS\",\"FOLLOWED_GENES\",\"GENERIC_GENES\"])"
    }
  ],
  "type": "HomePage",
  "abstractKey": null
};
(node as any).hash = 'c787dad1df94f0a91568226f846bbac3';
export default node;
