/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchBar_viewer = {
    readonly searchConnection?: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly displayLabel: string | null;
                readonly href: string | null;
                readonly __typename: string;
                readonly displayType?: string | null | undefined;
                readonly slug?: string | undefined;
                readonly statuses?: {
                    readonly artworks: boolean | null;
                    readonly auctionLots: boolean | null;
                } | null | undefined;
            } | null;
        } | null> | null;
    } | null | undefined;
    readonly " $refType": "SearchBar_viewer";
};
export type SearchBar_viewer$data = SearchBar_viewer;
export type SearchBar_viewer$key = {
    readonly " $data"?: SearchBar_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SearchBar_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "hasTerm"
    },
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "term"
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
                      "type": "SearchableItem",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "ArtistStatuses",
                          "kind": "LinkedField",
                          "name": "statuses",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "artworks",
                              "storageKey": null
                            },
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "auctionLots",
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
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'd1b44d00fe49c0ef5f9236590d3604f8';
export default node;
