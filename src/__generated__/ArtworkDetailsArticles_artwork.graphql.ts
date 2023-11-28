/**
 * @generated SignedSource<<ecb6a31addee62d910428fd209f08d6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsArticles_artwork$data = {
  readonly articles: ReadonlyArray<{
    readonly author: {
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly href: string | null | undefined;
    readonly publishedAt: string | null | undefined;
    readonly thumbnailImage: {
      readonly cropped: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
    readonly thumbnailTitle: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ArtworkDetailsArticles_artwork";
};
export type ArtworkDetailsArticles_artwork$key = {
  readonly " $data"?: ArtworkDetailsArticles_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkDetailsArticles_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkDetailsArticles_artwork",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10
        }
      ],
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "articles",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Author",
          "kind": "LinkedField",
          "name": "author",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
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
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM Do, YYYY"
            }
          ],
          "kind": "ScalarField",
          "name": "publishedAt",
          "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "thumbnailImage",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 150
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
              "storageKey": "cropped(height:150,width:200)"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "thumbnailTitle",
          "storageKey": null
        }
      ],
      "storageKey": "articles(size:10)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "84820200ab3d4b9e9cd76ca883049875";

export default node;
