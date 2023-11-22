/**
 * @generated SignedSource<<652ba5d93b26fca414691f8fcc70502a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowArtistPopover_artist$data = {
  readonly related: {
    readonly suggestedConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly internalID: string;
          readonly " $fragmentSpreads": FragmentRefs<"FollowArtistPopoverRow_artist">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "FollowArtistPopover_artist";
};
export type FollowArtistPopover_artist$key = {
  readonly " $data"?: FollowArtistPopover_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistPopover_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowArtistPopover_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "kind": "LinkedField",
      "name": "related",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "excludeFollowedArtists",
              "value": true
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 3
            },
            {
              "kind": "Literal",
              "name": "includeFallbackArtists",
              "value": true
            }
          ],
          "concreteType": "ArtistConnection",
          "kind": "LinkedField",
          "name": "suggestedConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artist",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "internalID",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "FollowArtistPopoverRow_artist"
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "suggestedConnection(excludeFollowedArtists:true,first:3,includeFallbackArtists:true)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "472738b46c0229ba9ace17383c80e73a";

export default node;
