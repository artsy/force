/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneSearchResults_viewer = {
    readonly match_gene: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly name?: string | null;
                readonly id?: string;
                readonly slug?: string;
                readonly internalID?: string;
                readonly image?: {
                    readonly cropped: {
                        readonly url: string | null;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "GeneSearchResults_viewer";
};
export type GeneSearchResults_viewer$data = GeneSearchResults_viewer;
export type GeneSearchResults_viewer$key = {
    readonly " $data"?: GeneSearchResults_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneSearchResults_viewer">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "GeneSearchResults_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "term",
      "type": "String!"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "match_gene",
      "name": "searchConnection",
      "storageKey": null,
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
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "SearchableEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "type": "Gene",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "name",
                      "args": null,
                      "storageKey": null
                    },
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
                      "name": "slug",
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
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "image",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "name": "cropped",
                          "storageKey": "cropped(height:100,width:100)",
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
                          "plural": false,
                          "selections": [
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "url",
                              "args": null,
                              "storageKey": null
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
        }
      ]
    }
  ]
};
(node as any).hash = '87a366c563b27a6b122d374b15ad6c54';
export default node;
