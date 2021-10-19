/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchBar_viewer = {
    readonly searchConnection?: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly displayLabel: string | null;
                readonly href: string | null;
                readonly __typename: string;
                readonly displayType?: string | null;
                readonly slug?: string;
                readonly isDisplayAuctionLink?: boolean | null;
                readonly counts?: {
                    readonly artworks: number | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "SearchBar_viewer";
};
export type SearchBar_viewer$data = SearchBar_viewer;
export type SearchBar_viewer$key = {
    readonly " $data"?: SearchBar_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"SearchBar_viewer">;
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
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "hasTerm",
      "type": "Boolean!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchBar_viewer",
  "selections": [
    {
      "condition": "hasTerm",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 7
            },
            {
              "kind": "Literal",
              "name": "mode",
              "value": "AUTOSUGGEST"
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
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "displayLabel",
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
                      "name": "__typename",
                      "storageKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "displayType",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "slug",
                          "storageKey": null
                        }
                      ],
                      "type": "SearchableItem"
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "isDisplayAuctionLink",
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
      ]
    }
  ],
  "type": "Viewer"
};
(node as any).hash = 'dba70b00ce1a4b387ca2e663f616add5';
export default node;
