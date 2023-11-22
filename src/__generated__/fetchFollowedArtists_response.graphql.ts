/**
 * @generated SignedSource<<c8807fb654c2fc694da6c4294998b6bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type fetchFollowedArtists_response$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly artist: {
        readonly internalID: string;
        readonly slug: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "fetchFollowedArtists_response";
};
export type fetchFollowedArtists_response$key = {
  readonly " $data"?: fetchFollowedArtists_response$data;
  readonly " $fragmentSpreads": FragmentRefs<"fetchFollowedArtists_response">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "fetchFollowedArtists_response",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FollowArtistEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FollowArtist",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "artist",
              "plural": false,
              "selections": [
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
      "storageKey": null
    }
  ],
  "type": "FollowArtistConnection",
  "abstractKey": null
};

(node as any).hash = "bb1a53bce6e3d27121c49ccbf4fa9a8b";

export default node;
