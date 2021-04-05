/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtists_partner = {
    readonly slug: string;
    readonly distinguishRepresentedArtists: boolean | null;
    readonly artists: {
        readonly edges: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"PartnerArtistList_artists">;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnerArtists_partner";
};
export type PartnerArtists_partner$data = PartnerArtists_partner;
export type PartnerArtists_partner$key = {
    readonly " $data"?: PartnerArtists_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtists_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "artists"
        ]
      }
    ]
  },
  "name": "PartnerArtists_partner",
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
      "name": "distinguishRepresentedArtists",
      "storageKey": null
    },
    {
      "alias": "artists",
      "args": null,
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "__PartnerArtistsQuery_artists_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistPartnerEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
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
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PartnerArtistList_artists"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Partner"
};
(node as any).hash = '900643fa0f87e50c59ce07139321fd8a';
export default node;
