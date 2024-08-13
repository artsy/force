/**
 * @generated SignedSource<<5753c56a416cea5e686810677dd1e42b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeWorksByArtistsYouFollowRail_homePage$data = {
  readonly artworkModule: {
    readonly results: ReadonlyArray<{
      readonly collectorSignals: {
        readonly partnerOffer: {
          readonly isActive: boolean | null | undefined;
        } | null | undefined;
      } | null | undefined;
      readonly internalID: string;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "HomeWorksByArtistsYouFollowRail_homePage";
};
export type HomeWorksByArtistsYouFollowRail_homePage$key = {
  readonly " $data"?: HomeWorksByArtistsYouFollowRail_homePage$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeWorksByArtistsYouFollowRail_homePage">;
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
              "alias": null,
              "args": null,
              "concreteType": "CollectorSignals",
              "kind": "LinkedField",
              "name": "collectorSignals",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PartnerOfferToCollector",
                  "kind": "LinkedField",
                  "name": "partnerOffer",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isActive",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
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
      "storageKey": "artworkModule(key:\"FOLLOWED_ARTISTS\")"
    }
  ],
  "type": "HomePage",
  "abstractKey": null
};

(node as any).hash = "e02681bbb93f5f99c568d48894d04631";

export default node;
