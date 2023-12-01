/**
 * @generated SignedSource<<2f525069b23102b176e2f254d957e335>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddToCollectionRoute_viewer$data = {
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artistNames: string | null | undefined;
        readonly date: string | null | undefined;
        readonly image: {
          readonly cropped: {
            readonly height: number;
            readonly src: string;
            readonly srcSet: string;
            readonly width: number;
          } | null | undefined;
        } | null | undefined;
        readonly internalID: string;
        readonly title: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "AddToCollectionRoute_viewer";
};
export type AddToCollectionRoute_viewer$key = {
  readonly " $data"?: AddToCollectionRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddToCollectionRoute_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddToCollectionRoute_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        },
        {
          "kind": "Literal",
          "name": "marketable",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "medium",
          "value": "painting"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
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
                  "name": "artistNames",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "date",
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
                          "value": 200
                        },
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 200
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
                          "name": "width",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "height",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "src",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "srcSet",
                          "storageKey": null
                        }
                      ],
                      "storageKey": "cropped(height:200,width:200)"
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
      "storageKey": "artworksConnection(first:50,marketable:true,medium:\"painting\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "0e6d9b5b7d685a055427099be6dc1852";

export default node;
