/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchResultsArtists_viewer = {
    readonly searchConnection: {
        readonly pageInfo: {
            readonly hasNextPage: boolean;
        };
        readonly pageCursors: {
            readonly " $fragmentRefs": FragmentRefs<"Pagination_pageCursors">;
        };
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly name?: string | null;
                readonly internalID?: string;
                readonly href?: string | null;
                readonly imageUrl?: string | null;
                readonly bio?: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "SearchResultsArtists_viewer";
};
export type SearchResultsArtists_viewer$data = SearchResultsArtists_viewer;
export type SearchResultsArtists_viewer$key = {
    readonly " $data"?: SearchResultsArtists_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"SearchResultsArtists_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "term",
      "type": "String!"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "page",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchResultsArtists_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "entities",
          "value": [
            "ARTIST"
          ]
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "term"
        }
      ],
      "concreteType": "SearchableConnection",
      "kind": "LinkedField",
      "name": "searchConnection",
      "plural": false,
      "selections": [
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
          "concreteType": "SearchableEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": [
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
                      "name": "internalID",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "href",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "imageUrl",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "bio",
                      "storageKey": null
                    }
                  ],
                  "type": "Artist"
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
  "type": "Viewer"
};
(node as any).hash = 'e56ba60404a845353821326cf3f1a678';
export default node;
