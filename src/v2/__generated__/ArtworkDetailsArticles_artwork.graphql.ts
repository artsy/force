/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetailsArticles_artwork = {
    readonly articles: ReadonlyArray<{
        readonly author: {
            readonly name: string | null;
        } | null;
        readonly href: string | null;
        readonly published_at: string | null;
        readonly thumbnail_image: {
            readonly resized: {
                readonly url: string | null;
            } | null;
        } | null;
        readonly thumbnail_title: string | null;
    } | null> | null;
    readonly " $refType": "ArtworkDetailsArticles_artwork";
};
export type ArtworkDetailsArticles_artwork$data = ArtworkDetailsArticles_artwork;
export type ArtworkDetailsArticles_artwork$key = {
    readonly " $data"?: ArtworkDetailsArticles_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkDetailsArticles_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkDetailsArticles_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "articles",
      "storageKey": "articles(size:10)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 10
        }
      ],
      "concreteType": "Article",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "author",
          "storageKey": null,
          "args": null,
          "concreteType": "Author",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": "published_at",
          "name": "publishedAt",
          "args": [
            {
              "kind": "Literal",
              "name": "format",
              "value": "MMM Do, YYYY"
            }
          ],
          "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
        },
        {
          "kind": "LinkedField",
          "alias": "thumbnail_image",
          "name": "thumbnailImage",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "resized",
              "storageKey": "resized(width:300)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 300
                }
              ],
              "concreteType": "ResizedImageUrl",
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
        },
        {
          "kind": "ScalarField",
          "alias": "thumbnail_title",
          "name": "thumbnailTitle",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '07fa06d932146874a0ac580620a5cdf9';
export default node;
