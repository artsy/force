/**
 * @generated SignedSource<<7c137f2ac26e0fa9ee018a47483ab7d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileArtistsListArtistDialog_userInterestEdge$data = {
  readonly id: string;
  readonly internalID: string;
  readonly node: {
    readonly __typename: "Artist";
    readonly counts: {
      readonly artworks: any | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly private: boolean;
  readonly " $fragmentType": "CollectorProfileArtistsListArtistDialog_userInterestEdge";
};
export type CollectorProfileArtistsListArtistDialog_userInterestEdge$key = {
  readonly " $data"?: CollectorProfileArtistsListArtistDialog_userInterestEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileArtistsListArtistDialog_userInterestEdge">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileArtistsListArtistDialog_userInterestEdge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "private",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "EntityHeaderArtist_artist"
            },
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtistCounts",
              "kind": "LinkedField",
              "name": "counts",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "artworks",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "Artist",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UserInterestEdge",
  "abstractKey": null
};
})();

(node as any).hash = "6d2eb7d999e7c4db69b52c42d687280c";

export default node;
