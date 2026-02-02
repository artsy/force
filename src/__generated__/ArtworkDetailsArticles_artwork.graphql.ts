/**
 * @generated SignedSource<<ebd7c1fbe29f54d4a1b3b8355d3d50ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsArticles_artwork$data = {
  readonly articles: ReadonlyArray<{
    readonly byline: string | null | undefined;
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
          "kind": "ScalarField",
          "name": "byline",
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
          "kind": "ScalarField",
          "name": "thumbnailTitle",
          "storageKey": null
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
        }
      ],
      "storageKey": "articles(size:10)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "2c246aaa7c11a4b2c3cf1ad429caf3e9";

export default node;
