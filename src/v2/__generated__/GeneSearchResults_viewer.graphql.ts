/**
 * @generated SignedSource<<74642c2250892024dc1bf3a7f127b9da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneSearchResults_viewer$data = {
  readonly match_gene: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly name?: string | null;
        readonly id?: string;
        readonly slug?: string;
        readonly internalID?: string;
        readonly image?: {
          readonly cropped: {
            readonly url: string;
          } | null;
        } | null;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "GeneSearchResults_viewer";
};
export type GeneSearchResults_viewer$key = {
  readonly " $data"?: GeneSearchResults_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"GeneSearchResults_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "term"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneSearchResults_viewer",
  "selections": [
    {
      "alias": "match_gene",
      "args": [
        {
          "kind": "Literal",
          "name": "entities",
          "value": [
            "GENE"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
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
                      "name": "id",
                      "storageKey": null
                    },
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
                      "name": "internalID",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Image",
                      "kind": "LinkedField",
                      "name": "image",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "height",
                              "value": 100
                            },
                            {
                              "kind": "Literal",
                              "name": "width",
                              "value": 100
                            }
                          ],
                          "concreteType": "CroppedImageUrl",
                          "kind": "LinkedField",
                          "name": "cropped",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "url",
                              "storageKey": null
                            }
                          ],
                          "storageKey": "cropped(height:100,width:100)"
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "type": "Gene",
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
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "9d2ceaedd49be58a9d88754a1547e4a7";

export default node;
