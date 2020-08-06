/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FollowArtistPopover_artist = {
    readonly related: {
        readonly suggestedConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly internalID: string;
                    readonly " $fragmentRefs": FragmentRefs<"FollowArtistPopoverRow_artist">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "FollowArtistPopover_artist";
};
export type FollowArtistPopover_artist$data = FollowArtistPopover_artist;
export type FollowArtistPopover_artist$key = {
    readonly " $data"?: FollowArtistPopover_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistPopover_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FollowArtistPopover_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "related",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "suggestedConnection",
          "storageKey": "suggestedConnection(excludeFollowedArtists:true,first:3)",
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
            }
          ],
          "concreteType": "ArtistConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artist",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "id",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "internalID",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "FollowArtistPopoverRow_artist",
                      "args": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '90657ea28fda4ad1f17942932ad1d208';
export default node;
