/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistDetailsList_partner = {
    readonly slug: string;
    readonly artists: {
        readonly edges: ReadonlyArray<{
            readonly isDisplayOnPartnerProfile: boolean | null;
            readonly representedBy: boolean | null;
            readonly counts: {
                readonly artworks: number | null;
            } | null;
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"PartnerArtistDetails_artist">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnerArtistDetailsList_partner";
};
export type PartnerArtistDetailsList_partner$data = PartnerArtistDetailsList_partner;
export type PartnerArtistDetailsList_partner$key = {
    readonly " $data"?: PartnerArtistDetailsList_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistDetailsList_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 3,
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
  "name": "PartnerArtistDetailsList_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "artists",
      "args": null,
      "concreteType": "ArtistPartnerConnection",
      "kind": "LinkedField",
      "name": "__PartnerArtistDetailsList_artists_connection",
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
              "name": "isDisplayOnPartnerProfile",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "representedBy",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PartnerArtistCounts",
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
                  "name": "id",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PartnerArtistDetails_artist"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
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
(node as any).hash = '2a1951c950edd378e34f29e634bba964';
export default node;
