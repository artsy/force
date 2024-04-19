/**
 * @generated SignedSource<<8b52b0728662462f62c086bb1ff8b83e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileArtistsListArtist_userInterestEdge$data = {
  readonly id: string;
  readonly internalID: string;
  readonly node: {
    readonly __typename: "Artist";
    readonly counts: {
      readonly myCollectedArtworks: number;
    } | null | undefined;
    readonly internalID: string;
    readonly isPersonalArtist: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly private: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileArtistsListArtistDialog_userInterestEdge">;
  readonly " $fragmentType": "CollectorProfileArtistsListArtist_userInterestEdge";
};
export type CollectorProfileArtistsListArtist_userInterestEdge$key = {
  readonly " $data"?: CollectorProfileArtistsListArtist_userInterestEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileArtistsListArtist_userInterestEdge">;
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
  "name": "CollectorProfileArtistsListArtist_userInterestEdge",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectorProfileArtistsListArtistDialog_userInterestEdge"
    },
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
              "kind": "ScalarField",
              "name": "isPersonalArtist",
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
                  "name": "myCollectedArtworks",
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

(node as any).hash = "1bdd5ebaa3e0f360113202b073b025cc";

export default node;
