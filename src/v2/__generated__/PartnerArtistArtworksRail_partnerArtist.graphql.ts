/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistArtworksRail_partnerArtist = {
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnerArtistArtworksRail_partnerArtist";
};
export type PartnerArtistArtworksRail_partnerArtist$data = PartnerArtistArtworksRail_partnerArtist;
export type PartnerArtistArtworksRail_partnerArtist$key = {
    readonly " $data"?: PartnerArtistArtworksRail_partnerArtist$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtistArtworksRail_partnerArtist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 12,
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
          "artworksConnection"
        ]
      }
    ]
  },
  "name": "PartnerArtistArtworksRail_partnerArtist",
  "selections": [
    {
      "alias": "artworksConnection",
      "args": null,
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "__PartnerArtistArtworksRail_artworksConnection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
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
                  "name": "FillwidthItem_artwork"
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
  "type": "ArtistPartnerEdge"
};
(node as any).hash = '292a7fb2cf8a823f690116e4c56469b5';
export default node;
