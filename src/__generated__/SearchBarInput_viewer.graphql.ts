/**
 * @generated SignedSource<<baf3ec3758bd6c46cd8905f285c0a0f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchBarInput_viewer$data = {
  readonly searchConnection?: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
        readonly coverArtwork?: {
          readonly image: {
            readonly src: string | null | undefined;
          } | null | undefined;
        } | null | undefined;
        readonly displayLabel: string | null | undefined;
        readonly displayType?: string | null | undefined;
        readonly href: string | null | undefined;
        readonly imageUrl: string | null | undefined;
        readonly slug?: string;
        readonly statuses?: {
          readonly artworks: boolean | null | undefined;
          readonly auctionLots: boolean | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"SearchInputPills_viewer">;
  readonly " $fragmentType": "SearchBarInput_viewer";
};
export type SearchBarInput_viewer$key = {
  readonly " $data"?: SearchBarInput_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchBarInput_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "entities"
    },
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
  "name": "SearchBarInput_viewer",
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
              "kind": "Variable",
              "name": "entities",
              "variableName": "entities"
            },
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
                      "name": "imageUrl",
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
                        },
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Artwork",
                          "kind": "LinkedField",
                          "name": "coverArtwork",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "Image",
                              "kind": "LinkedField",
                              "name": "image",
                              "plural": false,
                              "selections": [
                                {
                                  "alias": "src",
                                  "args": [
                                    {
                                      "kind": "Literal",
                                      "name": "version",
                                      "value": [
                                        "square"
                                      ]
                                    }
                                  ],
                                  "kind": "ScalarField",
                                  "name": "url",
                                  "storageKey": "url(version:[\"square\"])"
                                }
                              ],
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
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "term",
          "variableName": "term"
        }
      ],
      "kind": "FragmentSpread",
      "name": "SearchInputPills_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "806eab8056a659b4acab2a86966190c5";

export default node;
