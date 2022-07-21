/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AddToCollectionRoute_viewer = {
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly artistNames: string | null;
                readonly title: string | null;
                readonly date: string | null;
                readonly image: {
                    readonly cropped: {
                        readonly width: number;
                        readonly height: number;
                        readonly src: string;
                        readonly srcSet: string;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "AddToCollectionRoute_viewer";
};
export type AddToCollectionRoute_viewer$data = AddToCollectionRoute_viewer;
export type AddToCollectionRoute_viewer$key = {
    readonly " $data"?: AddToCollectionRoute_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AddToCollectionRoute_viewer">;
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
(node as any).hash = '0e6d9b5b7d685a055427099be6dc1852';
export default node;
