/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD
export type MyCollectionRoute_me = {
=======
<<<<<<< HEAD:src/__generated__/SettingsMyCollectionArtworks_me.graphql.ts
export type MyCollectionArtworks_me = {
=======
export type MyCollectionRoute_me = {
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026:src/__generated__/MyCollectionRoute_me.graphql.ts
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026
    readonly myCollectionConnection: {
        readonly totalCount: number | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly startCursor: string | null;
            readonly endCursor: string | null;
        };
        readonly pageCursors: {
            readonly " $fragmentRefs": FragmentRefs<"Pagination_pageCursors">;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"GridItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
<<<<<<< HEAD
=======
<<<<<<< HEAD:src/__generated__/SettingsMyCollectionArtworks_me.graphql.ts
    readonly " $refType": "MyCollectionArtworks_me";
};
export type MyCollectionArtworks_me$data = MyCollectionArtworks_me;
export type MyCollectionArtworks_me$key = {
    readonly " $data"?: MyCollectionArtworks_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworks_me">;
=======
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026
    readonly " $refType": "MyCollectionRoute_me";
};
export type MyCollectionRoute_me$data = MyCollectionRoute_me;
export type MyCollectionRoute_me$key = {
    readonly " $data"?: MyCollectionRoute_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionRoute_me">;
<<<<<<< HEAD
=======
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026:src/__generated__/MyCollectionRoute_me.graphql.ts
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "page"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "myCollectionConnection"
        ]
      }
    ]
  },
<<<<<<< HEAD
  "name": "MyCollectionRoute_me",
=======
<<<<<<< HEAD:src/__generated__/SettingsMyCollectionArtworks_me.graphql.ts
  "name": "MyCollectionArtworks_me",
=======
  "name": "MyCollectionRoute_me",
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026:src/__generated__/MyCollectionRoute_me.graphql.ts
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026
  "selections": [
    {
      "alias": "myCollectionConnection",
      "args": null,
      "concreteType": "MyCollectionConnection",
      "kind": "LinkedField",
<<<<<<< HEAD
      "name": "__MyCollectionRoute_myCollectionConnection_connection",
=======
<<<<<<< HEAD:src/__generated__/SettingsMyCollectionArtworks_me.graphql.ts
      "name": "__MyCollectionArtworks_myCollectionConnection_connection",
=======
      "name": "__MyCollectionRoute_myCollectionConnection_connection",
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026:src/__generated__/MyCollectionRoute_me.graphql.ts
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
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
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageCursors",
          "kind": "LinkedField",
          "name": "pageCursors",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Pagination_pageCursors"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MyCollectionEdge",
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
                  "name": "internalID",
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
                  "name": "GridItem_artwork"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
<<<<<<< HEAD
(node as any).hash = '89bb03afb09fa419ee5f61b9bed90449';
=======
<<<<<<< HEAD:src/__generated__/SettingsMyCollectionArtworks_me.graphql.ts
(node as any).hash = '518a71c4f5d491da92a98058fee4d1c1';
=======
(node as any).hash = '89bb03afb09fa419ee5f61b9bed90449';
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026:src/__generated__/MyCollectionRoute_me.graphql.ts
>>>>>>> 1a0d371d2fde7828235f7b380e7796063c5b8026
export default node;
